// mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

// Verify the connection
transporter.verify((error, success) => {
  if (error) {
    console.log("Error setting up email transporter:", error);
  } else {
    console.log("Email Server is ready to take our messages");
  }
});

// Define the email options type
interface EmailOptions {
  to: string;
  subject: string;
  message: string;
}

// Send email function
export const sendEmail = async ({ to, subject, message }: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: '"TastyBites" <no-reply@TastyBites>',
      to,
      subject,
      html: message,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
