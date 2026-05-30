/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory inquiry storage
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  message: string;
  status: string;
  createdAt: string;
  notes?: string;
}

const inquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Samantha Miller",
    email: "samantha@luminafilm.com",
    phone: "+1 (555) 234-5678",
    service: "video_editing",
    projectType: "Cinematic Travel Commercial",
    message: "Hey Asif! Love your portfolio edits, especially the Bali vlog! We have bulk RAW GoPro and drone files from an Iceland trip and need a high-energy, cinematic promo cut for our Instagram Reels and YouTube. Pacing should be rapid with immersive sound design (swooshes, wind, bass). Let's discuss pricing!",
    status: "In Discussion",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    notes: "Offered Cinematic Package - 4K edit. Client requested custom sound cue integration."
  },
  {
    id: "inq-2",
    name: "Michael Chen",
    email: "m.chen@streetwearlabs.io",
    phone: "+44 7911 123456",
    service: "full_package",
    projectType: "Cyberpunk Streetwear Launch",
    message: "Hi Asif Rafiq, we are launching our winter outerwear streetwear line next month. We have a night photo & video shoot in downtown London rain. We need both portrait photo retouching with high purple/magenta neon color grading AND a 30-sec hype reel for our TikTok/Instagram channels.",
    status: "Unread",
    createdAt: new Date().toISOString(),
  }
];

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Get all inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({ inquiries });
});

// Submit a new inquiry
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, service, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name,
    email,
    phone: phone || '',
    service: service || 'other',
    projectType: projectType || 'General Enquiry',
    message,
    status: 'Unread',
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

// Update an inquiry (status or notes)
app.put('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const inquiry = inquiries.find((i) => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  if (status) inquiry.status = status;
  if (notes !== undefined) inquiry.notes = notes;

  res.json({ success: true, inquiry });
});

// Delete an inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  inquiries.splice(index, 1);
  res.json({ success: true, message: 'Inquiry deleted successfully' });
});

// AI Consult Assistant
app.post('/api/ai-consult', async (req, res) => {
  const { projectType, tone, duration, additionalInfo } = req.body;

  if (!projectType || !tone || !duration) {
    return res.status(400).json({ error: 'Project type, tone, and duration are required.' });
  }

  if (!ai) {
    // Return a beautiful mocked fallback response if API key isn't active
    // so the app still functions perfectly for the previewer
    return res.json({
      conceptName: `Dynamic ${tone} Cut`,
      vibeDescription: `A high-concept ${tone} visual production customized for ${projectType}, tuned for professional impact and modern pacing.`,
      storyboardSteps: [
        {
          step: "Hook / Attention grabber",
          description: `Fast-paced intro displaying the punchiest footage sections. Overlay title text matching a ${tone} theme.`,
          durationEstimate: "0:00 - 0:05"
        },
        {
          step: "Narrative Build",
          description: "Establish the scene, introduce subjects or background, use speed ramps and matching atmospheric sound cues.",
          durationEstimate: "0:05 - 0:20"
        },
        {
          step: "Peak Climax",
          description: "Stroboscopic editing beats, motion-tracked text callouts, or saturated color peaks to showcase high value assets.",
          durationEstimate: "0:20 - 0:45"
        },
        {
          step: "Call to Action / Branding",
          description: `Clean fade to your channel handles, Instagram profile, or logo overlay. Muted background tail-out.`,
          durationEstimate: "0:45 - 0:50"
        }
      ],
      editingRecommendations: {
        transitions: "Whip pans, speed ramp bursts, and fluid cross-dissolves.",
        colorGrading: `Cinematic grading with rich contrast, optimized for a ${tone} mood.`,
        audioTrack: "Rhythmic background beat synchronized with footage motion and cuts.",
        visualEffects: "Subtle zoom shake effect on beat drops, clean text lower-thirds."
      },
       estimatedPacing: "Dynamic, musical rhythm-driven cuts.",
      estimatedPriceBracket: "$10 - $40 (depending on complexity)",
      customQuoteNote: "Submit your contact form with Asif Creative Edits to transform this digital outline into professional motion gold! Let's get started on WhatsApp today."
    });
  }

  try {
    const prompt = `
You are the AI Creative Director representing "Asif Creative Edits", the professional video and photo editing service of Asif Rafiq.
A client is planning a project and wants an expert Consultation & Editing Strategy.

Client Project Details:
- Project Type: ${projectType}
- Desired Tone: ${tone}
- Estimated Target Duration: ${duration}
- Additional Info: ${additionalInfo || 'No additional notes provided.'}

Generate a comprehensive Creative Consultation Report in JSON format that matches the following structure exactly:
{
  "conceptName": "A catchy, custom creative name for their project (e.g. 'Glitch Hype Cinematic' or 'Golden Hour Nostalgia')",
  "vibeDescription": "A 2-3 sentence evocative description of the emotional and visual vibe of the output.",
  "storyboardSteps": [
    {
      "step": "Intro / Opening Scene",
      "description": "Visual scene, action overlay, pacing, and camera angle recommendations.",
      "durationEstimate": "0:00 - 0:05"
    }
  ],
  "editingRecommendations": {
    "transitions": "Specific transition styles recommended.",
    "colorGrading": "Exact color palette, aesthetic, LUT description.",
    "audioTrack": "Recommended soundtrack genre, beats, sound effects layering.",
    "visualEffects": "Any motion graphics, overlays, text tracking, or grain recommended."
  },
  "estimatedPacing": "Describe the edit pacing.",
  "estimatedPriceBracket": "Suggest a reasonable, budget-friendly price range (e.g. '$10 - $30' or '$40 depending on edit complexity'). Keep it competitive with Asif's direct tier pricing.",
  "customQuoteNote": "A warm, personal sign-off from Asif's Creative Desk advising them to hit 'Pre-Fill Contact Form' to submit these AI conceptual specs directly for booking."
}

Generate exactly 3 or 4 elements in the 'storyboardSteps' array representing key timestamps of the draft edit.
Ensure the response is valid JSON and do not wrap it in markdown pre blocks (\`\`\`json). Return ONLY the raw JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text?.trim() || '{}';
    // Double sanity check parsing
    const parsedData = JSON.parse(textOutput);
    res.json(parsedData);
  } catch (error: any) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({
      error: 'Failed to generate consultation plan from Gemini API.',
      details: error.message,
    });
  }
});

// Vite Setup Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
