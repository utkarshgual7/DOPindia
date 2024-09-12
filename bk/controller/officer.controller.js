import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Officer from '../model/officer.model.js';

// Register a new officer
export const registerOfficer = async (req, res) => {
  const { officerId, password,officeName,officerName } = req.body;

  try {
    // Check if officer already exists by officerId
    const officerExists = await Officer.findOne({ officerId });

    if (officerExists) {
      return res.status(400).json({ message: 'Officer already exists' });
    }

    // Hash the password before saving
    
    // Create new officer with officerId and hashed password
    const officer = new Officer({ officerId, password,officeName,officerName });
    await officer.save();

    // Generate JWT token
    const token = jwt.sign({ id: officer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, officerId });
  } catch (error) {
    res.status(500).json({ message: 'Server error',error: error.message });
  }
};

// Login an officer
export const loginofficer = async (req, res) => {
  const { officerId, password } = req.body;

  try {
    // Find officer by officerId
    const officer = await Officer.findOne({ officerId });

    // Check if officer exists and if the password matches
    if (!officer || password !== officer.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: officer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      officerId: officer.officerId,
      officerName: officer.officerName, // Ensure these properties exist in your model
      officeName: officer.officeName // Ensure these properties exist in your model
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};