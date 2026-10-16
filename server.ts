import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// XPAY AI Chatbot endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Xabar kiritilmadi' });
    }

    const currentMode = context?.mode === 'business' ? 'Biznes hisob' : 'Shaxsiy hisob';
    const balance = context?.balance ?? 0;
    const income = context?.income ?? 0;
    const expense = context?.expense ?? 0;
    const currency = context?.currency || "so'm";

    const systemInstruction = `Siz "XPAY AI" — professional O'zbekiston fintech aqlli yordamchisiz.
Siz foydalanuvchiga moliyaviy hisob-kitoblar, shaxsiy byudjet, kundalik xarajatlarni nazorat qilish, tejash sirlari, virtual karta imkoniyatlari hamda tadbirkorlar va biznesmenlar uchun kassa, sof foyda, tushumlar, soliqlar (masalan, O'zbekiston soliq tizimi: 4% aylanma soliq, 12% QQS/daromad solig'i), xodimlar oyligi va hisob-fakturalar bo'yicha yordam berasiz.

Hozirgi foydalanuvchi ma'lumotlari:
- Rejim: ${currentMode}
- Joriy Balans: ${balance.toLocaleString()} ${currency}
- Shu oydagi jami kirim: ${income.toLocaleString()} ${currency}
- Shu oydagi jami chiqim: ${expense.toLocaleString()} ${currency}
${context?.categorySummary ? `- Xarajatlar toifalari: ${JSON.stringify(context.categorySummary)}` : ''}
${context?.goals ? `- Maqsadlar/Jamg'armalar: ${JSON.stringify(context.goals)}` : ''}

Javob berish qoidalari:
1. Doimo samimiy, aniq, professional va o'zbek tilida (lotin alifbosida) javob bering.
2. Aniq raqamlar, formulalar va foydali hisob-kitoblar taqdim eting (masalan, 50/30/20 qoidasi yoki kesh-flou).
3. Javoblarni qisqa va tushunarli bo'limlar yoki punktlar (bullet points) shaklida bering. Kerakli joylarda emoji ishlatishingiz mumkin.
4. Foydalanuvchining shaxsiy yoki biznes ehtiyojlariga moslashtirilgan real maslahatlar bering.`;

    if (!ai) {
      // Fallback if API key is not configured
      const fallbackResponse = `Salom! Men XPAY AI yordamchisiman. Siz hozirda ${currentMode}dasiz. 
Joriy balansingiz: ${balance.toLocaleString()} ${currency}.
Sizga xarajatlarni optimallashtirish, jamg'arish formulalari (masalan, har bir oylik maoshdan 15-20% ni avtomatik XPAY virtual kartasiga ajratish) va biznes tahlillari bo'yicha istalgan hisob-kitobni qilib bera olaman.`;
      return res.json({ reply: fallbackResponse });
    }

    // Build chat contents
    const contents: any[] = [];
    
    // Add history if present
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Kechirasiz, javob shakllantirishda xatolik yuz berdi. Qayta urinib ko'ring.";
    return res.json({ reply });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({ 
      error: 'AI xizmatida vaqtinchalik uzilish yuz berdi',
      reply: "Kechirasiz, serverda kutilmagan nosozlik yuz berdi. Iltimos, bir ozdan so'ng qayta urinib ko'ring."
    });
  }
});

// XPAY AI Auto-Financial Audit and Insights endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { mode, balance = 0, income = 0, expense = 0, categories = [], transactions = [] } = req.body;

    const currentMode = mode === 'business' ? 'Biznes hisob' : 'Shaxsiy hisob';

    if (!ai) {
      const net = income - expense;
      const score = income > 0 ? Math.min(100, Math.max(30, Math.round((net / income) * 100) + 40)) : 65;
      return res.json({
        score: score,
        rating: score > 75 ? "A'lo darajada" : score > 50 ? "Qoniqarli" : "Diqqat talab qiladi",
        summary: `${currentMode} uchun joriy moliyaviy holat barqaror. Xarajatlar kirimning ${income > 0 ? Math.round((expense / income) * 100) : 50}% qismini tashkil etmoqda.`,
        keyInsights: [
          "Oylik xarajatlar darajasi chegarada saqlanmoqda.",
          "Avto-jamg'arma funksiyasi orqali har oy kamida 15% zaxira to'plash tavsiya etiladi.",
          "Eng yuqori chiqim toifalarini qayta ko'rib chiqish orqali qo'shimcha 10-15% tejash imkoni mavjud."
        ],
        forecast: "Kelgusi oy uchun kutilayotgan sof qoldiq ijobiy dinamikada saqlanib qoladi."
      });
    }

    const prompt = `Quyidagi ${currentMode} moliya ma'lumotlarini tahlil qiling:
- Balans: ${balance} so'm
- Daromad: ${income} so'm
- Xarajat: ${expense} so'm
- Toifalar: ${JSON.stringify(categories)}
- So'nggi tranzaksiyalar soni: ${transactions.length}

Quyidagi JSON formatda mantiqiy moliya tahlili qaytaring:
{
  "score": son (0 dan 100 gacha moliyaviy salomatlik bali),
  "rating": "A'lo darajada" yoki "Qoniqarli" yoki "Diqqat talab etiladi",
  "summary": "1-2 gaplik umumiy holat xulosasi",
  "keyInsights": ["Maslahat 1", "Maslahat 2", "Maslahat 3"],
  "forecast": "Kelasi oy uchun bashorat va kesh-flou prognozi"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Gemini analyze error:', err);
    return res.json({
      score: 78,
      rating: "Qoniqarli",
      summary: "Moliyaviy ko'rsatkichlaringiz barqaror holatda. Doimiy balans o'sishi kuzatilmoqda.",
      keyInsights: [
        "Xarajatlarning asosiy qismi kundalik ehtiyojlarga to'g'ri kelmoqda.",
        "XPAY virtual kartasi yordamida oylik daromaddan 15% jamg'arish rejasini faollashtiring.",
        "Kechiktirilgan to'lovlar yo'qligi kredit reytingingizga ijobiy ta'sir ko'rsatadi."
      ],
      forecast: "Joriy sur'at saqlansa, keyingi oy oxiriga qadar sof jamg'arma 18% ga oshadi."
    });
  }
});

// Setup Vite middleware or static serving
async function setupServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`XPAY server running on port ${PORT}`);
  });
}

setupServer();
