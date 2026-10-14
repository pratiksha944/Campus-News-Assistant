/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CAMPUS_ITEMS, getCampusKnowledgeBase } from './src/data/campusData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // API Route: Get all campus news and items
  app.get('/api/news', (_req, res) => {
    res.json({ items: CAMPUS_ITEMS });
  });

  // API Route: Campus AI Chatbot assistant with Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'A message string is required.' });
        return;
      }

      const campusContext = getCampusKnowledgeBase();

      // If GEMINI_API_KEY is available and not a placeholder
      const apiKey = process.env.GEMINI_API_KEY;
      const isValidKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '';

      if (isValidKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const systemInstruction = `You are CampusPulse AI, the official student assistant for the university.
You have direct access to the university's campus knowledge base, which includes:
- Latest Campus News & Research Highlights
- Official College Announcements & Midterm Exam Schedules
- Workshops, Guest Lectures & Cultural Festivals
- Collegiate Hackathons (InnovateHacks, CodeForGood, CyberDefend)
- Placement & Internship Drives (Google, Microsoft, Deloitte, Stripe)

Guidelines:
1. Answer the student's question accurately, warmly, and helpfully using the provided campus knowledge base.
2. When mentioning specific events, announcements, hackathons, or placement drives, mention key details like exact dates, deadlines, eligibility criteria (CGPA/batch), venues, prize money, or compensation packages.
3. Keep answers clear and easy to read. Use bullet points or bold text where appropriate.
4. If the student asks something not covered in the knowledge base, answer politely and advise them which campus office (e.g. Registrar, Examination Cell, Placement Directorate, Financial Aid Office) to contact.
5. In your response, if you referenced specific items from the knowledge base, append a line at the very end in this format:
[RELATED_ITEMS: item_id_1, item_id_2] (using only the IDs in [ID: ...], maximum 3 items).`;

          const prompt = `Campus Knowledge Base:\n${campusContext}\n\nStudent Question: ${message}`;

          // Add a 7-second timeout so response is fast and never hangs
          const apiPromise = ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction,
            },
          });

          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Gemini API timeout')), 7000)
          );

          const response = await Promise.race([apiPromise, timeoutPromise]);

          let replyText = response.text || '';
          let relatedItemIds: string[] = [];

          const match = replyText.match(/\[RELATED_ITEMS:\s*([^\]]+)\]/);
          if (match) {
            relatedItemIds = match[1]
              .split(',')
              .map((s: string) => s.trim())
              .filter((id: string) => CAMPUS_ITEMS.some((item) => item.id === id));
            replyText = replyText.replace(/\[RELATED_ITEMS:[^\]]+\]/, '').trim();
          }

          res.json({ reply: replyText, relatedItemIds });
          return;
        } catch (apiError) {
          console.warn('Gemini API call bypassed or timed out, using campus knowledge engine:', apiError);
          // Fall through to smart grounded fallback
        }
      }

      // Smart grounded fallback if GEMINI_API_KEY is not configured
      const stopWords = new Set([
        'the', 'and', 'what', 'when', 'is', 'for', 'are', 'there', 'any', 'tell',
        'about', 'how', 'can', 'with', 'who', 'this', 'that', 'from', 'does', 'have',
        'has', 'been', 'will', 'you', 'your', 'please', 'know', 'some', 'were'
      ]);

      const queryLower = message.toLowerCase();
      const queryTerms = queryLower
        .split(/[^a-zA-Z0-9]+/)
        .filter((t: string) => t.length >= 3 && !stopWords.has(t));

      // Score items by matching terms
      const scoredItems = CAMPUS_ITEMS.map((item) => {
        let score = 0;
        const searchableText = `${item.title} ${item.category} ${item.tags.join(' ')} ${item.summary} ${item.department} ${item.eligibility || ''}`.toLowerCase();
        
        for (const term of queryTerms) {
          if (item.title.toLowerCase().includes(term)) score += 5;
          if (item.tags.some(t => t.toLowerCase().includes(term))) score += 4;
          if (item.category.toLowerCase().includes(term)) score += 3;
          if (searchableText.includes(term)) score += 2;
        }

        return { item, score };
      })
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item)
      .slice(0, 3);

      let reply = '';
      if (scoredItems.length > 0) {
        reply = `Here is what I found in our verified campus records regarding your inquiry:\n\n${scoredItems
          .map(
            (item) =>
              `• **${item.title}** (${item.category.toUpperCase()})\n  ` +
              `*Date/Deadline:* ${item.deadline || item.date} | *Venue:* ${item.venue || 'Campus'}\n  ` +
              `${item.summary}`
          )
          .join('\n\n')}\n\nFeel free to ask for more specifics on eligibility criteria, registration steps, or contact info!`;
      } else {
        reply = `I could not find a direct match for "${message}" in today's published bulletins. You can browse our dedicated categories above: **College Announcements**, **Events & Workshops**, **Hackathons**, and **Placement Drives**, or contact the Helpdesk for assistance.`;
      }

      res.json({
        reply,
        relatedItemIds: scoredItems.map((m) => m.id),
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
      res.status(500).json({
        error: 'Assistant request failed',
        reply: 'Sorry, I encountered a temporary connection issue while accessing the campus directory. Please try again in a moment!',
      });
    }
  });

  // Development: Mount Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`CampusPulse server listening on port ${port}`);
  });
}

startServer();
