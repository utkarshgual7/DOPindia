import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parcelSchema = new Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderAddress: {
    type: String,
    required: true,
  },
  senderState: {
    type: String,
    required: true,

  },
  senderDistrict: {
    type: String,
    required: true,
  },
  senderPincode: {
    type: String,
    required: true,
  },
  senderContactNumber: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientAddress: {
    type: String,
    required: true,
  },
 recipientState: {
    type: String,
    required: true,
  },
  recipientDistrict: {
    type: String,
    required: true,
  },
  recipientPincode: {
    type: String,
    required: true,
  },
  recipientContactNumber: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'books', 'furniture', 'other'],
    required: true,
  },
  weight: {
    type: String,
    enum: ['0-0.5', '0.5-1.0', '1.0-2.0', '2.0-4.0', '>5.0'],
    required: true,
  },
  deliveryTimeFrame: {
    type: String,
    enum: ['11:00-12:00', '12:00-14:00','12:00-13:00', '14:00-16:00','14:00-15:00',"13:00-14:00",'15:00-16:00' ,'16:00-17:00','18:00-19:00','17:00-18:00','19:00-20:00'],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Booked", "In Transit", "Delivered", "Cancelled","Out for Delivery","Arrived at Delivery Station","Unable to Deliver" ],
    default: "Booked",
  },
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Parcel = mongoose.model('Parcel', parcelSchema);
export default Parcel;

