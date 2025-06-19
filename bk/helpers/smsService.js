// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Arrow function to send SMS
// export const sendSmsNotification = (to, messageBody) => 
//   client.messages.create({
//     body: messageBody,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: '+18777804236'
//   });

// // Function to handle sending SMS for different features
// export const notifyUser = (feature, userPhoneNumber, data) => {
//   let messageBody = '';


 

//   switch (feature) {
//     case 'parcelBooking':
//       messageBody = `Your parcel with tracking number ${data.trackingNumber} has been successfully booked.`;
//       break;

//     case 'In Transit':
//       messageBody = `Dear user, Your parcel with tracking number ${data.trackingNumber} has been shipped and is in transit.`;
//       break;

//     case 'Arrived at Delivery Station':
//       messageBody = `Dear user, Your parcel with tracking number ${data.trackingNumber} has arrived at the nearest delivery station and will soon reach you at your preferred time.`;
//       break;

//     case 'Out for Delivery':
//       messageBody = `Your parcel with tracking number ${data.trackingNumber} is out for delivery with our agent.`;
//       break;

//     case 'Delivered':
//       messageBody = `Dear user, Your parcel with tracking number ${data.trackingNumber} has been delivered. Thank you for using INDIAPOST and contributing to the nation.`;
//       break;

//     case 'Unable to Deliver':
//       messageBody = `Dear user, your parcel with tracking number ${data.trackingNumber} has returned to your nearest delivery station due to a non-delivery attempt. You may collect your parcel from your Post Office, or it will be delivered on the next working day.`;
//       break;

//     default:
//       messageBody = 'Thank you for using our service!';
//   }

//   // Send SMS with async/await
//   (async () => {
//     try {
//       const message = await sendSmsNotification(userPhoneNumber, messageBody);
//       console.log(`SMS sent: ${message.sid}`);
//     } catch (err) {
//       console.error('Error sending SMS:', err);
//     }
//   })();
// };
