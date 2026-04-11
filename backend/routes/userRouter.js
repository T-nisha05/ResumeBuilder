import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route - requires JWT token
router.get('/profile', protect, getUserProfile);

export default router;
