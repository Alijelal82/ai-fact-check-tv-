// Vercel Serverless Function: Text-to-Speech via ElevenLabs
// Returns MP3 audio for the given Arabic text using anchor "Alaa"
//
// Env var required: ELEVENLABS_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ELEVENLABS_API_KEY not configured' });
  }

  let text = '';
  try {
    text = (req.body && req.body.text) || '';
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing text' });
  }

  // Voice ID: anchor "Alaa" (Arabic)
  const VOICE_ID = 'drMurExmkWVIH5nW8snR';

  try {
    const elResp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            // Lower stability = more dynamic, faster delivery
            stability: 0.40,
            similarity_boost: 0.75,
            // Higher style = more energetic, faster pace
            style: 0.55,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!elResp.ok) {
      const errText = await elResp.text();
      return res
        .status(elResp.status)
        .json({ error: `TTS Error: HTTP ${elResp.status}`, detail: errText.slice(0, 200) });
    }

    const arrayBuffer = await elResp.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(buf);
  } catch (err) {
    return res.status(500).json({ error: 'TTS Error: ' + (err.message || 'unknown') });
  }
}
