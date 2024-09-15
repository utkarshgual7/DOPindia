
import express from 'express';

import { loginofficer, registerOfficer } from '../controller/officer.controller.js';
import { agentLogin, getAgents, registerAgent } from '../controller/agent.controller.js';


const officeRoutes = express.Router();

// Route to book a new office
officeRoutes.post('/register', registerOfficer);
officeRoutes.post('/login', loginofficer);
officeRoutes.post('/agentregister', registerAgent);
officeRoutes.get('/agents',getAgents);
officeRoutes.post('/agentlogin',agentLogin);



// Route to update office status
// officeRoutes.put('/update-status', updateofficeStatus);

// // Route to get all offices
// officeRoutes.get('/offices', getAlloffices);

export default officeRoutes;






