import Resume from '../models/resumeModel.js';

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

      // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                leetcode: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],

           achievements: [{
                  title: '',
           },
         ],
            
        };
    
    const newResume = await Resume.create({
      userId: req.user.id,
      title,
      ...defaultResumeData
    });
    
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create resume', error: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ updatedAt: -1 });
    
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resumes', error: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get resume', error: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }
    
    // Merge updated data
    Object.assign(resume, req.body);
    const savedResume = await resume.save();
    
    res.json(savedResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }
    
    // Delete thumbnail image if exists
    if (resume.thumbnailLink) {
      const fs = await import('fs');
      const path = await import('path');
      const uploadsFolder = path.join(process.cwd(), 'uploads');
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }
    
    // Delete profile preview image if exists
    if (resume.profileInfo?.profilePreviewURL) {
      const fs = await import('fs');
      const path = await import('path');
      const uploadsFolder = path.join(process.cwd(), 'uploads');
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewURL));
      
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }
    
    await resume.deleteOne();
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
};
