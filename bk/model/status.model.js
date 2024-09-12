import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  status: String,
  officeName: String,
  remark: String,
  updatedAt: { type: Date, default: Date.now }
});

const parcelStatusSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true
  },
  currentStatus: {
    type: String,
    required: true
  },
  statusHistory: [statusSchema]
});

const ParcelStatus = mongoose.model('ParcelStatus', parcelStatusSchema);

export default ParcelStatus;
