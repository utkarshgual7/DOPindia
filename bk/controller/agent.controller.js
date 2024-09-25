// controllers/agentController.js
import jwt from 'jsonwebtoken';

import Agent from "../model/agent.model.js";
import { uuid } from 'uuidv4';
import Parcel from "../model/parcel.model.js";
import { MarkDelivery } from '../helpers/MarkDelivery.js';
import { sendMail } from '../helpers/sendMail.js';


const generateAgentId = () => {
  return Math.floor(10000000 + Math.random() * 90000000); // Generates a random 8-digit number
};

// Register Agent Controller
export async function registerAgent(req, res) {
    try {
        const { name, phone, address, email, servicePincode,password } = req.body;
    
        // Check if email already exists
        let agent = await Agent.findOne({ email });
        if (agent) {
          return res.status(400).json({ message: 'Agent with this email already exists' });
        }
    
        // Generate a unique agent ID using uuid
        const agentId = `${generateAgentId()}`;
    
        // Create a new agent
        agent = new Agent({
          name,
          phone,
          address,
          email,
          servicePincode,
          password,
          agentId, // Assign generated agentId
        });
    
        await agent.save();
    
        res.status(201).json({
          message: 'Agent registered successfully',
          agent: {
            name: agent.name,
            phone: agent.phone,
            address: agent.address,
            servicePincode: agent.servicePincode,
            agentId: agent.agentId,
          },
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    };


    export const getAgents = async (req, res) => {
      try {
        const Agents = await Agent.find();
        res.status(200).json(Agents);
      } catch (error) {
        console.error('Error fetching Agents:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
      }
    };


import parcelAssign from "../model/parcelAssign.model.js";
import DeliveryOtp from '../model/deliveryOtp.model.js';
import { senderParcelUpdate } from '../helpers/senderParcelUpdate.js';
import { recParcelUpdate } from '../helpers/recParcelUpdate.js';

// Assign parcels to a delivery agent
// Assign parcels to a delivery agent
export const assignParcelsToAgent = async (req, res) => {
  const { trackingIds, agentId, status } = req.body;

  if (!Array.isArray(trackingIds) || trackingIds.length === 0 || !agentId) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    // Check for parcels already assigned to the same agent
    const alreadyAssignedParcels = await parcelAssign.find({
      TrackingId: { $in: trackingIds },
      agentId: agentId
    });

    if (alreadyAssignedParcels.length > 0) {
      // Extract tracking IDs of already assigned parcels
      const assignedTrackingIds = alreadyAssignedParcels.map(parcel => parcel.TrackingId);
      return res.status(200).json({
        message: "Some parcels are already assigned to the selected agent",
        alreadyAssigned: assignedTrackingIds
      });
    }

    // Check if the parcel is assigned to another agent and update agentId if different
    const updatedParcels = await parcelAssign.updateMany(
      { TrackingId: { $in: trackingIds }, agentId: { $ne: agentId } }, // Find parcels assigned to a different agent
      { $set: { agentId, status: "Assigned" } } // Update agentId and status
    );

    // Assign new parcels to the selected agent
    const unassignedParcels = trackingIds.filter(trackingId => 
      !alreadyAssignedParcels.some(parcel => parcel.TrackingId === trackingId)
    );

    if (unassignedParcels.length > 0) {
      const assignments = unassignedParcels.map(trackingId => ({
        TrackingId: trackingId,
        agentId,
        status: status || "Assigned"
      }));

      await parcelAssign.insertMany(assignments); // Insert assignments for new parcels
    }

    res.status(200).json({ message: "Parcels assigned/updated successfully" });
  } catch (error) {
    console.error("Error assigning parcels", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





export const agentLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find the agent by email
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: agent._id, email: agent.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Token expiration time
    );

    // Send the response with the token and agent data
    return res.json({
      token,
      agentId: agent.agentId,
      email: agent.email,
      name: agent.name,
      servicePincode: agent.servicePincode,
      profilePicture: agent.profilePicture, // Include any additional agent data you need
      // Include any additional agent data you need
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getParcelAssignStatus = async (req, res) => {
  const { TrackingId } = req.params;

  try {
    const parcelAssignment = await parcelAssign.findOne({ TrackingId });

    if (!parcelAssignment) {
      return res.status(404).json({ message: 'Parcel not found',status: 'Not Assigned' });
    }

    res.status(200).json({ status: parcelAssignment.status });
  } catch (error) {
    console.error('Error fetching parcel status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAssignedParcelsByAgentId = async (req, res) => {
  const { agentId } = req.params;

  try {
    const parcels = await parcelAssign.find({ agentId: agentId });

    if (!parcels.length) {
      return res.status(404).json({ message: 'No parcels assigned to this agent.' });
    }

    res.status(200).json(parcels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const sendOtpToCustomer = async (req, res) => {
  const { trackingId } = req.body;

  try {
    const parcel = await parcelAssign.findOne({ TrackingId:trackingId });
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found." });
    }
    const parcelemail= await Parcel.findOne({trackingId})
    if (!parcelemail) {
      return res.status(404).json({ message: "Parcel email not found." });
    }
    const email = parcelemail.recipientEmail;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    parcel.otp = otp; // Save OTP in the parcel document
    await sendMail(email, 'Share Delivery Code', "", MarkDelivery(otp));

    const deliveryotp = new DeliveryOtp({
    trackingId,
      otp,
      recipientEmail:email
    });
    await deliveryotp.save(); // Save the updated parcel with OTP
    return res.status(200).json({ message: "OTP sent to customer." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


// Verify OTP and mark as delivered
export const verifyOtpAndMarkDelivered = async (req, res) => {
  const { trackingId, otp } = req.body;

  try {
    const deliveryotp = await DeliveryOtp.findOne({ trackingId });
    if (!deliveryotp) {
      return res.status(404).json({ message:"Delivery OTP not found." });
    }

    // Verify OTP
    if (deliveryotp.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

const parcelst= await parcelAssign.findOne({TrackingId: trackingId})
if (!parcelst) {
  return res.status(404).json({ message: "Parcel not found." });
}
const final= await Parcel.findOne({trackingId})
if (!final) {
  return res.status(404).json({ message: "Parcel not found." });
}
const recipientEmail = final.recipientEmail
const senderEmail = final.senderEmail
const recipientName = final.recipientName
const senderName = final.senderName
const status = "Delivered"

    // Mark the parcel as delivered
    parcelst.status = "Delivered";
    deliveryotp.otp = null; // Clear OTP after verification
    final.status="Delivered";
    await parcelst.save();
    await deliveryotp.save();
    await final.save();
    sendMail(senderEmail, "Parcel Status Update", "", senderParcelUpdate(senderName, trackingId, status));
    sendMail(recipientEmail, "Parcel Status Update", "", recParcelUpdate(recipientName, trackingId, status));
    return res.status(200).json({ message: "Parcel marked as delivered." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};