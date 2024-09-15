// Define the function to generate the email HTML for parcel booking confirmation
const parcelBookingMail = (senderName, trackingId) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parcel Booking Confirmation - Machinevice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #000000;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .tracking {
      font-weight: bold;
      color: #ff0000;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      color: #ffffff;
      background-color: #4CAF50;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Parcel Booking Confirmed!</h1>
    <p>Hi ${senderName},</p>
    <p>We are pleased to inform you that your parcel has been successfully booked INDIAPOST.</p>
    <p>Your tracking number is: <span class="tracking">${trackingId}</span>.</p>
    <p>You can track your parcel's journey on our website.</p>
    <a href="http://localhost:5173/trackparcel" class="button">Track Parcel</a>
    <p>You can also modify delivery time slot.</p>
    <a href="http://localhost:5173/modifyorder" class="button">Track Parcel</a>
    
    
    <div class="footer">
      <p>SMARTDakiya- DOP </p>
      
    </div>
  </div>
</body>
</html>
`;

// Export the function
export { parcelBookingMail };
