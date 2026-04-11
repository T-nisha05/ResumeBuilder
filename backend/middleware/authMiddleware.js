import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (token && token.startsWith('Bearer')) {
      try {
        // Split Bearer token
        token = token.split(' ')[1];
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');
        
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token failed', error: error.message });
      }
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token failed', error: error.message });
  }
};
