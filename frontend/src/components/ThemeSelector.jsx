import React, { useState } from "react";
import { resumeTemplates } from "../utils/data";
import Tabs from "./Tabs";

const TAB_DATA = [{ label: "Templates" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
}) => {
  // Find initial template
  const initialIndex = Math.max(
    0,
    resumeTemplates.findIndex((t) => t.id === selectedTheme)
  );

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme || resumeTemplates[0]?.id || "",
    index: initialIndex >= 0 ? initialIndex : 0,
  });

  const [tabValue, setTabValue] = useState("Templates");

  return (
    <div className="max-w-3xl mx-auto px-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        <span className="text-sm text-gray-500">
          Select a template ✨
        </span>
      </div>

      {/* Template List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-sm">

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Templates
        </h2>

        {resumeTemplates.map((template, index) => {
          const isActive = selectedTemplate.index === index;

          return (
            <div
              key={template.id}
              onClick={() => {
                setSelectedTemplate({
                  theme: template.id,
                  index: index,
                });

                setSelectedTheme(template.id); // instant apply
              }}
              className={`
                cursor-pointer rounded-xl p-4 transition-all duration-300 group
                ${
                  isActive
                    ? "bg-blue-50 border border-blue-400 shadow-sm"
                    : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                }
              `}
            >

              {/* Title + Check */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {template.name}
                </h3>

                {isActive && (
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                    ✓
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-1">
                {template.description || "Clean and professional resume layout"}
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;