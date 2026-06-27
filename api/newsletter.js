import { pushContactToGHL } from './_ghl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const result = await pushContactToGHL({
    email,
    tags: ['newsletter-subscriber'],
    customFields: {
      newsletter_signup_date: new Date().toISOString(),
    },
  });

  if (!result.ok) {
    console.error('Newsletter signup failed:', result.error);
    return res.status(500).json({ error: result.error || 'Failed to subscribe' });
  }

  console.log('Newsletter signup to GHL:', email);
  return res.status(200).json({ success: true, message: 'Subscribed to newsletter' });
}
