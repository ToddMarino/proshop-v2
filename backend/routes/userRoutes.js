import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

// Public Routes
router.post('/login', authUser);
router.post('/', registerUser);

// Private Routes
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

// Admin Routes
router.get('/', getUsers);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

export default router;
