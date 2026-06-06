import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// HubSpot Configuration
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

// HubSpot Headers - Try API key format
const hubspotHeaders = {
  'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json',
};

// Alternative header if Bearer doesn't work
const hubspotHeadersAlt = {
  'Private-App-Legacy': HUBSPOT_API_KEY,
  'Content-Type': 'application/json',
};

// Helper function to create or update HubSpot contact (optional)
async function syncContactToHubSpot(contactData, formType) {
  // If no API key, just log locally
  if (!HUBSPOT_API_KEY) {
    console.log(`✅ Form data logged locally (HubSpot not configured):`, contactData);
    return null;
  }

  try {
    const { firstName, lastName, email, phone, timestamp } = contactData;

    // Prepare custom properties based on form type
    let customProperties = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      hs_lead_status: 'NEW',
    };

    if (formType === 'contact') {
      customProperties.message = contactData.query;
      customProperties.contact_form_submission_date = new Date(timestamp).toISOString();
    } else if (formType === 'affiliate') {
      customProperties.tiktok_handle = contactData.tiktok;
      customProperties.instagram_handle = contactData.instagram;
      customProperties.affiliate_application_date = new Date(timestamp).toISOString();
      customProperties.contact_form_submission_date = new Date(timestamp).toISOString();
    }

    // Create or update contact in HubSpot using hapikey format
    const response = await axios.post(
      `${HUBSPOT_API_URL}/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`,
      {
        properties: customProperties,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log(`✅ HubSpot Contact Created/Updated:`, response.data.id);
    return response.data.id;
  } catch (error) {
    // If contact already exists (409 error), update it instead
    if (error.response?.status === 409) {
      try {
        const email = contactData.email;

        // Get existing contact by email
        const searchResponse = await axios.post(
          `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search?hapikey=${HUBSPOT_API_KEY}`,
          {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email,
                  },
                ],
              },
            ],
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (searchResponse.data.results.length > 0) {
          const contactId = searchResponse.data.results[0].id;

          // Update custom properties based on form type
          let updateProperties = {
            firstname: contactData.firstName,
            lastname: contactData.lastName,
          };

          if (formType === 'contact') {
            updateProperties.message = contactData.query;
          } else if (formType === 'affiliate') {
            updateProperties.tiktok_handle = contactData.tiktok;
            updateProperties.instagram_handle = contactData.instagram;
          }

          await axios.patch(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}?hapikey=${HUBSPOT_API_KEY}`,
            { properties: updateProperties },
            { headers: { 'Content-Type': 'application/json' } }
          );

          console.log(`✅ HubSpot Contact Updated:`, contactId);
          return contactId;
        }
      } catch (updateError) {
        console.error('⚠️ Error updating HubSpot contact:', updateError.message);
        console.log('✅ Form data logged locally instead');
      }
    } else {
      console.error('⚠️ Error syncing to HubSpot:', error.message);
      console.log('✅ Form data logged locally instead');
    }
  }
}

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, query, timestamp } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !query) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Sync to HubSpot
    if (HUBSPOT_API_KEY) {
      await syncContactToHubSpot(
        { firstName, lastName, email, phone, query, timestamp },
        'contact'
      );
    }

    console.log('Contact form submitted:', { firstName, lastName, email, phone });
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Affiliate Form Endpoint
app.post('/api/affiliate', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, tiktok, instagram, timestamp } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !tiktok || !instagram) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Sync to HubSpot
    if (HUBSPOT_API_KEY) {
      await syncContactToHubSpot(
        { firstName, lastName, email, phone, tiktok, instagram, timestamp },
        'affiliate'
      );
    }

    console.log('Affiliate form submitted:', { firstName, lastName, email, phone, tiktok, instagram });
    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing affiliate form:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Newsletter Subscription Endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // Sync to HubSpot
    if (HUBSPOT_API_KEY) {
      try {
        // Check if contact already exists
        const searchResponse = await axios.post(
          `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search?hapikey=${HUBSPOT_API_KEY}`,
          {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email,
                  },
                ],
              },
            ],
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (searchResponse.data.results.length > 0) {
          // Update existing contact with newsletter subscription
          const contactId = searchResponse.data.results[0].id;
          await axios.patch(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}?hapikey=${HUBSPOT_API_KEY}`,
            {
              properties: {
                hs_lead_status: 'SUBSCRIBER',
                newsletter_signup_date: new Date().toISOString(),
              },
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`✅ Newsletter: Updated existing contact ${contactId}`);
        } else {
          // Create new contact
          await axios.post(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`,
            {
              properties: {
                email: email,
                hs_lead_status: 'SUBSCRIBER',
                newsletter_signup_date: new Date().toISOString(),
              },
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`✅ Newsletter: Created new contact for ${email}`);
        }
      } catch (hubspotError) {
        console.error('Error syncing newsletter to HubSpot:', hubspotError.message);
      }
    }

    res.status(200).json({ success: true, message: 'Subscribed to newsletter' });
  } catch (error) {
    console.error('Error processing newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// Checkout/Order Endpoint
app.post('/api/order', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postcode,
      country,
      items,
      subtotal,
      shippingPrice,
      total,
      shippingMethod,
      timestamp,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !address || !city || !postcode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Sync to HubSpot
    if (HUBSPOT_API_KEY) {
      try {
        // Split name
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Check if contact already exists
        const searchResponse = await axios.post(
          `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search?hapikey=${HUBSPOT_API_KEY}`,
          {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email,
                  },
                ],
              },
            ],
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const itemsList = items
          .map((item) => `${item.name} x${item.quantity} (£${(item.price * item.quantity).toFixed(2)})`)
          .join('; ');

        const orderProperties = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          address: address,
          city: city,
          zip: postcode,
          country: country,
          lifecyclestage: 'customer',
          hs_lead_status: 'CUSTOMER',
          order_date: new Date(timestamp).toISOString(),
          order_value: total.toString(),
          order_items: itemsList,
          order_shipping_method: shippingMethod,
          order_subtotal: subtotal.toString(),
          order_shipping_cost: shippingPrice.toString(),
        };

        if (searchResponse.data.results.length > 0) {
          // Update existing contact (customer)
          const contactId = searchResponse.data.results[0].id;
          await axios.patch(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}?hapikey=${HUBSPOT_API_KEY}`,
            { properties: orderProperties },
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`✅ Order: Updated customer contact ${contactId}`);
        } else {
          // Create new customer contact
          await axios.post(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`,
            { properties: orderProperties },
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`✅ Order: Created new customer contact for ${email}`);
        }
      } catch (hubspotError) {
        console.error('Error syncing order to HubSpot:', hubspotError.message);
      }
    }

    res.status(200).json({ success: true, message: 'Order recorded successfully' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    hubspotConnected: !!HUBSPOT_API_KEY,
    endpoints: [
      '/api/contact - Contact form submissions',
      '/api/affiliate - Affiliate applications',
      '/api/newsletter - Newsletter subscriptions',
      '/api/order - Checkout orders',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (HUBSPOT_API_KEY) {
    console.log('✅ HubSpot integration enabled');
    console.log('📊 All data flows connected:');
    console.log('   ✓ Contact form submissions');
    console.log('   ✓ Affiliate applications');
    console.log('   ✓ Newsletter subscriptions');
    console.log('   ✓ Checkout/order information');
  } else {
    console.log('⚠️  HubSpot API key not configured');
  }
});
