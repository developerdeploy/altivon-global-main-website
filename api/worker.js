const fields = {
  contact_name: 120, company_name: 180, work_email: 254, country: 100,
  destination_market: 100, destination_port: 180, phone_number: 60,
  packaging_format: 180, incoterms_preference: 180, intended_use: 500,
  target_timing: 100, order_frequency: 100, additional_notes: 3500,
};
const scopes = new Set(['quotation', 'sample', 'docs', 'contact_message']);
const products = new Set(['moringa_leaf_powder', 'beetroot_powder', 'ashwagandha_powder']);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const json = (body, status = 200) => Response.json(body, {
  status, headers: {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'},
});

export function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid enquiry.');
  if (typeof input.website_url !== 'string' || input.website_url.trim()) throw new Error('Unable to accept this enquiry.');
  if (!uuid.test(input.request_id || '')) throw new Error('Please reload the form and try again.');
  if (!scopes.has(input.enquiry_scope)) throw new Error('Choose a valid enquiry type.');
  if (input.consent !== true) throw new Error('Please agree to be contacted about this enquiry.');
  const result = {request_id: input.request_id, enquiry_scope: input.enquiry_scope, consent: true};
  for (const [name, limit] of Object.entries(fields)) {
    const value = input[name] ?? '';
    if (typeof value !== 'string' || value.length > limit || /\u0000/.test(value)) throw new Error('Please check the form fields and message length.');
    result[name] = value.trim();
  }
  if (!result.contact_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.work_email)) throw new Error('Enter your name and a valid email address.');
  if (input.enquiry_scope === 'contact_message') {
    if (!result.additional_notes) throw new Error('Enter a message.');
  } else if (!result.company_name || !result.country || !result.intended_use) {
    throw new Error('Enter your company, destination and intended use.');
  }
  const quantity = input.order_quantity;
  if (quantity === null || quantity === '' || quantity === undefined) {
    if (input.enquiry_scope === 'quotation') throw new Error('Enter an estimated quantity.');
    result.order_quantity = null;
  } else {
    if (typeof quantity !== 'number' || !Number.isFinite(quantity) || quantity <= 0 || quantity > 10000000) throw new Error('Enter a valid quantity.');
    result.order_quantity = quantity;
  }
  result.quantity_unit = 'kg';
  const product = input.botanical_product ?? 'moringa_leaf_powder';
  if (input.enquiry_scope !== 'contact_message' && !products.has(product)) throw new Error('Choose a valid product.');
  result.botanical_product = input.enquiry_scope === 'contact_message' ? 'general_inquiry' : product;
  return result;
}

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing request body.');
  let size = 0;
  const chunks = [];
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) { await reader.cancel(); throw new RangeError('Request too large.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (url.pathname !== '/api/inquiry') return json({message: 'Not found.'}, 404);
    if (request.method !== 'POST') return json({message: 'Method not allowed.'}, 405);
    if (request.headers.get('Origin') !== url.origin) return json({message: 'Please submit from the website.'}, 403);
    if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({message: 'JSON required.'}, 415);
    if (!env.GOOGLE_ENQUIRY_URL || !env.ENQUIRY_SHARED_SECRET || !env.ENQUIRY_LIMITER) return json({message: 'Enquiry delivery is not ready. Please contact us directly.'}, 503);
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(env.GOOGLE_ENQUIRY_URL)) return json({message: 'Please contact us directly.'}, 503);
    const {success} = await env.ENQUIRY_LIMITER.limit({key: request.headers.get('CF-Connecting-IP') || 'unknown'});
    if (!success) return json({message: 'Too many attempts. Please wait a minute and try again.'}, 429);
    let enquiry;
    try { enquiry = validateEnquiry(await readBody(request)); }
    catch (error) { return json({message: error instanceof SyntaxError ? 'Invalid JSON.' : error.message}, error instanceof RangeError ? 413 : 400); }
    const payload = JSON.stringify(enquiry);
    const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload)))].map(byte => byte.toString(16).padStart(2, '0')).join('');
    const docket = `AG-${enquiry.request_id.toUpperCase()}`;
    try {
      const response = await fetch(env.GOOGLE_ENQUIRY_URL, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({secret: env.ENQUIRY_SHARED_SECRET, hash, docket_id: docket, enquiry}),
        redirect: 'follow', signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) throw new Error('Upstream error.');
      const result = await response.json();
      if (result.ok !== true || result.docket_id !== docket) throw new Error('Save not confirmed.');
      return json({docket_id: docket, message: 'Your enquiry has been saved.'}, 201);
    } catch {
      return json({message: 'We could not confirm your enquiry was saved. Retry this form, or contact us directly.'}, 502);
    }
  },
};
