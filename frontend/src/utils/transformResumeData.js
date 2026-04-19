export const transformResumeData = (resumeData) => {
  if (!resumeData) return {};

  console.log(resumeData);

  return {
    //  PERSONAL INFO
    personal_info: {
      full_name: resumeData.profileInfo?.fullName || "",
      designation: resumeData?.profileInfo?.designation || "",
      email: resumeData.contactInfo?.email || "",
      phone: resumeData.contactInfo?.phone || "",
      leetcode: resumeData.contactInfo?.leetcode || "",
      linkedin: resumeData.contactInfo?.linkedin || "",
      github: resumeData.contactInfo?.github || "",
      website: resumeData.contactInfo?.website || "",
    },

    //  SUMMARY
    professional_summary: resumeData.profileInfo.summary,

    //  EXPERIENCE
    experience: (resumeData.workExperience || []).map((exp) => ({
      position: exp.role || "",
      company: exp.company || "",
      location: exp.location || "",
      start_date: exp.startDate || "",
      end_date: exp.endDate || "",
      is_current: !exp.endDate,
      description: exp.description || "",
    })),

    //  PROJECTS
    project: (resumeData.projects || []).map((proj) => ({
      name: proj.name || "",
      description: proj.description || "",
      technologies: proj.technologies || [],
      github: proj.github || "",
      liveDemo: proj.liveDemo || "",
    })),

    // EDUCATION
    education: (resumeData.education || []).map((edu) => ({
      type: edu.type || "",
      degree: edu.degree || "",
      institution: edu.institution || "",
      year: edu.endDate || "",
      score: edu.score || "",
    })),

    //  SKILLS
    skills: (resumeData.skills || [])
      .map((skill) => (typeof skill === "object" ? skill.name : skill))
      .filter(Boolean),

    //  CERTIFICATIONS
    certifications: (resumeData.certifications || []).map((cert) => ({
      title: cert.title || "",
      year: cert.year || "",
      issuer: cert.issuer || "",
    })),

    // ACHIEVEMENTS
    achievements: resumeData.achievements || [],

    // SKILLS
    techStack: resumeData.techStack || {
      frontend: [],
      backend: [],
      database: [],
    },
  };
};
