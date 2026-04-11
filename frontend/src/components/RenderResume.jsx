import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CompactTemplate from "./templates/CompactTemplate";

const RenderResume = ({ templateId, resumeData, containerWidth }) => {

  const accentColor = "#7c3aed";
  switch (templateId) {
  case "classic":
  return <ClassicTemplate data={resumeData} accentColor={accentColor} />;

case "modern":
  return <ModernTemplate data={resumeData} accentColor={accentColor} />;

case "minimal":
  return <MinimalTemplate data={resumeData} accentColor={accentColor} />;

  case "compact":
  return <CompactTemplate data={resumeData} accentColor={accentColor} />;

default:
    return <ClassicTemplate data={resumeData} accentColor={accentColor} />;
  }
};
export default RenderResume;