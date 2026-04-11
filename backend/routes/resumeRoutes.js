import express from 'express';
import { 
  createResume, 
  getUserResumes, 
  getResumeById, 
  updateResume, 
  deleteResume 
} from '../controllers/resumeController.js';
import { uploadResumeImage } from '../controllers/uploadImages.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Resume CRUD operations
router.post('/', createResume);
router.get('/', getUserResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

// Image upload route
router.post('/upload/:id', 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
  ]),
  uploadResumeImage
);

export default router;
