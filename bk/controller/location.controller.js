 // Assuming you have a Location model set up

import Location from "../model/location.model.js";
import axios from "axios"
// Controller to handle saving the receiver's current location
export const saveReceiverLocation = async (req, res) => {
  const { trackingId, latitude, longitude } = req.body;

  try {
    // Check if location for this trackingId already exists
    let location = await Location.findOne({ trackingId });

    if (location) {
      // Update existing location
      location.latitude = latitude;
      location.longitude = longitude;
    } else {
      // Create a new location entry
      location = new Location({
        trackingId,
        latitude,
        longitude,
      });
    }

    // Save to the database
    await location.save();

    res.status(200).json({ message: 'Location saved successfully!' });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};


// Assuming you have a Location model with a trackingId field
export const getLocationByTrackingId = async (req, res) => {
    const { trackingId } = req.params;
  
    try {
      const receiverLocation = await Location.findOne({ trackingId });
  
      if (!receiverLocation) {
        return res.status(404).json({ error: "Location not found" });
      }
  
      res.json(receiverLocation);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  };







  