import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';
import { otpMail } from '../helpers/otpService.js';
import { sendMail } from '../helpers/sendMail.js';

export const registerUser = async (req, res) => {
  const { userId, title, firstName, lastName, email, mobile} = req.body;

  // Ensure terms are accepted
  

  try {
    // Check if the user ID or email already exists
    const existingUser = await User.findOne({ $or: [{ userId }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User ID or email already exists' });
    }
  

    // Create a new user
    const newUser = new User({
      userId,
      title,
      firstName,
      lastName,
      email,
      mobile,
     
  
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const checkUserId = async (req, res) => {
  const { userId } = req.query;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Query the database to check if the user ID exists
    const userExists = await User.findOne({ userId });

    // Respond based on whether the user exists
    if (userExists) {
      return res.status(200).json({ available: false, message: 'User ID is not available' });
    } else {
      return res.status(200).json({ available: true, message: 'User ID is available' });
    }
  } catch (error) {
    // Log error and return internal server error
    console.error('Error checking user ID availability:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Simple 6-digit OTP

  try {
    // Find the user and update the OTP
    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpiry: Date.now() + 15 * 60 * 1000 }, // OTP expiry time: 15 minutes
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send OTP via email using your sendMail function
    await sendMail(email, 'Your OTP Code', "", otpMail(otp));

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid; clear OTP and expiry
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Optionally, generate a JWT or log in the user
    return res.status(200).json({ message: 'OTP verified successfully', 
      id: user.userId,
      email: user.email,
      firstName: user.firstName, // Include any other user data you need
      lastName: user.lastName,
      profilePicture:user.profilePicture // Include any other user data you need
    }, );

  } catch (error) {
    console.error('Error verifying OTP:', error);

   return res.status(500).json({ message: 'Error verifying OTP' });
  }
};


