// controllers/agentController.js

import Agent from "../model/agent.model.js";
import { uuid } from 'uuidv4';
import Parcel from "../model/parcel.model.js";

const generateAgentId = () => {
  return Math.floor(10000000 + Math.random() * 90000000); // Generates a random 8-digit number
};

// Register Agent Controller
export async function registerAgent(req, res) {
    try {
        const { name, phone, address, email, servicePincode } = req.body;
    
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

// Assign parcels to a delivery agent
export const assignParcelsToAgent = async (req, res) => {
  const { trackingIds, agentId } = req.body;

  if (!Array.isArray(trackingIds) || trackingIds.length === 0 ) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    // Create assignments for each tracking ID
    const assignments = trackingIds.map(trackingId => ({
      TrackingId: trackingId,
      agentId,
    }));

    await parcelAssign.insertMany(assignments);

    res.status(200).json({ message: "Parcels assigned successfully" });
  } catch (error) {
    console.error("Error assigning parcels", error);
    res.status(500).json({ error: "Internal server error" });
  }
};