// Debug endpoint to test GHL API
export default async function handler(req, res) {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return res.status(200).json({
      ghl_api_key_set: !!apiKey,
      ghl_location_id_set: !!locationId,
      error: 'Missing GHL credentials',
    });
  }

  // Test the GHL API with a simple request
  try {
    const testResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: locationId,
        firstName: 'Test',
        email: 'test@example.com',
      }),
    });

    const testData = await testResponse.json();

    res.status(200).json({
      ghl_api_key_set: true,
      ghl_location_id: locationId,
      ghl_api_status: testResponse.status,
      ghl_api_response: testData,
    });
  } catch (err) {
    res.status(200).json({
      error: err.message,
      ghl_api_key_set: true,
      ghl_location_id: locationId,
    });
  }
}
