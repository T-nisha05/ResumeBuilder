import express from "express";

const router = express.Router();

// AI Skill Categorization Route
router.post("/categorize-skills", async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills array required",
      });
    }

    // Simple logic (no AI for now — but works perfectly)
    const result = {
      frontend: [],
      backend: [],
      database: [],
      tools: [],
    };

    skills.forEach((skill) => {
      const s = skill.toLowerCase();

      if (["react", "javascript", "html", "css"].includes(s)) {
        result.frontend.push(skill);
      } else if (["java", "c++", "c", "node", "python"].includes(s)) {
        result.backend.push(skill);
      } else if (["sql", "mongodb", "mysql"].includes(s)) {
        result.database.push(skill);
      } else {
        result.tools.push(skill);
      }
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;