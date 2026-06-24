import { guard, upsertContact, createDeal } from './_hubspot.js';

export default async function handler(req, res) {
  if (guard(req, res)) return;

  const {
    fullName, email, phone, address, city, postcode, country,
    items = [], subtotal, shippingPrice, total, shippingMethod, timestamp,
  } = req.body || {};

  if (!fullName || !email || !phone || !address || !city || !postcode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const [firstName, ...rest] = fullName.trim().split(' ');
  const lastName = rest.join(' ');
  const itemsList = items
    .map((i) => `${i.name} x${i.quantity} (£${((i.salePrice ?? i.price) * i.quantity).toFixed(2)})`)
    .join('; ');

  const contactId = await upsertContact(email, {
    firstname: firstName || '',
    lastname: lastName || '',
    phone,
    address,
    city,
    zip: postcode,
    country,
    lifecyclestage: 'customer',
    order_date: new Date(timestamp || Date.now()).toISOString(),
    order_value: String(total ?? ''),
    order_items: itemsList,
    order_shipping_method: shippingMethod || '',
    order_subtotal: String(subtotal ?? ''),
    order_shipping_cost: String(shippingPrice ?? ''),
  });

  // Create a Deal (sales record) for this order, linked to the contact.
  await createDeal(contactId, {
    dealname: `SHYNE Order — ${fullName}`,
    amount: total ?? 0,
    description: `${itemsList} | Shipping: ${shippingMethod || 'n/a'} (£${Number(shippingPrice ?? 0).toFixed(2)})`,
    closedate: new Date(timestamp || Date.now()).toISOString(),
  });

  console.log('Order recorded:', { email, total });
  return res.status(200).json({ success: true, message: 'Order recorded successfully' });
}
