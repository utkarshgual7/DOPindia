import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465, // or use 587 for STARTTLS
  secure: true, // use true for port 465, false for port 587
  auth: {
    user: "gu.meet.07@gmail.com",
    pass: "grzoebifepuzermx", // use an app-specific password if 2FA is enabled
  },
});

export async function sendMail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: "gu.meet.07@gmail.com",
      to,
      subject,
      text,
      html
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
