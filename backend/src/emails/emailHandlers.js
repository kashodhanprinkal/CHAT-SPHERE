import { Resend } from "resend";
import dotenv from "dotenv";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

dotenv.config();

const resendClient = new Resend(process.env.RESEND_API_KEY);

const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to CHATTER-BOX!! 🎉",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
  } catch (error) {
    console.error("Email Handler Error:", error);
  }
};