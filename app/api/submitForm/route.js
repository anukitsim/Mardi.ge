export async function POST(req) {
  const data = await req.json();
  
  // Construct the payload for Bitrix24
  const payload = {
    fields: {
      NAME: data.fields.NAME,
      EMAIL: [data.fields.EMAIL[0].VALUE],
      PHONE: [data.fields.PHONE[0].VALUE],
      COMMENTS: data.fields.COMMENTS,
    },
  };

  // Send the data to Bitrix24 API
  const response = await fetch('https://crm.mardi.ge/rest/417/6u2rx5o0e6owwfmm/crm.contact.add.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), { status: response.status });
}
