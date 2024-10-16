// pages/api/submitForm.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://hooks.zapier.com/hooks/catch/17249590/2tm872o/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body), // Forward the body from the client
        });
        
        const result = await response.json();
        return res.status(200).json(result); // Respond back with the result from Zapier
      } catch (error) {
        return res.status(500).json({ error: 'Failed to send data' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  