
// Define the function to generate the OTP email HTML with the user's name and OTP
export const MarkDelivery = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
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
    .button {
      display: inline-block;
      padding: 10px 20px;
      color: #ffffff;
      background-color: #ccdae8;
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
    <h1>Delivery Confirmation Code</h1>
    <p>Dear User,</p>
    <p>Please share this OTP code only when your article is delivered:</p>
    <p style="font-size: 24px; font-weight: bold;">${otp}</p>
    <p>Do not Share this OTP CODE with anyone else, your parcel can only be marked as delivered by verifying this OTP.</p>
    
    <p>Best regards,<br>Department of Posts</p>
    <div class="footer">
      <p>SMARTDakiya - INDIA</p>
      <p>&copy; 2024 SMARTDakiya. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Export the function
