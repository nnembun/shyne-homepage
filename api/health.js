import { hubspotEnabled } from './_hubspot.js';

export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    hubspotConnected: hubspotEnabled(),
    endpoints: ['/api/contact', '/api/affiliate', '/api/newsletter', '/api/order'],
  });
}
