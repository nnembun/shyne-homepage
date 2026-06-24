import { guard, upsertContact } from './_hubspot.js';

export default async function handler(req, res) {
  if (guard(req, res)) return;

  const { firstName, lastName, email, phone, tiktok, instagram, timestamp } = req.body || {};
  if (!firstName || !lastName || !email || !phone || !tiktok || !instagram) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  await upsertContact(email, {
    firstname: firstName,
    lastname: lastName,
    phone,
    tiktok_handle: tiktok,
    instagram_handle: instagram,
    hs_lead_status: 'NEW',
    affiliate_application_date: new Date(timestamp || Date.now()).toISOString(),
  });

  console.log('Affiliate form submitted:', { firstName, lastName, email });
  return res.status(200).json({ success: true, message: 'Application submitted successfully' });
}
