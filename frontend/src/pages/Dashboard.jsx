import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { dashboardStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import { LucideFilePlus, LucideTrash2 } from "lucide-react";
import { useEffect } from "react";
import { ResumeSummaryCard } from "../components/Cards";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { X } from "lucide-react";
import Modal from "../components/Modal";
import { CreateResumeForm } from "../components/CreateResumeForm";
import { API_PATHS } from "../utils/apiPaths";


const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);

  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
resume.education?.forEach((edu) => {
  totalFields += 5;

  if (edu.type) completedFields++;
  if (edu.degree) completedFields++;
  if (edu.institution) completedFields++;
  if (edu.endDate) completedFields++; // year
  if (edu.score) completedFields++;   // CGPA / Percentage
});

    // Skills
    resume.skills?.forEach((skill) => {
  totalFields += 1;
  if (skill.name) completedFields++;
});

    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.name) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

   // Achievements
resume.achievements?.forEach((ach) => {
  totalFields += 1;
  if (ach.title) completedFields++;
});

    return Math.round((completedFields / totalFields) * 100);
  };

  // This will fetch all resumes and calculate completion %

  const fetchAllResumes = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);

      // Add completion percentage to each resume
      const resumesWithCompletion = response.data.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));

      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;

    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success("Resume delete successfully");
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setResumeToDelete(null);
      setshowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setshowDeleteConfirm(true);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resumes</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `You have ${allResumes.length} resume${allResumes.length !== 1 ? "s" : ""}`
                : "Start building your professional resume"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModal(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus
                  className="group hover:translate-x-1 transition-transform"
                  size={18}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Empty State*/}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className="text-violet-600" />
            </div>

            <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet. Start building your
              professional resume to land your dream job.
            </p>

            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModal(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus
                  className="group hover:translate-x-1 transition-transform"
                  size={20}
                />
              </span>
            </button>
          </div>
        )}

        {/* Grid View */}
{!loading && allResumes.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Create New Resume Card */}
    <div
      className={styles.newResumeCard}
      onClick={() => setOpenCreateModal(true)}
    >
      <div className={styles.newResumeIcon}>
        <LucideFilePlus size={32} className="text-white" />
      </div>
      <h3 className={styles.newResumeTitle}>Create New Resume</h3>
      <p className={styles.newResumeText}>
        Start building your career
      </p>
    </div>

    {/* Resume Cards */}
    {allResumes.map((resume) => (
      <ResumeSummaryCard
        key={resume._id}
        imageUrl={resume.thumbnailLink}
        title={resume.title}
        createdAt={resume.createdAt}
        updatedAt={resume.updatedAt}
        onSelect={() => navigate(`/resume/${resume._id}`)}
        onDelete={() => handleDeleteClick(resume._id)}
        completion={resume.completion || 0}
        isPremium={resume.isPremium}
        isNew={dayjs().diff(dayjs(resume.createdAt), "day") < 7}
      />
    ))}

  </div>
)}
    </div>

      {/* CREATE MODAL */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        maxWidth="max-w-2xl"
      >
        <div className="p-6">
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New Resume</h3>

            <button
              onClick={() => setOpenCreateModal(false)}
              className={styles.modalCloseButton}>
              X
            </button>
          </div>

          <CreateResumeForm
            onSuccess={() => {
              setOpenCreateModal(false);
              fetchAllResumes();
            }}
          />
        </div>
      </Modal>

        {/* Delete Modal */}
        <Modal isOpen={showDeleteConfirm} 
        onClose={() => setshowDeleteConfirm(false)} 
        title='Confirm Deletion'
        showActionBtn={true}
        actionBtnText='Delete' 
        actionBtnClassName = 'bg-red-600 hover:bg-red-700'
        onActionClick={handleDeleteResume}
        >

          <div className="p-4">
              <div className="flex flex-col items-center text-center">
                 <div className={styles.deleteIconWrapper} >
                    <LucideTrash2 className="text-orange-600" size={24} />
                 </div>

                 <h3 className={styles.deleteTitle}>
                     Delete Resume?
                 </h3>
                 <p className={styles.deleteText}>
                  Are you sure you want to delete this resume? This action cannot be undone.  
                 </p>
              </div>
          </div>
        </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
