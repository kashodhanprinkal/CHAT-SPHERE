import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ============================================================
// 📧 CREATE TRANSPORTER
// ============================================================
const createTransporter = () => {
  // Option 1: Gmail (Recommended - Free)
  if (process.env.EMAIL_SERVICE === "gmail") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // App password, not regular password
      },
    });
  }

  // Option 2: Outlook/Hotmail
  if (process.env.EMAIL_SERVICE === "outlook") {
    return nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Option 3: Custom SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const transporter = createTransporter();

// ============================================================
// 🔐 SEND RESET EMAIL
// ============================================================
export const sendResetEmail = async (to, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"ChatSphere" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "🔐 Reset Your Password - ChatSphere",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header -->
            <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #1e293b;">
              <h1 style="color: #06b6d4; font-size: 32px; margin: 0;">💬 ChatSphere</h1>
              <p style="color: #94a3b8; margin: 5px 0 0;">Real-Time Chat Application</p>
            </div>

            <!-- Content -->
            <div style="background: #1e293b; border-radius: 16px; padding: 40px 30px; margin-top: 30px; border: 1px solid #334155;">
              <h2 style="color: #f8fafc; font-size: 24px; margin: 0 0 10px;">🔐 Reset Your Password</h2>
              <p style="color: #cbd5e1; line-height: 1.6; margin: 10px 0 20px;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>

              <!-- Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 10px 0;">
                Or copy this link into your browser:
              </p>
              <p style="color: #06b6d4; font-size: 14px; word-break: break-all; background: #0f172a; padding: 12px; border-radius: 8px; margin: 10px 0 20px;">
                ${resetUrl}
              </p>

              <div style="border-top: 1px solid #334155; padding-top: 20px; margin-top: 20px;">
                <p style="color: #64748b; font-size: 13px; margin: 0;">
                  ⏰ This link expires in 1 hour for security reasons.
                </p>
                <p style="color: #64748b; font-size: 13px; margin: 10px 0 0;">
                  If you didn't request this, please ignore this email.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px 0; margin-top: 20px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} ChatSphere. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error("Failed to send reset email");
  }
};

// ============================================================
// 📤 SEND GENERIC EMAIL
// ============================================================
export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"ChatSphere" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error("Failed to send email");
  }
};

// ============================================================
// ✉️ SEND WELCOME EMAIL
// ============================================================
export const sendWelcomeEmail = async (to, name) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Welcome to ChatSphere</title>
    </head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; padding: 30px 0;">
          <h1 style="color: #06b6d4; font-size: 32px;">💬 ChatSphere</h1>
        </div>
        <div style="background: #1e293b; border-radius: 16px; padding: 40px 30px; border: 1px solid #334155;">
          <h2 style="color: #f8fafc;">Welcome ${name}! 🎉</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            Your account has been created successfully. Start chatting with your friends now!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Start Chatting
            </a>
          </div>
        </div>
        <div style="text-align: center; padding: 20px 0;">
          <p style="color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} ChatSphere</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(to, "🎉 Welcome to ChatSphere!", html);
};