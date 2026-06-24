/**
 * Shared HubSpot CRM helpers for SHYNE Vercel serverless functions.
 * Underscore prefix = Vercel does NOT expose this as a route.
 *
 * Auth: HubSpot Private App access token (pat-…) via Bearer header.
 *       (The legacy ?hapikey= API-key method was deprecated by HubSpot in 2022.)
 *
 * Resilience:
 *  - If HUBSPOT_API_KEY is unset, forms still succeed (data logged) — nothing
 *    breaks for the customer.
 *  - If a write is rejected because a CUSTOM property hasn't been created in
 *    HubSpot yet, we automatically retry with standard properties only, so the
 *    contact is still captured. Create the custom properties to capture the
 *    extra fields too (see HUBSPOT_SETUP docs).
 */
import axios from 'axios';

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

const auth = {
  headers: {
    Authorization: `Bearer ${HUBSPOT_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

// Properties guaranteed to exist on every HubSpot account.
const STANDARD_PROPS = new Set([
  'email', 'firstname', 'lastname', 'phone', 'address', 'city', 'zip',
  'country', 'lifecyclestage', 'hs_lead_status', 'message', 'website',
]);

const standardOnly = (props) =>
  Object.fromEntries(Object.entries(props).filter(([k]) => STANDARD_PROPS.has(k)));

export const hubspotEnabled = () => !!HUBSPOT_API_KEY;

/** Find an existing contact id by email, or null. */
async function findContactIdByEmail(email) {
  const res = await axios.post(
    `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`,
    { filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }] },
    auth
  );
  return res.data?.results?.[0]?.id ?? null;
}

/** POST/PATCH a contact; retry with standard-only props if a custom one is rejected. */
async function writeContact(method, url, properties) {
  try {
    return await axios[method](url, { properties }, auth);
  } catch (err) {
    const status = err.response?.status;
    const msg = err.response?.data?.message || '';
    if (status === 400 && /propert/i.test(msg)) {
      console.warn('⚠️ HubSpot rejected a custom property; retrying with standard fields only.');
      return await axios[method](url, { properties: standardOnly(properties) }, auth);
    }
    throw err;
  }
}

/** Create a new contact, or update the existing one with the same email. */
export async function upsertContact(email, properties) {
  if (!HUBSPOT_API_KEY) {
    console.log('✅ Form logged locally (HubSpot not configured):', { email, ...properties });
    return null;
  }
  try {
    const existingId = await findContactIdByEmail(email);
    if (existingId) {
      await writeContact('patch', `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${existingId}`, properties);
      console.log('✅ HubSpot contact updated:', existingId);
      return existingId;
    }
    const created = await writeContact('post', `${HUBSPOT_API_URL}/crm/v3/objects/contacts`, { email, ...properties });
    console.log('✅ HubSpot contact created:', created.data.id);
    return created.data.id;
  } catch (err) {
    console.error('⚠️ HubSpot sync error:', err.response?.data?.message || err.message);
    return null; // never block the customer-facing response
  }
}

/**
 * Create a Deal (sales record) for a completed order and associate it with the
 * buyer's contact. Created as "Closed Won" in the default pipeline so it shows
 * up in revenue/sales reporting immediately.
 * Uses only standard deal properties (dealname, amount, description, etc.) so
 * no custom-property setup is required.
 */
export async function createDeal(contactId, { dealname, amount, description, closedate }) {
  if (!HUBSPOT_API_KEY) {
    console.log('✅ Deal logged locally (HubSpot not configured):', { dealname, amount });
    return null;
  }
  try {
    const body = {
      properties: {
        dealname,
        amount: String(amount),
        pipeline: 'default',
        dealstage: 'closedwon',
        closedate: closedate || new Date().toISOString(),
        ...(description ? { description } : {}),
      },
    };
    // Associate deal → contact (HubSpot-defined type id 3 = deal_to_contact)
    if (contactId) {
      body.associations = [{
        to: { id: contactId },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
      }];
    }
    const res = await axios.post(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, body, auth);
    console.log('✅ HubSpot deal created:', res.data.id);
    return res.data.id;
  } catch (err) {
    console.error('⚠️ HubSpot deal error:', err.response?.data?.message || err.message);
    return null; // never block the customer-facing response
  }
}

/** Standard CORS + method guard. Returns true if the request was already handled. */
export function guard(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return true; }
  return false;
}
