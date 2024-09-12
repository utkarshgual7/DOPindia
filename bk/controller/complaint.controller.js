import Complaint from "../model/complaint.model.js";


export const createComplaint = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    trackingNumber,
    shippingAddress,
    ShipmentDate,
    issueDescription,
    preferredResolution
  } = req.body;

  if (!fullName || !email || !phone || !trackingNumber || !shippingAddress || !ShipmentDate || !issueDescription) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const complaint = new Complaint({
      fullName,
      email,
      phone,
      trackingNumber,
      shippingAddress,
      ShipmentDate,
      issueDescription,
      preferredResolution
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while submitting the complaint' });
  }
};
// Add this method to the existing complaintController.js
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};



