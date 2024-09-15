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
  password: {
    type: String,
    required: true,
 
  },
  email :{
    type: String,
    required: true,
    unique: true,
  },
  profilePicture:{ type: String, default: "https://img.icons8.com/color/48/customer-skin-type-7.png"},
  agentId: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const Agent = model('Agent', agentSchema);

export default Agent;

