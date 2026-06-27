/**
 * GHL (Go High Level) Integration
 * Sends payment notifications and order data to GHL
 */

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_BASE_URL = 'https://rest.gohighlevel.com/v1';

/**
 * Push order/contact to GHL when payment succeeds
 */
export async function pushOrderToGHL(orderData) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.warn('⚠️ GHL not configured — skipping order push');
    return { ok: false, error: 'GHL not configured' };
  }

  const {
    fullName, email, phone, address, city, postcode, country,
    items, subtotal, shippingPrice, total, shippingMethod, paymentIntentId
  } = orderData;

  const [firstName, ...rest] = (fullName || '').trim().split(' ');
  const lastName = rest.join(' ');

  try {
    // Create or update contact in GHL
    const contactResponse = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        address1: address || '',
        city: city || '',
        postalCode: postcode || '',
        country: country || 'GB',
        tags: ['customer', 'paid-order'],
        customFields: {
          order_total: String(total),
          order_items: items.map(i => `${i.name} x${i.quantity}`).join(', '),
          order_date: new Date().toISOString(),
          payment_intent_id: paymentIntentId,
        },
      }),
    });

    const contactData = await contactResponse.json();

    if (!contactResponse.ok) {
      console.error('❌ GHL Contact creation failed:', contactData);
      return { ok: false, error: contactData.message || 'Failed to create contact' };
    }

    console.log(`✅ GHL Contact created: ${contactData.contact?.id}`);
    return { ok: true, contactId: contactData.contact?.id };

  } catch (err) {
    console.error('❌ GHL push error:', err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Push generic contact to GHL (for contact forms, waitlist, etc.)
 */
export async function pushContactToGHL(contactData) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.warn('⚠️ GHL not configured — skipping contact push');
    return { ok: false, error: 'GHL not configured' };
  }

  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    message = '',
    tags = ['website-form'],
    customFields = {},
  } = contactData;

  try {
    const contactResponse = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        tags: Array.isArray(tags) ? tags : ['website-form'],
        customFields: {
          source: 'website-form',
          submitted_at: new Date().toISOString(),
          ...customFields,
        },
      }),
    });

    const contactResponseData = await contactResponse.json();

    if (!contactResponse.ok) {
      console.error('❌ GHL Contact creation failed:', contactResponseData);
      return { ok: false, error: contactResponseData.message || 'Failed to create contact' };
    }

    console.log(`✅ GHL Contact created: ${contactResponseData.contact?.id}`);
    return { ok: true, contactId: contactResponseData.contact?.id };

  } catch (err) {
    console.error('❌ GHL contact push error:', err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Send admin notification email via GHL
 */
export async function sendAdminNotificationGHL(orderData) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) return;

  const { fullName, email, total, items } = orderData;
  const itemList = items.map(i => `• ${i.name} x${i.quantity}`).join('\n');

  try {
    await fetch(`${GHL_BASE_URL}/notifications/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        toEmail: process.env.ADMIN_EMAIL || 'admin@shyneoils.com',
        subject: `New Order: ${fullName} - £${total.toFixed(2)}`,
        body: `
New payment received!

Customer: ${fullName}
Email: ${email}
Order Total: £${total.toFixed(2)}

Items:
${itemList}

View order details in your dashboard.
        `,
      }),
    });

    console.log('✅ Admin notification sent via GHL');
  } catch (err) {
    console.error('⚠️ GHL notification error:', err.message);
  }
}
