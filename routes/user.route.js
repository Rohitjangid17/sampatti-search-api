import express from 'express';
import { signup, signin, forgotPassword, updateSettings, getUserById, getUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.put('/settings/:id', updateSettings);
router.get('/:id', getUserById);
router.get('/', getUsers);

export default router;
