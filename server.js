require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  const { message, model } = req.body || {};
  const apiKey = process.env.GROQ_API_KEY;
  const selectedModel = model || GROQ_MODEL;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key is missing.' });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: 'user', content: message.trim() }]
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(groqResponse.status).json({
        error: data?.error?.message || 'Failed to get response from Groq.'
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'No content returned from Groq.' });
    }

    return res.json({ reply });
  } catch (error) {
    console.error('Groq request failed:', error);
    return res.status(500).json({ error: 'Something went wrong while contacting Groq.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot.html'));
});

app.listen(PORT, () => {
  console.log(`Chatbot server running at http://localhost:${PORT}`);
});
