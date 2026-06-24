import { guard, upsertContact } from './_hubspot.js';

export default async function handler(req, res) {
  if (guard(req, res)) return;

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  await upsertContact(email, {
    lifecyclestage: 'subscriber',
    newsletter_signup_date: new Date().toISOString(),
  });

  console.log('Newsletter signup:', email);
  return res.status(200).json({ success: true, message: 'Subscribed to newsletter' });
}
