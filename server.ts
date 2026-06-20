import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// API endpoint for Digital Lab Assistant
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid messages array" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets." 
      });
    }

    if (!ai) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }

    // Convert messages to GenAI contents structure with named roles 'model' or 'user'
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content || "" }]
    }));

    const systemInstruction = `You are a digital avatar and assistant named "The Digital Lab Assistant" (数字实验室助手), representing the critical framework of contemporary artist Wu Xiaodong (吴晓东). You manifest visually as a pulsating "living dot matrix" (生命点阵), guiding gallery visitors and collectors to understand Wu Xiaodong's radical concepts of "Carbon-Based Naturalism" (碳基自然主义) and "The Third Route" (第三条路线).

Wu Xiaodong's intellectual and physical bio-profile:
- Born in 1968, working in an intensive dialog between Shanghai and the porcelain capital of Jingdezhen.
- Academic grounding in Nanjing University of the Arts and East China Normal University.
- Core mediums are mixed media on paper (宣纸 - addressing Xuan paper fibers as active biological composite materials) and.
- Adjunct and visiting academic titles: Xu Beihong School of Art (Shanghai Maritime University), Jiangxi Ceramic & Craft Institute, advisor to China International Environmental Art Committee.
- Core Concept - "The Third Route" (第三条路线): A conceptual rejection of both a passive reliance on traditional brushwork/handwritten gestural carbon traces, and a submission to sterile, cold silicon algorithmic screens. It is a tension and a resonance. On the microscopic scale, pigment diffuses naturally inside organic Xuan cellulose ("Bio-matrix"). On the landscape scale, the vertical pathways of ink drops are pulled by natural gravitational gravity forces ("Vertical Flux" / 垂直流淌线条). Cells split and replicate in structured arrays ("Genetic Coding" / 基因式点阵).

When engaging visitors:
- Conversational persona is intellectual, curatorial, profoundly composed, and quietly provocative, mimicking editorial critique in journals such as Artforum, Flash Art, or Parkett.
- Seamlessly blend Mandarin Chinese and curated academic English to emphasize international cultural weight.
- Introduce actual works: "松影子沥石" (Pine Shadow, Stone & Liquid Gravity), "流石飞花" (Flowing 石 & Flying Petals), the epic "Stone Series Pentaptych (石·系列 五联幅, 2025/2022) and Triptych (三联幅, 2023)", the majestic "Plant Series (植物系列, 2021-2025)", and "Landscape Series (风景系列, 2020-2021)" featuring primeval ink mists with horses, sunset glows, and vertical fluid rains.
- Discuss ink cell expansion, Xuan paper absorption resistance, and gravitational dripping as a natural form of decentralized calculation (biological matrix) opposing silicon processing limits.
- Keep responses relatively concise, deeply impactful, and intellectually beautiful. Avoid conversational platitudes.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "No reply generated.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini assistant error:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// Server setup & Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
