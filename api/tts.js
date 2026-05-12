export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ELEVENLABS_API_KEY not configured in Vercel'
    });
  }

  const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'drMurExmkWVIH5nW8snR';
  const MODEL_ID = 'eleven_multilingual_v2';

  const { text } = req.body || {};

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'No text provided' });
  }

  if (text.length > 2000) {
    return res.status(400).json({ error: 'Text too long (max 2000 chars)' });
  }

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

    const elevenResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.4,
          use_speaker_boost: true
        }
      })
    });

    if (!elevenResponse.ok) {
      const errorText = await elevenResponse.text();
      let errorMsg = `ElevenLabs HTTP ${elevenResponse.status}`;

      try {
        const errData = JSON.parse(errorText);
        if (errData.detail?.message) {
          errorMsg = errData.detail.message;
        }
      } catch (e) {}

      if (elevenResponse.status === 401) errorMsg = 'Invalid API Key';
      else if (elevenResponse.status === 429) errorMsg = 'Rate limit exceeded';

      return res.status(elevenResponse.status).json({ error: errorMsg });
    }

    const audioBuffer = Buffer.from(await elevenResponse.arrayBuffer());

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=2592000');

    return res.status(200).send(audioBuffer);

  } catch (err) {
    console.error('TTS Error:', err);
    return res.status(500).json({
      error: 'Connection error: ' + (err.message || 'unknown')
    });
  }
}
