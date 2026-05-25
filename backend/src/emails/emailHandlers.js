import { Resend } from "resend";
import dotenv from "dotenv";
import { createWelcomeEmailTemplate,createResetPasswordEmailTemplate } from "./emailTemplates.js";

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

export const sendResetEmail = async (email, name, url) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Password Reset Request 🔐",
      html: createResetPasswordEmailTemplate(name, url),
    });

    if (error) {
      console.error("Error sending reset email:", error);
      throw new Error("Failed to send reset email");
    }

    console.log("Reset email sent successfully:", data);
  } catch (error) {
    console.error("Email Handler Error:", error);
  }
};