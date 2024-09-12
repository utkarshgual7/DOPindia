// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default:"usertest",
    unique: true,
  },
  title: {
    type: String,
    enum: ['Mr', 'Mrs', 'Other'],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,

  },
  otp: { type: String }, // Field to store the OTP
  otpExpiry: { type: Date },
  profilePicture:{ type: String, default: "https://img.icons8.com/color/48/customer-skin-type-7.png"}


}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
