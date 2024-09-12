import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Location = model('Location', LocationSchema);
export default Location;
