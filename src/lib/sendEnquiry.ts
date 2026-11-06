export function createEnquirySubmission() {
  let lastBody = "", requestId = "";
  return async (payload: Record<string, unknown>) => {
    const body = JSON.stringify(payload);
    if (body !== lastBody) { lastBody = body; requestId = crypto.randomUUID(); }
    const response = await fetch("/api/inquiry", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...payload, request_id: requestId}),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.docket_id) throw new Error(result.message || "Your enquiry could not be confirmed. Retry this form or contact us directly.");
    return result;
  };
}
