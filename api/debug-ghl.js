// Debug endpoint to check GHL configuration
export default function handler(req, res) {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  res.status(200).json({
    ghl_api_key_set: !!apiKey,
    ghl_api_key_length: apiKey ? apiKey.length : 0,
    ghl_api_key_preview: apiKey ? apiKey.substring(0, 20) + '...' : 'NOT SET',
    ghl_location_id_set: !!locationId,
    ghl_location_id: locationId || 'NOT SET',
  });
}
