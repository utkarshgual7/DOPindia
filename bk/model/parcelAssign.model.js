// models/ParcelAssignment.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const ParcelAssignmentSchema = new Schema({
  TrackingId: {
    type: String,
    ref: 'Parcel', // Ensure you have a Parcel model
    required: true,
  },
  agentId: {
    type: String,
    ref: 'Agent', // Ensure you have an Agent model
    required: true,
  },
  status: {
    type: String,
    enum: ['Assigned', 'Delivered','Not Assigned'],

  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ParcelAssignment = mongoose.model('ParcelAssignment', ParcelAssignmentSchema);
export default ParcelAssignment;
