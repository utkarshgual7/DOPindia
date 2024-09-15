// models/Agent.js
import mongoose, { model } from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  servicePincode: {
    type: String,
    required: true,
  },
  agentId: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const Agent = model('Agent', agentSchema);

export default Agent;

