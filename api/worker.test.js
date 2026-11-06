import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {validateEnquiry} from './worker.js';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const example = {request_id:'12345678-1234-4123-8123-123456789012',website_url:'',consent:true,enquiry_scope:'quotation',contact_name:'QA Buyer',company_name:'Example Ltd',work_email:'qa@example.com',country:'Germany',intended_use:'Ingredient evaluation',order_quantity:250};
const env = {GOOGLE_ENQUIRY_URL:'https://script.google.com/macros/s/example/exec',ENQUIRY_SHARED_SECRET:'test-secret',ENQUIRY_LIMITER:{limit:async()=>({success:true})}};
const request = (body=example, headers={}) => new Request('https://altivonglobal.com/api/inquiry',{method:'POST',headers:{Origin:'https://altivonglobal.com','Content-Type':'application/json',...headers},body:JSON.stringify(body)});

test('required consent and real quantities are validated; optional quantities stay blank',()=>{
  assert.throws(()=>validateEnquiry({...example,consent:false}));
  for(const quantity of [-1,NaN,Infinity,'250',10000001,null]) assert.throws(()=>validateEnquiry({...example,order_quantity:quantity}));
  assert.equal(validateEnquiry({...example,enquiry_scope:'sample',order_quantity:null}).order_quantity,null);
  assert.equal(validateEnquiry({...example,enquiry_scope:'contact_message',order_quantity:null,additional_notes:'Please contact me.'}).order_quantity,null);
});
test('bots, invalid emails and oversized notes are rejected',()=>{
  assert.throws(()=>validateEnquiry({...example,website_url:'spam'}));
  assert.throws(()=>validateEnquiry({...example,work_email:'bad\naddress@example.com'}));
  assert.throws(()=>validateEnquiry({...example,additional_notes:'x'.repeat(3501)}));
});
test('foreign origins, wrong methods, malformed JSON, oversized requests and rate limits fail closed',async()=>{
  assert.equal((await worker.fetch(request(example,{Origin:'https://other.example'}),env)).status,403);
  assert.equal((await worker.fetch(new Request('https://altivonglobal.com/api/inquiry'),env)).status,405);
  assert.equal((await worker.fetch(request(),{})).status,503);
  assert.equal((await worker.fetch(request(),{...env,ENQUIRY_LIMITER:{limit:async()=>({success:false})}})).status,429);
  const bad = new Request('https://altivonglobal.com/api/inquiry',{method:'POST',headers:{Origin:'https://altivonglobal.com','Content-Type':'application/json'},body:'not JSON'});
  assert.equal((await worker.fetch(bad,env)).status,400);
  assert.equal((await worker.fetch(request({...example,extra:'x'.repeat(17000)}),env)).status,413);
});
test('success requires a confirmed saved reference; upstream failures never report success',async()=>{
  const original=globalThis.fetch;
  try {
    let outbound;
    globalThis.fetch=async (_url,options)=>{outbound=JSON.parse(options.body);return Response.json({ok:true,docket_id:'AG-'+example.request_id.toUpperCase()});};
    const response=await worker.fetch(request(),env);
    assert.equal(response.status,201);
    assert.equal(outbound.enquiry.contact_name,'QA Buyer');
    assert.match(outbound.hash,/^[0-9a-f]{64}$/);
    assert.equal(outbound.secret,'test-secret');
    assert.equal(JSON.stringify(await response.json()).includes('test-secret'),false);
    globalThis.fetch=async()=>Response.json({ok:false});
    assert.equal((await worker.fetch(request(),env)).status,502);
    globalThis.fetch=async()=>{throw new Error('private provider error');};
    const failure=await worker.fetch(request(),env);
    assert.equal(failure.status,502);
    assert.equal((await failure.text()).includes('private provider error'),false);
  } finally {globalThis.fetch=original;}
});
test('Sheets formula-like text is stored literally',()=>{
  const context=vm.createContext({});
  vm.runInContext(readFileSync(new URL('../backend/google-apps-script/Code.gs',import.meta.url),'utf8'),context);
  for(const text of ['=IMPORTXML("url")','+919999999999','  @formula','-2+3']) assert.equal(context.sheetText(text),"'"+text);
  assert.equal(context.sheetText('Plain enquiry'),'Plain enquiry');
});
test('a saved enquiry is not duplicated on retry, including when its email alert fails',()=>{
  const rows=[];
  let alertAttempts=0;
  const sheet={
    getLastRow:()=>rows.length,
    appendRow:values=>rows.push(values),
    getRange:(row,column)=>({
      getValues:()=>[rows[row-1]],
      getValue:()=>rows[row-1][column-1],
      setValue:value=>{rows[row-1][column-1]=value;},
      createTextFinder:value=>({matchEntireCell:()=>({findNext:()=>{
        const index=rows.findIndex((cells,index)=>index>0 && cells[column-1]===value);
        return index<0 ? null : {getRow:()=>index+1};
      }})}),
    }),
  };
  const properties={ENQUIRY_SHARED_SECRET:'secret',SPREADSHEET_ID:'example',ALERT_EMAIL:'owner@example.com'};
  const context=vm.createContext({
    PropertiesService:{getScriptProperties:()=>({getProperty:key=>properties[key]})},
    ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({setMimeType:()=>JSON.parse(text)})},
    LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
    SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
    MailApp:{sendEmail:()=>{alertAttempts++;throw new Error('Mail quota exceeded');}},
  });
  vm.runInContext(readFileSync(new URL('../backend/google-apps-script/Code.gs',import.meta.url),'utf8'),context);
  const input={secret:'secret',hash:'a'.repeat(64),docket_id:'AG-'+example.request_id.toUpperCase(),enquiry:example};
  const submit=value=>context.doPost({postData:{contents:JSON.stringify(value)}});
  assert.equal(submit({...input,secret:'wrong'}).ok,false);
  assert.equal(rows.length,0);
  assert.equal(submit(input).ok,true);
  assert.equal(rows.length,2);
  assert.equal(rows[1][21],'Failed — review the Sheet');
  assert.equal(submit(input).ok,true);
  assert.equal(rows.length,2);
  assert.equal(alertAttempts,1);
  assert.equal(submit({...input,hash:'b'.repeat(64)}).ok,false);
});
