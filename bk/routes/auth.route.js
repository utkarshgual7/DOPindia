import express from 'express';
import { checkUserId, registerUser, sendOtp, verifyOtp } from '../controller/user.controller.js';


const authRoutes = express.Router();

// Standard login and signup routes
authRoutes.post('/signup', registerUser);
authRoutes.get('/check-availability', checkUserId);
authRoutes.post('/send-otp', sendOtp);
 authRoutes.post('/verify-otp', verifyOtp);
// authRoutes.post('/forgot-password', forgotPassword);
// authRoutes.post('/reset-password', resetPassword);



export default authRoutes;
