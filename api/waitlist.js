/**
 * Waitlist/Newsletter signup → Go High Level CRM
 * Creates a contact as a "subscriber" in GHL
 */
import { pushContactToGHL } from './_ghl.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, source = 'waitlist-page' } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Push to GHL
  const result = await pushContactToGHL({
    email,
    tags: ['subscriber', 'newsletter-signup', source],
    customFields: {
      signup_source: source,
      signup_date: new Date().toISOString(),
      lifecycle_stage: 'subscriber',
    },
  });

  if (!result.ok) {
    console.error('Failed to add to waitlist:', result.error);
    return res.status(500).json({ error: 'Failed to sign up' });
  }

  console.log('Waitlist signup to GHL:', email);
  return res.status(200).json({ success: true, message: 'You are on the list.', contactId: result.contactId });
}
