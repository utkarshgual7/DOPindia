
import express from 'express';
import {  getLocationByTrackingId, saveReceiverLocation } from '../controller/location.controller.js';




const locationRoutes = express.Router();

// Route to book a new office
locationRoutes.post('/save-location',saveReceiverLocation)
locationRoutes.get('/fetchlocation/:trackingId', getLocationByTrackingId);




export default locationRoutes;






