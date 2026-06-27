import { pushContactToGHL } from './_ghl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, phone, tiktok, instagram, timestamp } = req.body || {};
  if (!firstName || !lastName || !email || !phone || !tiktok || !instagram) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Push to GHL
  const result = await pushContactToGHL({
    firstName,
    lastName,
    email,
    phone,
    tags: ['affiliate-applicant', 'partner-opportunity'],
    customFields: {
      tiktok_handle: tiktok,
      instagram_handle: instagram,
      application_type: 'affiliate',
      application_date: new Date(timestamp || Date.now()).toISOString(),
    },
  });

  if (!result.ok) {
    console.error('Failed to submit affiliate application:', result.error);
    return res.status(500).json({ error: 'Failed to submit application' });
  }

  console.log('Affiliate form submitted to GHL:', { firstName, lastName, email });
  return res.status(200).json({ success: true, message: 'Application submitted successfully', contactId: result.contactId });
}
