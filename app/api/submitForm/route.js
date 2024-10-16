export async function POST(req) {
  const data = await req.json();
  // Perform actions with the data, such as forwarding it to Zapier
  const response = await fetch('https://hooks.zapier.com/hooks/catch/17249590/2tm872o/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), { status: response.status });
}
