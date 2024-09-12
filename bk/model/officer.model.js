
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const officerSchema = new mongoose.Schema({
  officerId: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  officeName: { type: String, required: true},
  officerName: { type: String, required: true}
});


// Compare passwords


const Officer = mongoose.model('Officer', officerSchema);
export default Officer;
