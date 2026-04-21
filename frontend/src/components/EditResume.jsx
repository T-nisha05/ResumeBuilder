import React, { useRef, useState, useEffect, useCallback } from "react";
import DashboardLayout from "./DashboardLayout";
import { buttonStyles, containerStyles as styles } from "../assets/dummystyle";
import { TitleInput } from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import RenderResume from "../components/RenderResume";
import Modal from "../components/Modal";
import ThemeSelector from "../components/ThemeSelector";
import { transformResumeData } from "../utils/transformResumeData";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Download,
  Loader2,
  Palette,
  Save,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { fixTailwindColors } from "../utils/colors";
import html2canvas from "html2canvas";
import { StepProgress } from "../components/StepProgress";
import {
  ContactInfoForm,
  ProfileInfoForm,
  WorkExperienceForm,
  EducationDetailsForm,
  SkillsInfoForm,
  ProjectDetailForm,
  CertificationInfoForm,
  AdditionalInfoForm,
} from "../components/Forms";

/* Custom Hook (same file, NO export here) */
const useResizeObserver = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const observerRef = useRef(null);

  const ref = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });

      observerRef.current.observe(node);
    }
  }, []);

  return { ...size, ref };
};

const sanitizeResumeData = (data) => ({
  title: data?.title || "Untitled",

  profileInfo: {
    fullName: data?.profileInfo?.fullName || "",
    designation: data?.profileInfo?.designation || "",
    summary: data?.profileInfo?.summary || "",
  },

  contactInfo: {
    email: data?.contactInfo?.email || "",
    phone: data?.contactInfo?.phone || "",
  },

  workExperience: (data?.workExperience || []).map((exp) => ({
    company: exp?.company || "",
    role: exp?.role || "",
    startDate: exp?.startDate || "",
    endDate: exp?.endDate || "",
    description: exp?.description || "",
  })),

  education: (data?.education || []).map((edu) => ({
  type: edu?.type || "",
  degree: edu?.degree || "",
  institution: edu?.institution || "",
  endDate: edu?.endDate || "",   
  score: edu?.score || "",       
})),

skills: (data?.skills || []).map((skill) => ({
  name: skill?.name || "",
})),

  projects: (data?.projects || []).map((proj) => ({
    name: proj?.name || "",
    description: proj?.description || "",
  })),

  certifications: (data?.certifications || []).map((cert) => ({
    title: cert?.title || "",
    issuer: cert?.issuer || "",
  })),

  achievements:
  data?.achievements?.length > 0
    ? data.achievements.map((a) => ({
        title: a?.title || "",
      }))
    : [
        {
          title: "",
          description: "",
          year: "",
        },
      ],

 

  template: data?.template || {},
});

/* Main Component */
const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const resumeDownloadRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    fullName: "",
    designation: "",
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();

  const [resumeData, setResumeData] = useState({
    title: "Professional Resume",
    profileInfo: {
      fullName: "",
      designation: "",
      summary: "",
    },
    contactInfo: {
      email: "",
      phone: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [
  {
    title: ""
  },
],
    
  }
);



  /* Completion calculation */
  const calculateCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;

    totalFields += 3;
    if (resumeData.profileInfo.fullName) completedFields++;
    if (resumeData.profileInfo.designation) completedFields++;
    if (resumeData.profileInfo.summary) completedFields++;

    totalFields += 2;
    if (resumeData.contactInfo.email) completedFields++;
    if (resumeData.contactInfo.phone) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  };

  useEffect(() => {
    calculateCompletion();
  }, [resumeData]);

  // Validate Inputs
  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;

        let newErrors = {};

        if (!fullName.trim()) {
          newErrors.fullName = "Full Name is required";
        }

        if (!designation.trim()) {
          newErrors.designation = "Designation is required";
        }

        setErrors((prev) => ({
          ...prev,
          ...newErrors,
        }));

        if (Object.keys(newErrors).length > 0) return;

        break;
      }

      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;

        let newErrors = {};

        if (!email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
          newErrors.email = "Enter a valid email";
        }

        if (!phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(phone)) {
          newErrors.phone = "Enter valid 10-digit number";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        break;
      }

      case "work-experience":
        // Only validate if user has entered something
        if (resumeData.workExperience.length > 0) {
          resumeData.workExperience.forEach(
            ({ company, role, startDate, endDate }, index) => {
              // check if ALL fields are empty → skip validation
              if (!company && !role && !startDate && !endDate) return;  
            },
          );
        }
        break;

      case "education-info": {
        let newErrors = {};

        if (resumeData.education.length > 0) {
          resumeData.education.forEach(
            ({ degree, institution, startDate, endDate }, index) => {
              // skip if completely empty
              if (!degree && !institution && !startDate && !endDate) return;

              if (!degree.trim()) {
                newErrors[`degree_${index}`] = "Degree is required";
              }

              if (!institution.trim()) {
                newErrors[`institution_${index}`] = "Institution is required";
              }
            },
          );
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
          return;
        }

        break;
      }

      case "skills":
        break;

      case "projects":
        if (resumeData.projects.length > 0) {
          resumeData.projects.forEach(
            ({ title, description, github, liveDemo }, index) => {
              // if ALL fields empty → skip
              if (!title && !description && !github && !liveDemo) return;
            },
          );
        }
        break;

      case "certifications":
        break;

      case "additionalInfo":
        break;
    }

    if (currentPage !== "contact-info" && errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  };

  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "education-info",
      "work-experience",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //TAKE BACK TO PREVIOUS FORM STATE  OR TAKE BACK TO FIRST OR TO /DASHBOARD
  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "education-info",
      "work-experience",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
            errors={errors}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
            errors={errors}
          />
        );

         case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
            errors={errors}
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
            updateSection={updateSection}  
            setResumeData={setResumeData} 
          />
        );

      case "projects":
        return (
          <ProjectDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("certifications", index)
            }
          />
        );

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            achievements={resumeData.achievements}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  };

  // UPDATE THE SECTION STATE
  const updateSection = (section, key, value) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]:
        typeof value === "string"
          ? value
          : value ?? null,
    },
  }));

  // Clear error safely
  if (typeof value === "string" && value.trim() !== "") {
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  }
};

  // UPDATE ARRAY ITEMS USING STATE
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }  

      return {
        ...prev,
        [section]: updatedArray,
      };
    });

    // CLEAR ERROR WHEN USER TYPES
    if (
  typeof value === "string" &&
  value.trim() !== ""
) {
  setErrors((prev) => ({
    ...prev,
    [`${key}_${index}`]: "",
  }));
}
  };

  // ADDING NEW ITEMS IN INFO
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // REMOVING THE INFO USING INDEX
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // FETCHING THE RESUME DETAILS USING BACKEND URL
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.Get_By_Id(resumeId),
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData(sanitizeResumeData(response.data));
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast.error("Failed to load resume data");
    }
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      const thumbnailElement = thumbnailRef.current;
      if (!thumbnailElement) {
        throw new Error("Thumbnail element not found");
      }

      const fixedThumbnail = fixTailwindColors(thumbnailElement);

      const thumbnailCanvas = await html2canvas(fixedThumbnail, {
        scale: 0.5,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      document.body.removeChild(fixedThumbnail);

      const thumbnailDataUrl = thumbnailCanvas.toDataURL("image/png");
      const thumbnailFile = dataURLtoFile(
        thumbnailDataUrl,
        `thumbnail-${resumeId}.png`,
      );

      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const { thumbnailLink } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink);

      toast.success("Resume Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Uploading Images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink) => {
    try {
      setIsLoading(true);

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        completion: completionPercentage,
      });
    } catch (err) {
      console.error("Error updating resume:", err);
      toast.error("Failed to update resume details");
    } finally {
      setIsLoading(false);
    }
  };

  // DOWNLOAD IMAGE
const downloadImage = async () => {
  const element = resumeDownloadRef.current;
  if (!element) return;

  try {
    setIsDownloading(true);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      onclone: (clonedDoc) => {
        const all = clonedDoc.querySelectorAll("*");

        all.forEach((el) => {
          const style = clonedDoc.defaultView.getComputedStyle(el);

          // FIX unsupported oklch colors
          if (style.color.includes("oklch")) {
            el.style.color = "#000000";
          }

          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }

          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "#000000";
          }
        });
      },
    });

    const link = document.createElement("a");
    link.download = "resume.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

  } catch (err) {
    console.error("Image download error:", err);
  } finally {
    setIsDownloading(false);
  }
};

  // const downloadPDF = async () => {
  //   const element = resumeDownloadRef.current;
  //   await document.fonts.ready;
  //   if (!element) {
  //     toast.error("Failed to generate PDF. Please try again.");
  //     return;
  //   }

  //   setIsDownloading(true);
  //   setDownloadSuccess(false);
  //   const toastId = toast.loading("Generating PDF");

  //   const override = document.createElement("style");
  //   override.id = "__pdf_color_override__";
  //   override.textContent = `
  //     * {
  //       color: #000 !important;
  //       background-color: #fff !important;
  //       border-color: #000 !important;
  //     }
  //   `;
  //   document.head.appendChild(override);

  //   try {
  //    await html2pdf()
  // .set({
  //   margin: [0, 0, 0, 0], // ✅ use array format

  //   filename: "resume.pdf",

  //   image: { type: "jpeg", quality: 1 },

  //   html2canvas: {
  //     scale: 2,  // ⚠️ reduce from 3 → 2 (3 causes cropping issues)
  //     useCORS: true,
  //     backgroundColor: "#ffffff",

  //     scrollX: 0,
  //     scrollY: 0,

  //     windowWidth: 794,
  //     windowHeight: 1123, // ✅ ADD THIS
  //   },

  //   jsPDF: {
  //     unit: "px",
  //     format: [794, 1123],
  //     orientation: "portrait",
  //   },
  // })
  // .from(element)
  // .toPdf()
  // .get("pdf")
  // .then((pdf) => {
  //   pdf.setPage(1);
  // })
  // .save();

  //     toast.success("PDF downloaded successfully!", { id: toastId });
  //     setDownloadSuccess(true);
  //     setTimeout(() => setDownloadSuccess(false), 3000);
  //   } catch (err) {
  //     console.error("PDF error:", err);
  //     toast.error(`Failed to generate PDF: ${err.message}`, { id: toastId });
  //   } finally {
  //     document.getElementById("__pdf_color_override__")?.remove();
  //     setIsDownloading(false);
  //   }
  // };

  const updateTheme = (theme) => {
    setResumeData((prev) => ({
      ...prev,
      template: {
        theme: theme,
        colorPalette: [],
      },
    }));
  };

  useEffect(() => {
    if (resumeId) {
      fetchResumeDetailsById();
    }
  }, [resumeId]);

  const mappedData = transformResumeData(resumeData);
  console.log("MAPPED DATA:", mappedData);

  //DELETE FUNCTION - TO DELETE ANY RESUME
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.main}>
        <div className={`${styles.header} flex items-center justify-between`}>
          {/* LEFT: Title (FIXED WIDTH CONTROL) */}
          <div className="flex-1 max-w-[70%]">
            <TitleInput
              title={resumeData.title}
              setTitle={(value) =>
                setResumeData((prev) => ({
                  ...prev,
                  title: value,
                }))
              }
            />
          </div>


          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setOpenThemeSelector(true)}
              className={buttonStyles.theme}
            >
              <Palette size={16} />
              <span className="text-sm">Theme</span>
            </button>

            <button
              onClick={handleDeleteResume}
              className={buttonStyles.delete}
              disabled={isLoading}
            >
              <Trash2 size={16} />
              <span className="text-sm">Delete</span>
            </button>

            <button
              onClick={() => setOpenPreviewModal(true)}
              className={buttonStyles.download}
            >
              <Download size={16} />
              <span className="text-sm">Preview</span>
            </button>
          </div>
        </div>
        {/* STEP PROGRESS */}
        <div className={styles.grid}>
          <div className={styles.formContainer}>
            <StepProgress progress={progress} />

            {renderForm()}

            <div className="p-4 sm:p-6">
              {errorMsg && (
                <div className={styles.error}>
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              {/* BACK BUTTON */}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  className={buttonStyles.back}
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                {/* SAVE BUTTON */}
                <button
                  className={buttonStyles.save}
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isLoading ? "Saving..." : "Save & Exit"}
                </button>

                {/* NEXT BUTTON */}
                <button
                  className={buttonStyles.next}
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && <Download size={16} />}

                  {currentPage === "additionalInfo"
                    ? "Preview & Download"
                    : "Next"}

                  {currentPage === "additionalInfo" && (
                    <ArrowLeft size={16} className="rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className={styles.previewContainer}>
              <div className="text-center mb-4">
                <div className={styles.completionBadge}>
                  <div className={styles.pulseDot}></div>
                </div>
              </div>

              <div
                className="preview-container relative"
                ref={previewContainerRef}
              >
              <div className={`${styles.previewInner} overflow-visible`}>
                  <RenderResume
                    key={`preview-${resumeData?.template?.theme}`}
                    templateId={resumeData?.template?.theme || ""}
                    resumeData={mappedData}
                    containerWidth={previewWidth}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DATA HERE */}
        <Modal
          isOpen={openThemeSelector}
          onClose={() => setOpenThemeSelector(false)}
          title="Change Theme"
        >
          <div className={styles.modalContent}>
            <ThemeSelector
              selectedTheme={resumeData?.template?.theme}
              setSelectedTheme={updateTheme}
              onClose={() => setOpenThemeSelector(false)}
            />
          </div>
        </Modal>

        {/* PREVIEW MODAL */}
        <Modal
  isOpen={openPreviewModal}
  onClose={() => setOpenPreviewModal(false)}
  title={resumeData.title}
  
  showActionBtn   // ✅ ADD THIS LINE

  actionBtnText={
    isDownloading
      ? "Generating..."
      : downloadSuccess
        ? "Downloaded!"
        : "Download Image"
  }

  actionBtnIcon={
    isDownloading ? (
      <Loader2 size={16} className="animate-spin" />
    ) : downloadSuccess ? (
      <Check size={16} className="text-white" />
    ) : (
      <Download size={16} />
    )
  }

  onActionClick={downloadImage}
>

          <div className={styles.modalContent}>
            {/* Completion Badge */}
            <div className="relative">
              <div className="text-center mb-4">
                <div className={styles.modalBadge}>
                  <div className={styles.pulseDot}></div>
                  <span>Completion: {completionPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Resume Preview */}
            <div className={`${styles.pdfPreview} overflow-auto`}>
              <div ref={resumeDownloadRef}>
  <div
       style={{
      width: "794px",
      minHeight: "1123px",
      margin: "0 auto",
      background: "#fff",
      padding: "0px",   // ⚠️ IMPORTANT: remove padding here
      boxSizing: "border-box",
      overflow: "hidden", // ✅ prevents bleed issues
    }}
  >
                  <RenderResume
                    key={`pdf-${resumeData?.template?.theme}`}
                    templateId={resumeData?.template?.theme || ""}
                    resumeData={mappedData}
                    containerWidth={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* NOW THUMBNAIL ERROR FIX */}
        <div style={{ display: "none" }} ref={thumbnailRef}>
          <div className={styles.hiddenThumbnail}>
            <RenderResume
              key={`thumb-${resumeData?.template?.theme}`}
              templateId={resumeData?.template?.theme || ""}
              resumeData={mappedData}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
