import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImage = async (req, res) => {
  try {
    // Handle multer errors
    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'profileImage', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload failed', error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ 
        _id: resumeId, 
        userId: req.user.id 
      });

      if (!resume) {
        return res.status(404).json({ message: 'Resume not found or not authorized' });
      }

      // Get uploads folder path
      const uploadsFolder = path.join(process.cwd(), 'uploads');
      const baseURL = `${req.protocol}://${req.get('host')}`;

      // Handle thumbnail upload
      const newThumbnail = req.files?.thumbnail?.[0];
      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) {
            fs.unlinkSync(oldThumbnail);
          }
        }
        resume.thumbnailLink = `${baseURL}/uploads/${newThumbnail.filename}`;
      }

      // Handle profile image upload
      const newProfileImage = req.files?.profileImage?.[0];
      if (newProfileImage) {
        if (resume.profileInfo?.profilePreviewURL) {
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewURL));
          if (fs.existsSync(oldProfile)) {
            fs.unlinkSync(oldProfile);
          }
        }
        resume.profileInfo.profilePreviewURL = `${baseURL}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: 'Images uploaded successfully',
        thumbnailLink: resume.thumbnailLink,
        profilePreviewURL: resume.profileInfo.profilePreviewURL
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
