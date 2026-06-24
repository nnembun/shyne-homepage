import { guard, upsertContact } from './_hubspot.js';

export default async function handler(req, res) {
  if (guard(req, res)) return;

  const { firstName, lastName, email, phone, query, timestamp } = req.body || {};
  if (!firstName || !lastName || !email || !phone || !query) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  await upsertContact(email, {
    firstname: firstName,
    lastname: lastName,
    phone,
    message: query,
    hs_lead_status: 'NEW',
    contact_form_submission_date: new Date(timestamp || Date.now()).toISOString(),
  });

  console.log('Contact form submitted:', { firstName, lastName, email });
  return res.status(200).json({ success: true, message: 'Message sent successfully' });
}
