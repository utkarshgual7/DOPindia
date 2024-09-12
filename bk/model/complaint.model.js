import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  ShipmentDate: { type: Date, required: true },
  issueDescription: { type: String, required: true },
  preferredResolution: { type: String, default: '' },
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
