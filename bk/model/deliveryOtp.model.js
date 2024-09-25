import mongoose from 'mongoose';

const DeliveryOTPSchema = new mongoose.Schema({
    trackingId: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    otp: { type: String, default: null }, 
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // OTP expires after 120 seconds (2 minutes)
},
});

const DeliveryOtp = mongoose.model('deliveryOtp',DeliveryOTPSchema);

export default DeliveryOtp ;
