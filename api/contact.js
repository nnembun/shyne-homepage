import { pushContactToGHL } from './_ghl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, phone, query, timestamp } = req.body || {};
  if (!firstName || !lastName || !email || !phone || !query) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Push to GHL
  const result = await pushContactToGHL({
    firstName,
    lastName,
    email,
    phone,
    message: query,
    tags: ['contact-form', 'website-inquiry'],
    customFields: {
      inquiry_type: 'general-inquiry',
      message: query,
      submitted_at: new Date(timestamp || Date.now()).toISOString(),
    },
  });

  if (!result.ok) {
    console.error('Failed to save contact:', result.error);
    return res.status(500).json({ error: 'Failed to save contact' });
  }

  console.log('Contact form submitted to GHL:', { firstName, lastName, email });
  return res.status(200).json({ success: true, message: 'Message sent successfully', contactId: result.contactId });
}
