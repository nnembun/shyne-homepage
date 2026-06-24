/**
 * Waitlist signup → HubSpot CRM (the existing SHYNE CRM).
 *
 * Creates/updates a contact as a "subscriber" and tags the source as
 * "SHYNE Waitlist" so these signups can be segmented from regular newsletter
 * signups. (lead_source / waitlist_signup_date are custom properties — if they
 * don't exist yet the contact is still created with standard fields; create
 * those properties in HubSpot to capture the source tag too.)
 */
import { guard, upsertContact } from './_hubspot.js';

export default async function handler(req, res) {
  if (guard(req, res)) return;

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  await upsertContact(email, {
    lifecyclestage: 'subscriber',
    lead_source: 'SHYNE Waitlist',
    waitlist_signup_date: new Date().toISOString(),
  });

  console.log('Waitlist signup:', email);
  return res.status(200).json({ success: true, message: 'You are on the list.' });
}
