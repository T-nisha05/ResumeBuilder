"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { Plus, Trash2, Brain, LoaderCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import {
  commonStyles,
  additionalInfoStyles,
  certificationInfoStyles,
  contactInfoStyles,
  educationDetailsStyles,
  profileInfoStyles,
  projectDetailStyles,
  skillsInfoStyles,
  workExperienceStyles,
} from "../assets/dummystyle";

// AdditionalInfoForm Component
export const AdditionalInfoForm = ({
  achievements,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className={additionalInfoStyles.container}>
      <h2 className={additionalInfoStyles.heading}>Additional Information</h2>

      {/* Achievements Section */}
      <div className="mb-10">
        <h3 className={additionalInfoStyles.sectionHeading}>
          <div className={additionalInfoStyles.dotViolet}></div>
          Achievements
        </h3>

        <div className="space-y-6">
          {achievements?.map((item, index) => (
            <div key={index} className={additionalInfoStyles.languageItem}>
              <Input
                label="Title"
                placeholder="e.g. Solved 300+ DSA problems"
                value={item.title || ""}
                onChange={({ target }) =>
                  updateArrayItem("achievements", index, "title", target.value)
                }
              />

              {achievements.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem("achievements", index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${additionalInfoStyles.addButtonLanguage}`}
            onClick={() =>
              addArrayItem("achievements", {
                title: "",
              })
            }
          >
            <Plus size={16} /> Add Achievement
          </button>
        </div>
      </div>
    </div>
  );
};

// CertificationInfoForm Component
export const CertificationInfoForm = ({
  certifications,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className={certificationInfoStyles.container}>
      <h2 className={certificationInfoStyles.heading}>Certifications</h2>
      <div className="space-y-6 mb-6">
        {certifications.map((cert, index) => (
          <div key={index} className={certificationInfoStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Certificate Title"
                placeholder="Full Stack Web Developer"
                value={cert.title || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
              />

              <Input
                label="Issuer"
                placeholder="Coursera / Google / etc."
                value={cert.issuer || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "issuer", target.value)
                }
              />

              <Input
                label="Year"
                placeholder="2026"
                value={cert.year || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "year", target.value)
                }
              />
            </div>

            {certifications.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${certificationInfoStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>
    </div>
  );
};

// ContactInfoForm Component
export const ContactInfoForm = ({ contactInfo, updateSection, errors }) => {
  return (
    <div className={contactInfoStyles.container}>
      <h2 className={contactInfoStyles.heading}>Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EMAIL */}
        <div className="flex flex-col">
          <Input
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={contactInfo.email || ""}
            onChange={({ target }) => updateSection("email", target.value)}
            error={errors?.email}
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              ⚠ {errors.email}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div className="flex flex-col">
          <Input
            label="Phone Number"
            placeholder="1234567890"
            value={contactInfo.phone || ""}
            onChange={({ target }) => updateSection("phone", target.value)}
            error={errors?.phone}
          />
          {errors?.phone && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              ⚠ {errors.phone}
            </p>
          )}
        </div>

        {/* LINKEDIN */}
        <Input
          label="LinkedIn"
          placeholder="linkedin.com/in/username"
          value={contactInfo.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
        />

        {/* GITHUB */}
        <Input
          label="GitHub"
          placeholder="github.com/username"
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
        />

        {/* LEETCODE */}
        <Input
          label="LeetCode"
          placeholder="leetcode.com/username"
          value={contactInfo.leetcode || ""}
          onChange={({ target }) => updateSection("leetcode", target.value)}
        />

        {/* PORTFOLIO */}
        <Input
          label="Portfolio / Website"
          placeholder="yourwebsite.com"
          value={contactInfo.website || ""}
          onChange={({ target }) => updateSection("website", target.value)}
        />
      </div>
    </div>
  );
};

// EducationDetailsForm Component
export const EducationDetailsForm = ({
  educationInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  errors,
}) => {
  return (
    <div className={educationDetailsStyles.container}>
      <h2 className={educationDetailsStyles.heading}>Education</h2>

      <div className="space-y-6 mb-6">
        {educationInfo.map((education, index) => (
          <div key={index} className={educationDetailsStyles.item}>
              <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        Education Type
      </label>
      <select
        value={education.type || ""}
        onChange={(e) =>
          updateArrayItem(index, "type", e.target.value)
        }
        className={educationDetailsStyles.selectField}>

        <option value="">Select Type</option>
        <option value="graduation">Graduation</option>
        <option value="Class XII">Class XII</option>
        <option value="Class X">Class X</option>
      </select>
    </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* DEGREE / STREAM / BOARD */}
  <div className="flex flex-col">
    <Input
      label={
        education.type === "graduation"
          ? "Degree"
          : education.type === "Class XII"
          ? "Stream"
          : "Board"
      }
      placeholder={
        education.type === "graduation"
          ? "B.Tech in Computer Science"
          : education.type === "Class XII"
          ? "PCM/Bio/Commerce"
          : "CBSE"
      }
      value={education.degree || ""}
      onChange={({ target }) =>
        updateArrayItem(index, "degree", target.value)
      }
      error={errors?.[`degree_${index}`]}
    />

    {errors?.[`degree_${index}`] && (
      <p className="text-red-500 text-sm flex items-center gap-1">
        ⚠ {errors[`degree_${index}`]}
      </p>
    )}
  </div>

  {/* INSTITUTION */}
  <div className="flex flex-col">
  <Input
    label={
      education.type === "graduation"
        ? "College Name"
        : "School Name"
    }
    placeholder={
      education.type === "graduation"
        ? "ABC University"
        : "ABC School"
    }
    value={education.institution || ""}
    onChange={({ target }) =>
      updateArrayItem(index, "institution", target.value)
    }
    error={errors?.[`institution_${index}`]}
  />

  {errors?.[`institution_${index}`] && (
    <p className="text-red-500 text-sm flex items-center gap-1">
      ⚠ {errors[`institution_${index}`]}
    </p>
  )}
</div>

  {/* YEAR */}
  <div className="flex flex-col">
    <Input
      label="Year"
      type="number"
      placeholder="2023"
      value={education.endDate || ""}
      onChange={({ target }) => {
        console.log(target.value); //check
        updateArrayItem(index, "endDate", target.value)
      }}
      error={errors?.[`endDate_${index}`]}
    />

    {errors?.[`endDate_${index}`] && (
      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
        ⚠ {errors[`endDate_${index}`]}
      </p>
    )}
  </div>

  {/* CGPA / PERCENTAGE */}
  <div className="flex flex-col">
    <Input
      label={
        education.type === "graduation"
          ? "CGPA"
          : "Percentage"
      }
      placeholder={
        education.type === "graduation"
          ? "8.5"
          : "85%"
      }
      value={education.score || ""}
      onChange={({ target }) =>
        updateArrayItem(index, "score", target.value)
      }
    />
  </div>

</div>

            {/* DELETE BUTTON */}
            {educationInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* ADD BUTTON */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${educationDetailsStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              type: "", // graduation | class12 | class10
              degree: "",
              institution: "",
              endDate: "",
              score: "", 
            })
          }
        >
          <Plus size={16} /> Add Education
        </button>
      </div>
    </div>
  );
};

// ProfileInfoForm Component
export const ProfileInfoForm = ({ profileData, updateSection, errors }) => {
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const handleGenerateSummary = async () => {
    try {
      setLoading(true);

      const prompt = `
      Job Title: ${profileData.designation}

      Write 3 professional resume summaries:
      - Fresher
      - Mid-level
      - Experienced

      Each should be 1-2 lines.

      Return ONLY JSON:
      [
        { "experience_level": "Fresher", "summary": "..." },
        { "experience_level": "Mid-level", "summary": "..." },
        { "experience_level": "Experienced", "summary": "..." }
      ]
      `;

      const response = await fetch("http://127.0.0.1:40000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await response.json();

      let suggestions = data?.data;

      // ❌ backend failure
      if (!data?.success || !suggestions) {
        setAiSuggestions([
          {
            experience_level: "AI",
            summary:
              "Unable to generate AI content right now.\nPlease try again.",
          },
        ]);
        return;
      }

      //  string → JSON
      if (typeof suggestions === "string") {
        try {
          suggestions = suggestions
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          suggestions = JSON.parse(suggestions);
        } catch (e) {
          console.error("❌ JSON PARSE FAILED:", suggestions);

          suggestions = [
            {
              experience_level: "AI",
              summary: "Unable to parse AI response. Try again.",
            },
          ];
        }
      }

      if (!Array.isArray(suggestions) || suggestions.length === 0) {
        suggestions = [
          {
            experience_level: "AI",
            summary:
              "Unable to generate AI content right now.\nPlease try again.",
          },
        ];
      }
      setAiSuggestions(suggestions);
    } catch (err) {
      console.error("AI Error:", err);

      setAiSuggestions([
        {
          experience_level: "AI",
          summary: "Server error. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={profileInfoStyles.container}>
      <h2 className={profileInfoStyles.heading}>Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FULL NAME */}
        <div className="flex flex-col">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            error={errors?.fullName}
          />
          {errors?.fullName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              ⚠ {errors.fullName}
            </p>
          )}
        </div>

        {/* DESIGNATION */}
        <div className="flex flex-col">
          <Input
            label="Designation"
            placeholder="Full Stack Developer"
            value={profileData.designation || ""}
            onChange={({ target }) =>
              updateSection("designation", target.value)
            }
            error={errors?.designation}
          />
          {errors?.designation && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              ⚠ {errors.designation}
            </p>
          )}
        </div>

        {/* SUMMARY */}
        <div className="md:col-span-2 flex flex-col gap-3 w-full overflow-hidden">
          {/* LABEL + BUTTON */}
          <div className="flex justify-between font-bold items-center mb-3">
            <label>Objective</label>

            <button
              type="button"
              onClick={handleGenerateSummary}
              className="
          flex items-center justify-center gap-2
          w-auto min-w-45
          px-5 py-2.5
          rounded-xl border
          text-[15px] font-medium
          text-purple-700 border-purple-500 bg-white
          hover:bg-purple-50 hover:text-black hover:border-purple-600
          transition-all duration-200 ease-in-out
        "
            >
              {loading ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              Generate from AI
            </button>
          </div>

          {/* TEXTAREA */}
          <textarea
            value={profileData.summary || ""}
            onChange={(e) => updateSection("summary", e.target.value)}
            placeholder="Write a short professional summary..."
            rows={5}
            className="
    w-full
    px-4 py-3
    text-sm
    rounded-2xl
    border-2 border-purple-400
    bg-white
    shadow-[0_0_0_4px_rgba(168,85,247,0.15)]
    focus:outline-none
    focus:border-purple-500
    focus:shadow-[0_0_0_4px_rgba(168,85,247,0.25)]
    transition
  "
          />

          {/* AI Suggestions */}
          {aiSuggestions?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Suggestions</h3>

              {aiSuggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    updateSection("summary", item.description);
                  }}
                  className="p-3 border rounded-lg mt-2 cursor-pointer hover:bg-gray-100"
                >
                  <p className="text-sm font-bold text-purple-600">
                    {item.level}
                  </p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ProjectDetailForm Component
export const ProjectDetailForm = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState({});

  // AI GENERATION FUNCTION
  const handleGenerateProjectDescription = async (index, project) => {
    try {
      setLoadingIndex(index);

      const prompt = `
Project Title: ${project.name}

Write 3 professional resume-ready project descriptions:
- Beginner
- Intermediate
- Advanced

Each should be 2-3 lines.

⚠️ VERY IMPORTANT:
Each line MUST start with "• " (bullet symbol).
Do NOT write paragraphs.

Return ONLY JSON:
[
  { "level": "Beginner", "description": "..." },
  { "level": "Intermediate", "description": "..." },
  { "level": "Advanced", "description": "..." }
]
`;
      const response = await fetch("http://127.0.0.1:40000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      let suggestions = data?.data || data;

      // 🧠 CASE 1: Gemini raw response (candidates)
      if (data?.candidates) {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        try {
          suggestions = JSON.parse(text);
        } catch (e) {
          console.error("Parse failed (candidates):", text);
          suggestions = [];
        }
      }

      // 🧠 CASE 2: string JSON
      else if (typeof suggestions === "string") {
        try {
          suggestions = JSON.parse(suggestions);
        } catch (e) {
          console.error("Parse failed (string):", suggestions);
          suggestions = [];
        }
      }

      // 🧠 FINAL PROCESS
      if (Array.isArray(suggestions)) {
        const normalized = suggestions.map((item) => ({
          level: item.level || item.experience_level || "AI",
          description: item.description || item.summary || "",
        }));

        setAiSuggestions((prev) => ({
          ...prev,
          [index]: normalized,
        }));

        console.log("FINAL SUGGESTIONS:", normalized);
      } else {
        console.error("Invalid AI response:", data);
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div className={projectDetailStyles.container}>
      <h2 className={projectDetailStyles.heading}>Projects</h2>

      <div className="space-y-6 mb-6">
        {projectInfo.map((project, index) => (
          <div key={index} className={projectDetailStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PROJECT TITLE */}
              <div className="md:col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Portfolio Website"
                  value={project.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "name", target.value)
                  }
                />
              </div>

              {/* GITHUB */}
              <Input
                label="GitHub Link"
                placeholder="github.com/username/project"
                value={project.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
              />

              {/* LIVE DEMO */}
              <Input
                label="Live Demo URL"
                placeholder="yourproject.vercel.app"
                value={project.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
              />

              {/*  DESCRIPTION */}
              <div className="md:col-span-2 flex flex-col gap-3 w-full overflow-hidden">
                {/* LABEL + BUTTON */}
                <div className="flex justify-between items-center font-bold">
                  <label>Description</label>

                  <button
                    type="button"
                    onClick={() =>
                      handleGenerateProjectDescription(index, project)
                    }
                    className="
                      flex items-center gap-2
                      px-5 py-2.5
                      rounded-xl border
                      text-[15px] font-medium
                      text-purple-700 border-purple-500 bg-white
                      hover:bg-purple-50 hover:text-black hover:border-purple-600
                      transition-all duration-200
                    "
                  >
                    {loadingIndex === index ? (
                      <LoaderCircle className="animate-spin w-4 h-4" />
                    ) : (
                      <Brain className="w-4 h-4" />
                    )}
                    Generate from AI
                  </button>
                </div>

                {/* TEXT AREA */}
                <textarea
                  value={project.description || ""}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (value.length === 1 && value !== "•") {
                      value = "• " + value;
                    }

                    updateArrayItem(index, "description", value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const textarea = e.target;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;

                      const value = project.description || "";

                      const newValue =
                        value.substring(0, start) +
                        "\n• " +
                        value.substring(end);

                      updateArrayItem(index, "description", newValue);

                      // move cursor after bullet
                      setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd =
                          start + 3;
                      }, 0);
                    }
                  }}
                  placeholder="Write project description..."
                  rows={5}
                  className="
    w-full
    px-4 py-3
    text-sm
    rounded-2xl
    border-2 border-purple-400
    bg-white
    shadow-[0_0_0_4px_rgba(168,85,247,0.15)]
    focus:outline-none
    focus:border-purple-500
    focus:shadow-[0_0_0_4px_rgba(168,85,247,0.25)]
    transition
  "
                />

                {/* AI SUGGESTIONS */}
                {aiSuggestions[index]?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="font-semibold">Suggestions</h3>

                    {aiSuggestions[index].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          updateArrayItem(
                            index,
                            "description",
                            item.description,
                          );
                          updateArrayItem(
                            index,
                            "description",
                            item.description || item.summary,
                          );
                        }}
                        className="p-3 border rounded-lg mt-2 cursor-pointer hover:bg-gray-100"
                      >
                        <p className="text-sm font-bold text-purple-600">
                          {item.level}
                        </p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DELETE BUTTON */}
            {projectInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* ADD PROJECT */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${projectDetailStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              name: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
    </div>
  );
};

// SkillsInfoForm Component
export const SkillsInfoForm = ({
  skillsInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  updateSection,
  setResumeData,
}) => {
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [categorizedSkills, setCategorizedSkills] = useState(null);

  //  Normalize function (outside API logic)
  const normalizeSkills = (data = {}) => {
    const result = {};

    ["frontend", "backend", "database", "tools"].forEach((key) => {
      const value = data?.[key];

      if (Array.isArray(value)) {
        result[key] = value;
      } else if (typeof value === "string" && value.trim() !== "") {
        result[key] = [value];
      } else {
        result[key] = [];
      }
    });

    return result;
  };

  //  AI Categorization
  const handleAutoCategorize = async () => {
    try {
      setLoadingIndex(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await axiosInstance.post(
        API_PATHS.AI.CATEGORIZE_SKILLS,
        {
          skills: skillsInfo.map((s) => s.name),
        },
      );

      const rawData = response?.data?.data || response?.data;

      if (!rawData) {
        console.error("Invalid AI response:", response);
        return;
      }

      const normalized = normalizeSkills(rawData);

      setCategorizedSkills(normalized);

      setResumeData((prev) => ({
        ...prev,
        techStack: rawData,
      }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingIndex(false);
    }
  };

  return (
    <div className={skillsInfoStyles.container}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={skillsInfoStyles.heading}>Tech Stack</h2>

        <button
          type="button"
          onClick={handleAutoCategorize}
          className="
        flex items-center gap-2
        px-5 py-2.5
        rounded-xl border
        text-[15px] font-medium
        text-purple-700 border-purple-500 bg-white
        hover:bg-purple-50 hover:text-black hover:border-purple-600
        transition-all duration-200"
        >
          {loadingIndex ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          Auto Categorize
        </button>
      </div>

      {/* SKILL INPUTS */}
      <div className="space-y-6 mb-6">
        {skillsInfo.map((skill, index) => (
          <div key={index} className={skillsInfoStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Skill Name"
                placeholder="JavaScript"
                value={skill.name || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "name", target.value)
                }
              />
            </div>

            {/* DELETE */}
            {skillsInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* ADD SKILL */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${skillsInfoStyles.addButton}`}
          onClick={() => addArrayItem({ name: "" })}
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>
    </div>
  );
};

// WorkExperienceForm Component
export const WorkExperienceForm = ({
  workExperience,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState({});

  const handleGenerateExperienceDescription = async (index, exp) => {
    console.log("FUNCTION CALLED", index, exp);
    try {
      setLoadingIndex(index);

      const prompt = `
Role: ${exp.role}
Company: ${exp.company}

Write 3 professional resume work experience descriptions.

Each must:
- Have 2-3 bullet points
- Each bullet starts with "• "
- Each bullet on a NEW LINE

IMPORTANT:
Return ONLY a valid JSON array.
DO NOT add explanation.
DO NOT add markdown.

Example format:
[
  {
    "level": "Beginner",
    "description": "• Did X\n• Did Y\n• Did Z"
  }
]
`;

      const response = await fetch("http://127.0.0.1:40000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("API RESPONSE:", data);
      let suggestions = data?.data || data;

      if (data?.candidates) {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        try {
          suggestions = JSON.parse(text);
        } catch (e) {
          console.error("Parse failed (candidates):", text);
          suggestions = [];
        }
      } else if (typeof suggestions === "string") {
        try {
          suggestions = JSON.parse(suggestions);
        } catch (e) {
          console.error("Parse failed (string):", suggestions);
          suggestions = [];
        }
      }

      if (Array.isArray(suggestions)) {
        const normalized = suggestions.map((item) => ({
          level: item.level || item.experience_level || "AI",
          description: item.description || item.summary || "",
        }));

        setAiSuggestions((prev) => ({
          ...prev,
          [index]: normalized,
        }));

        console.log("FINAL SUGGESTIONS:", normalized);
      } else {
        console.error("Invalid AI response:", data);
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  useEffect(() => {
    console.log("WORK EXPERIENCE UPDATED:", workExperience);
  }, [workExperience]);

  return (
    <div className={workExperienceStyles.container}>
      <h2 className={workExperienceStyles.heading}>Work Experience</h2>

      <div className="space-y-6 mb-6">
        {workExperience.map((experience, index) => (
          <div key={index} className={workExperienceStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company"
                placeholder="ABC Corp"
                value={experience.company || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "company", target.value)
                }
              />

              <Input
                label="Role"
                placeholder="Frontend Developer"
                value={experience.role || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "role", target.value)
                }
              />

              <Input
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
              />

              <Input
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
              />
            </div>

            <div className="mt-6 md:col-span-2 flex flex-col gap-3 w-full overflow-hidden">
              {/* LABEL + BUTTON */}
              <div className="flex justify-between items-center font-bold">
                <label>Description</label>

                <button
                  type="button"
                  onClick={() => {
                    console.log("BUTTON CLICKED");
                    handleGenerateExperienceDescription(index, experience);
                  }}
                  className="
        flex items-center gap-2
        px-5 py-2.5
        rounded-xl border
        text-[15px] font-medium
        text-purple-700 border-purple-500 bg-white
        hover:bg-purple-50 hover:text-black hover:border-purple-600
        transition-all duration-200"
                >
                  {loadingIndex === index ? (
                    <LoaderCircle className="animate-spin w-4 h-4" />
                  ) : (
                    <Brain className="w-4 h-4" />
                  )}
                  Generate from AI
                </button>
              </div>

              {/* TEXTAREA */}
              <textarea
                value={experience.description || ""}
                onChange={(e) => {
                  let value = e.target.value;

                  // only add bullet if empty
                  if (!value.startsWith("•") && value.length > 0) {
                    value = "• " + value;
                  }

                  updateArrayItem(index, "description", value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    const textarea = e.target;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    const value = experience.description || "";

                    const newValue =
                      value.substring(0, start) + "\n• " + value.substring(end);

                    updateArrayItem(index, "description", newValue);

                    // move cursor after bullet
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd =
                        start + 3;
                    }, 0);
                  }
                }}
                placeholder="Short description about your work experience"
                rows={5}
                className="
    w-full
    px-4 py-3
    text-sm
    rounded-2xl
    border-2 border-purple-400
    bg-white
    shadow-[0_0_0_4px_rgba(168,85,247,0.15)]
    focus:outline-none
    focus:border-purple-500
    focus:shadow-[0_0_0_4px_rgba(168,85,247,0.25)]
    transition
  "
              />

              {/* AI Suggestions */}
              {aiSuggestions[index]?.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-semibold">Suggestions</h3>

                  {aiSuggestions[index].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        const formatted = (item.description || "")
                          .replace(/,\s*•/g, "\n• ") // fix comma bullets
                          .replace(/•\s*/g, "\n• ") // ensure new line bullets
                          .replace(/^\n/, "") // remove first extra newline
                          .trim();

                        console.log("CLICKED DESC:", formatted); // debug

                        updateArrayItem(index, "description", formatted);
                      }}
                      className="p-3 border rounded-lg mt-2 cursor-pointer hover:bg-gray-100"
                    >
                      <p className="text-sm font-bold text-purple-600">
                        {item.level || item.experience_level}
                      </p>
                      <p className="text-sm">
                        {item.description || item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {workExperience.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${workExperienceStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <Plus size={16} />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};
