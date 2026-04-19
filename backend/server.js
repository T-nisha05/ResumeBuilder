// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import { connect_db } from "./config/db.js";
// import userRouter from "./routes/userRouter.js";
// import resumeRoutes from "./routes/resumeRoutes.js";

// import path from "path";
// import { fileURLToPath } from "url";

// dotenv.config();

// const app = express();

// // Fix __dirname (ES module)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MIDDLEWARE
// app.use(cors({
//   origin: "*",
// }));
// app.use(express.json());

// //  CONNECT DATABASE (RESTORED)
// connect_db();

// app.use("/api/auth", userRouter);
// app.use("/api/resumes", resumeRoutes);

// import aiRoutes from "./routes/aiRoutes.js";
// app.use("/api/ai", aiRoutes);

// //  STATIC UPLOADS (RESTORED)
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"), {
//     setHeaders: (res) => {
//       res.set("Access-Control-Allow-Origin", "*");
//     },
//   }),
// );

// app.post("/generate-summary", async (req, res) => {
//   try {
//     console.log(" API HIT");

//     const { prompt } = req.body;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     const text =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     const cleanText = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let parsed;

//     try {
//       parsed = JSON.parse(cleanText);
//     } catch {
//       parsed = [{ experience_level: "AI", summary: cleanText }];
//     }

//     res.json({ success: true, data: parsed });

//   } catch (error) {
//     console.error(" AI ERROR:", error);
//     res.status(500).json({ success: false });
//   }
// });

// // TEST ROUTE
// app.get("/test-ai", (req, res) => {
//   console.log("TEST HIT");
//   res.send("AI route working");
// });

// // PORT
// const PORT = 40000;

// app.use((err, req, res, next) => {
//   console.error("💥 GLOBAL ERROR:", err);
//   res.status(500).json({ error: err.message });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server Started on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connect_db } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

console.log("API KEY:", process.env.GEMINI_API_KEY);

dotenv.config();

const app = express();
const aiCache = new Map();

// Fix __dirname (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

// CONNECT DATABASE
connect_db();

// ROUTES
app.use("/api/auth", userRouter);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

// STATIC UPLOADS
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  }),
);


// GEMINI CALL WITH RETRY
const callGemini = async (prompt, retries = 2) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    // 🚨 handle errors
    if (
      data?.error?.code === 429 ||
      data?.error?.message?.includes("high demand")
    ) {
      throw new Error("RETRY");
    }

    return data;

  } catch (err) {
    if (retries > 0) {
      console.log("🔁 Retrying...", retries);

      await new Promise((res) => setTimeout(res, 1500));

      return callGemini(prompt, retries - 1);
    }

    // ✅ FINAL fallback (no crash)
    return {
      candidates: [
        {
          content: {
            parts: [
              {
                text: JSON.stringify([
                  {
                    level: "AI",
                    description:
                      "• Unable to generate AI content right now\n• Please try again in a few seconds",
                  },
                ]),
              },
            ],
          },
        },
      ],
    };
  }
};


// AI ROUTE
app.post("/generate-summary", async (req, res) => {
  try {
    console.log("API HIT");

    const { prompt } = req.body;
    const cacheKey = prompt;

if (aiCache.has(cacheKey)) {
  console.log("⚡ CACHE HIT");

  return res.json({
    success: true,
    data: aiCache.get(cacheKey),
  });
}

    // const response = await fetch(
    //   `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       contents: [
    //         {
    //           parts: [{ text: prompt }],
    //         },
    //       ],
    //     }),
    //   },
    // );

    // const data = await response.json();

    const data = await callGemini(prompt);

    console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    if (data?.error) {
      console.error("❌ GEMINI ERROR:", data.error.message);

      if (data.error.code === 429) {
        return res.json({
          success: false,
          error: "AI is busy or limit reached. Try again later.",
          data: [],
        });
      }

      return res.json({
        success: false,
        error: data.error.message,
        data: [],
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("") || "";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    if (!cleanText) {
      return res.json({ success: true, data: [] });
    }

    let parsed = [];

    try {
      parsed = JSON.parse(cleanText);

      parsed = parsed.map((item) => ({
        level: item.level || item.experience_level || "AI",
        description: item.description || item.summary || "",
      }));
    } catch {
      parsed = [
        {
          level: "AI",
          description: cleanText
            .replace(/•/g, "\n• ")
            .replace(/^\n/, "")
            .trim(),
        },
      ];
    }

    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("❌ AI ERROR:", error);
    res.status(500).json({ success: false });
  }
});

//     if (data?.error) {
//       console.error("❌ GEMINI ERROR:", data.error.message);

//       return res.json({
//         success: false,
//         error: data.error.message,
//         data: [],
//       });
//     }
//     if (data?.error?.code === 429) {
//       return res.json({
//         success: false,
//         error: "Daily AI limit reached. Try again later.",
//       });
//     }
//     const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

//     const cleanText = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let parsed = [];

//     if (!cleanText) {
//       console.error("❌ EMPTY AI RESPONSE");
//       return res.json({ success: true, data: [] });
//     }

//     try {
//       parsed = JSON.parse(cleanText);

// // normalize keys
// parsed = parsed.map((item) => ({
//   level: item.level || item.experience_level || "AI",
//   description: item.description || item.summary || "",
// }));
//     } catch (err) {
//       console.error("❌ JSON PARSE FAILED");
//       console.log("RAW AI TEXT:", cleanText);

//       // fallback: convert plain text into bullets
//       parsed = [
//         {
//           level: "AI",
//           description: cleanText
//             .replace(/•/g, "\n• ")
//             .replace(/^\n/, "")
//             .trim(),
//         },
//       ];
//     }

//     res.json({ success: true, data: parsed });
//   } catch (error) {
//     console.error("❌ AI ERROR:", error);
//     res.status(500).json({ success: false });
//   }
// });

// TEST ROUTE
app.get("/test-ai", (req, res) => {
  console.log("TEST HIT");
  res.send("AI route working");
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR:", err);
  res.status(500).json({ error: err.message });
});

// PORT
const PORT = 40000;

app.listen(PORT, () => {
  console.log(`🚀 Server Started on http://localhost:${PORT}`);
});

