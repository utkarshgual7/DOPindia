import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import officeRoutes from './routes/office.route.js';
import parcelRoutes from './routes/parcel.route.js';
import locationRoutes from './routes/location.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Mongodb is connected');
}).catch((err) => {
  console.log(err);
});

const __dirname = path.resolve();
const app = express();



app.use(express.json()); // Allows parsing of JSON data

app.use("/api/auth",authRoutes);
app.use("/api/office",officeRoutes);
app.use("/api/parcel",parcelRoutes);
app.use("/api/location",locationRoutes);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'sihproject', 'dist', 'index.html'));
});


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode not provided
  const message = err.message || 'Internal Server Error'; // Default message

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);

  // Generate sitemap after the server starts
  
});
