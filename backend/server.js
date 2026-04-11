import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connect_db } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import resumeRoutes from "./routes/resumeRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(cors({
  origin: "*",
}));
app.use(express.json());

//  CONNECT DATABASE (RESTORED)
connect_db();

app.use("/api/auth", userRouter);
app.use("/api/resumes", resumeRoutes);

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api/ai", aiRoutes);

//  STATIC UPLOADS (RESTORED)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  }),
);


app.post("/generate-summary", async (req, res) => {
  try {
    console.log("🔥 API HIT");

    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("🤖 RAW:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch {
      parsed = [{ experience_level: "AI", summary: cleanText }];
    }

    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error("❌ AI ERROR:", error);
    res.status(500).json({ success: false });
  }
});

// TEST ROUTE
app.get("/test-ai", (req, res) => {
  console.log("✅ TEST HIT");
  res.send("AI route working");
});

// PORT (IMPORTANT: keep SAME as frontend expects)
const PORT = 40000;

app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR:", err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server Started on http://localhost:${PORT}`);
});
