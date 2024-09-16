
import express from 'express';
import { bookParcel, changeParcelStatus, getAllParcels, getAllTimeFrames, getDeliveryTimeFrame, getParcelCurrentStatus, orders, updateDeliveryTimeFrame, updateParcelStatus} from '../controller/parcel.controller.js';
import { createComplaint, getAllComplaints } from '../controller/complaint.controller.js';

import { assignParcelsToAgent, getParcelAssignStatus } from '../controller/agent.controller.js';


const parcelRoutes = express.Router();

// Route to book a new parcel
parcelRoutes.post('/book', bookParcel);

// Route to get all parcels
parcelRoutes.get('/getparcels', getAllParcels);
parcelRoutes.put("/update-status", updateParcelStatus);
parcelRoutes.put("/change-status", changeParcelStatus);
parcelRoutes.get('/getparcelstatus/:trackingId', getParcelCurrentStatus);
parcelRoutes.post('/complaint', createComplaint);
parcelRoutes.get('/complaints', getAllComplaints);
parcelRoutes.get('/getparcels/:trackingId', getDeliveryTimeFrame);
parcelRoutes.post('/tfparcel/modify', updateDeliveryTimeFrame);
parcelRoutes.get('/orders',orders);
parcelRoutes.get('/timeframes/:email',getAllTimeFrames);
parcelRoutes.put('/assign-parcels',assignParcelsToAgent);
parcelRoutes.get('/assignstatus/:TrackingId',getParcelAssignStatus);






export default parcelRoutes;






