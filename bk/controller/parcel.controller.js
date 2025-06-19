import { parcelBookingMail } from "../helpers/parcelBookingMail.js";
import { parcelRecMail } from "../helpers/parcelRecMail.js";
import { senderParcelUpdate } from "../helpers/senderParcelUpdate.js";
import { sendMail } from "../helpers/sendMail.js";
// import { notifyUser } from "../helpers/smsService.js";
import Parcel from "../model/parcel.model.js";
import ParcelStatus from "../model/status.model.js";
import { recParcelUpdate } from "../helpers/recParcelUpdate.js";


const generateTrackingId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let trackingId = '';
  for (let i = 0; i < 10; i++) {
    trackingId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return trackingId;
};


export const bookParcel = async (req, res) => {
  try {
    // Generate a tracking ID
    const trackingId = generateTrackingId();

    // Create the parcel with the tracking ID
    const parcel = new Parcel({ ...req.body, trackingId });
    await parcel.save();

    // Prepare the sender's data
    const senderName = req.body.senderName; // Assuming sender's name is in the request body
    const senderEmail = req.body.senderEmail; // Assuming sender's email is in the request body
    const senderPhone = req.body.senderPhone; // Assuming sender's phone is in the request body
    const recipientEmail = req.body.recipientEmail; 

  const recipientName = req.body.recipientName;
  const recipientPhone = req.body.recipientName;

    // Call your custom email function
    sendMail(senderEmail, "Parcel Booked", "", parcelBookingMail(senderName,trackingId));;
    sendMail(recipientEmail, "Arriving a Parcel", "", parcelRecMail(recipientName,trackingId));;

    // Send SMS for parcel booking feature
    // notifyUser('parcelBooking', senderPhone, { trackingNumber: trackingId });
    // notifyUser('parcelBooking', recipientPhone, { trackingNumber: trackingId });


    res.status(201).json({ message: 'Parcel booked successfully!', parcel });
  } catch (error) {
    console.error('Error booking parcel:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};




// Get all parcel bookings (for debugging or admin purposes)
export const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.status(200).json(parcels);
  } catch (error) {
    console.error('Error fetching parcels:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};





export const updateParcelStatus = async (req, res) => {
  const { trackingId, status, remarks, officeName } = req.body;

  try {
    // Find the parcel by tracking ID
    let parcelstatus = await ParcelStatus.findOne({ trackingId });

    if (parcelstatus) {
      // If the parcel exists, update the status and remarks
      parcelstatus.currentStatus = status;

      if (remarks) {
        parcelstatus.statusHistory.push({
          status,
          officeName: officeName || "Unknown", // Default value if officeName is not provided
          remark: remarks.custom || remarks.predefined || "",
          updatedAt: new Date(),
        });
      }

      await parcelstatus.save();
     
    } else {
      // If the parcel does not exist, create a new parcel status
      parcelstatus = new ParcelStatus({
        trackingId,
        currentStatus: status,
        statusHistory: [
          {
            status,
            officeName: officeName || "Unknown",
            remark: remarks.custom || remarks.predefined || "",
            updatedAt: new Date(),
          }
        ]
      });

      await parcelstatus.save();
    }

    res.status(200).json({
      message: parcelstatus.isNew ? "Parcel status created successfully" : "Parcel status updated successfully",
      parcelstatus,
    });
  } catch (error) {
    console.error("Error updating or creating parcel status", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getParcelCurrentStatus = async (req, res) => {
  const { trackingId } = req.params;

  try {
    // Find the parcel status by tracking ID
    const parcelStatus = await ParcelStatus.findOne({ trackingId });

    if (!parcelStatus) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Return the current status and status history
    res.status(200).json({
      trackingId: parcelStatus.trackingId,
      currentStatus: parcelStatus.currentStatus,
      statusHistory: parcelStatus.statusHistory,
    });
  } catch (error) {
    console.error('Error fetching parcel status', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//this is in details booking



export const changeParcelStatus = async (req, res) => {
  const { trackingId, status } = req.body;

  try {
    // Find the parcel by tracking ID
    const parcel = await Parcel.findOne({ trackingId });

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    // Update the status
    parcel.status = status;
    await parcel.save();

    // Fetch sender and recipient details
    const { senderName, senderEmail, senderPhone, recipientName, recipientPhone, recipientEmail } = parcel;

    // Determine the SMS feature based on the status
    let smsFeature;
    switch (status) {
      case 'In Transit':
        smsFeature = 'In Transit';
        break;
      case 'Arrived at Delivery Station':
        smsFeature = 'Arrived at Delivery Station';
        break;
      case 'Out for Delivery':
        smsFeature = 'Out for Delivery';
        break;
      case 'Delivered':
        smsFeature = 'Delivered';
        break;
      case 'Unable to Deliver':
        smsFeature = 'Unable to Deliver';
        break;
      default:
        smsFeature = 'parcelBooking'; // Default case
    }

    // Send email to the sender
    sendMail(senderEmail, "Parcel Status Update", "", senderParcelUpdate(senderName, trackingId, status));
    sendMail(recipientEmail, "Parcel Status Update", "", recParcelUpdate(recipientName, trackingId, status));

    // Send SMS notifications
    // notifyUser(smsFeature, senderPhone, { trackingNumber: trackingId });
    // notifyUser(smsFeature, recipientPhone, { trackingNumber: trackingId });

  

    res.status(200).json({
      message: "Parcel status changed successfully",
      parcel,
    });
  } catch (error) {
    console.error("Error updating parcel status", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDeliveryTimeFrame = async (req, res) => {
  const { trackingId } = req.params;

  try {
    const parcel = await Parcel.findOne({  trackingId });

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    res.json({ deliveryTimeFrame: parcel.deliveryTimeFrame });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Controller to update the delivery time frame
export const updateDeliveryTimeFrame = async (req, res) => {
  const { trackingId, newTime } = req.body;

  try {
    const parcel = await Parcel.findOneAndUpdate(
      { trackingId },
      { deliveryTimeFrame: newTime },
      { new: true }
    );

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    res.json({ message: 'Time slot successfully updated!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const orders = async (req, res) => {
const { senderEmail, recipientEmail } = req.query;
  let orders;

  if (senderEmail) {
    orders = await Parcel.find({ senderEmail });
  } else if (recipientEmail) {
    orders = await Parcel.find({ recipientEmail });
  }

  res.json(orders);
}


// Controller to fetch all delivery time frames
export const getAllTimeFrames = async (req, res) => {
  const { email } = req.params;

  try {
    // Fetch all records matching the recipient email
    const parcels = await Parcel.find({ recipientEmail: email });

    // If no records found, return a 404 error
    if (!parcels.length) {
      return res.status(404).json({
        success: false,
        message: `No records found for email: ${email}`,
      });
    }

    // Extract delivery time frames from the matching records
    const timeFrames = parcels.map(parcel => parcel.deliveryTimeFrame);

    // Optionally get unique time frames if needed
    const uniqueTimeFrames = [...new Set(timeFrames)];

    // Return the list of time frames
    res.status(200).json({
      success: true,
      timeFrames: uniqueTimeFrames
    });
  } catch (error) {
    console.error('Error fetching time frames by email:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Function to get parcel details by Tracking ID
export const getParcelByTrackingId = async (req, res) => {
  const { TrackingId } = req.params;

  try {
    const parcel = await Parcel.findOne({ trackingId:TrackingId });

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    res.status(200).json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};