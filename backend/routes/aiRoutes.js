import express from "express";

const router = express.Router();

router.post("/categorize-skills", async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(500).json({
        success: false,
        message: "Skills array required",
      });
    }

    const prompt = `
You are an expert resume assistant.

Categorize the given skills into professional resume categories:

- language: Programming languages (Java, C++, Python, JavaScript, etc.)
- web_development: Frontend and backend web technologies (React, HTML, CSS, Node.js, Express, etc.)
- databases: Database technologies (SQL, MongoDB, PostgreSQL, Firebase, etc.)
- tools: Development tools and platforms (Git, Docker, AWS, VS Code, Jira, etc.)
- it_constructs: Computer science fundamentals (DSA, OOP, OS, DBMS, Networking, System Design, etc.)

STRICT RULES:
1. Include ALL skills — do not drop anything
2. Fix spelling mistakes (e.g., "javasript" → "JavaScript")
3. Expand abbreviations into professional format:
   - DSA → Data Structures and Algorithms (DSA)
   - OS → Operating System (OS)
   - OOP → Object-Oriented Programming (OOP)
   - DBMS → Database Management System (DBMS)
   - CN → Computer Networks (CN)
4. Do NOT misclassify:
   - JavaScript → language
   - DSA → it_constructs
5. If unsure, put skill in "tools"
6. Avoid duplicates
7. Keep names properly capitalized
8. Return empty arrays if no items

Return ONLY JSON in this format:

{
  "language": [],
  "web_development": [],
  "databases": [],
  "tools": [],
  "it_constructs": []
}
Skills:
${JSON.stringify(skills)}
`;

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

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error(" JSON PARSE FAILED:", cleanText);

      // fallback 
      parsed = {
        language: [],
        it_constructs: [],
        web_development: [],
        databases: [],
        tools: [],
      };
    }

    res.json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    console.error(" AI ERROR:", error);
    res.status(500).json({
      success: false,
      message: "AI failed",
    });
  }
});

export default router;