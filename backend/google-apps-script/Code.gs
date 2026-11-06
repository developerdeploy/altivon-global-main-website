// Deploy as the Google account that owns the private enquiries spreadsheet.
// Configure SPREADSHEET_ID, ENQUIRY_SHARED_SECRET and ALERT_EMAIL in Script Properties.
const ENQUIRY_HEADERS = ['Received UTC','Reference','Request ID','Payload hash','Type','Name','Company','Email','Phone','Country','Destination port','Quantity','Unit','Packing','Trade terms','Intended use','Target timing','Order frequency','Notes','Contact consent','Status','Email alert'];

function setupEnquiries() {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('ENQUIRY_SHARED_SECRET') || !properties.getProperty('ALERT_EMAIL')) {
    if (typeof connectEnquiries === 'function') return connectEnquiries();
    throw new Error('Run connectEnquiries to configure the backend.');
  }
  const quota = MailApp.getRemainingDailyQuota();
  const existingId = properties.getProperty('SPREADSHEET_ID');
  const book = existingId ? SpreadsheetApp.openById(existingId) : SpreadsheetApp.create('AltivonGlobal Enquiries');
  const sheet = book.getSheetByName('Enquiries') || (existingId ? book.insertSheet('Enquiries') : book.getSheets()[0].setName('Enquiries'));
  if (sheet.getLastRow() === 0) sheet.appendRow(ENQUIRY_HEADERS);
  if (sheet.getRange(1,1,1,ENQUIRY_HEADERS.length).getValues()[0].join('|') !== ENQUIRY_HEADERS.join('|')) throw new Error('The enquiries headers do not match.');
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,ENQUIRY_HEADERS.length).setFontWeight('bold').setBackground('#183c30').setFontColor('#ffffff');
  sheet.setColumnWidths(1,ENQUIRY_HEADERS.length,160);
  properties.setProperty('SPREADSHEET_ID',book.getId());
  SpreadsheetApp.flush();
  console.log('Enquiries Sheet: '+book.getUrl());
  console.log('Email sending is authorized. Remaining daily recipients: '+quota);
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function sheetText(value) {
  const text = String(value == null ? '' : value);
  return /^[\s]*[=+@-]/.test(text) ? "'" + text : text;
}

function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  let input;
  try { input = JSON.parse(event.postData.contents); } catch (_) { return jsonResponse({ok:false}); }
  const secret = properties.getProperty('ENQUIRY_SHARED_SECRET');
  if (!secret || input.secret !== secret) return jsonResponse({ok:false});
  if (input.action === 'status') {
    try {
      const book = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
      const sheet = book.getSheetByName('Enquiries');
      const ready = sheet && sheet.getRange(1,1,1,ENQUIRY_HEADERS.length).getValues()[0].join('|') === ENQUIRY_HEADERS.join('|');
      return jsonResponse({ok:!!ready,spreadsheet_url:book.getUrl(),alert_email:properties.getProperty('ALERT_EMAIL'),email_quota:MailApp.getRemainingDailyQuota()});
    } catch (_) {return jsonResponse({ok:false});}
  }
  const item = input.enquiry;
  if (!item || !/^[0-9a-f-]{36}$/i.test(item.request_id || '') || !/^[0-9a-f]{64}$/.test(input.hash || '') || input.docket_id !== 'AG-' + item.request_id.toUpperCase()) return jsonResponse({ok:false});
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return jsonResponse({ok:false});
  let sheet, row;
  const recipient = properties.getProperty('ALERT_EMAIL');
  try {
    const book = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
    sheet = book.getSheetByName('Enquiries');
    if (!sheet) throw new Error('Missing enquiries tab.');
    if (sheet.getLastRow() === 0) sheet.appendRow(ENQUIRY_HEADERS);
    const headers = sheet.getRange(1,1,1,ENQUIRY_HEADERS.length).getValues()[0];
    if (headers.join('|') !== ENQUIRY_HEADERS.join('|')) throw new Error('Header mismatch.');
    if (sheet.getLastRow() > 1) {
      const existing = sheet.getRange(2,3,sheet.getLastRow()-1,1).createTextFinder(item.request_id).matchEntireCell(true).findNext();
      if (existing) {
        if (sheet.getRange(existing.getRow(),4).getValue() !== input.hash) return jsonResponse({ok:false});
        return jsonResponse({ok:true,docket_id:input.docket_id});
      }
    }
    const values = [new Date().toISOString(), input.docket_id, item.request_id, input.hash, item.enquiry_scope, item.contact_name, item.company_name, item.work_email, item.phone_number, item.country, item.destination_port, item.order_quantity, item.quantity_unit, item.packaging_format, item.incoterms_preference, item.intended_use, item.target_timing, item.order_frequency, item.additional_notes, item.consent === true ? 'Agreed' : '', 'New', recipient ? 'Pending' : 'Not configured'];
    sheet.appendRow(values.map(sheetText));
    row = sheet.getLastRow();
    SpreadsheetApp.flush();
  } catch (_) { return jsonResponse({ok:false}); }
  finally { lock.releaseLock(); }
  if (recipient) {
    try {
      const body = ['New AltivonGlobal enquiry', 'Reference: '+input.docket_id, 'Type: '+item.enquiry_scope, 'Name: '+item.contact_name, 'Company: '+item.company_name, 'Email: '+item.work_email, 'Phone: '+item.phone_number, 'Country: '+item.country, 'Quantity (kg): '+(item.order_quantity == null ? 'To be discussed' : item.order_quantity), 'Intended use: '+item.intended_use, 'Notes: '+item.additional_notes, '', 'Open enquiries: https://docs.google.com/spreadsheets/d/'+properties.getProperty('SPREADSHEET_ID')+'/edit'].join('\n');
      MailApp.sendEmail({to:recipient,subject:'AltivonGlobal enquiry '+input.docket_id,body:body,replyTo:item.work_email,name:'AltivonGlobal Enquiries'});
      sheet.getRange(row,22).setValue('Sent');
    } catch (_) {
      // The enquiry is already saved; email failure must not create a duplicate submission.
      try { sheet.getRange(row,22).setValue('Failed — review the Sheet'); } catch (_) {}
    }
  }
  return jsonResponse({ok:true,docket_id:input.docket_id});
}
