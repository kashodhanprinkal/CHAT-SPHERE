export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <div style="max-width:600px; margin:40px auto; background:white; border-radius:14px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6a11cb,#ff4ecd); padding:35px; text-align:center;">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" 
      alt="Messenger Logo" 
      style="width:75px; height:75px; border-radius:50%; background:white; padding:10px; margin-bottom:15px;">
      
      <h1 style="color:white; margin:0; font-weight:600; font-size:28px;">
        Welcome to Messenger 🚀
      </h1>
    </div>

    <!-- Content -->
    <div style="padding:35px; color:#444; line-height:1.6;">

      <p style="font-size:18px;">
        Hello <strong style="color:#6a11cb;">${name}</strong>,
      </p>

      <p>
        We're thrilled to have you join our messaging platform! Messenger helps you stay connected with friends, family, and colleagues instantly.
      </p>

      <!-- Steps -->
      <div style="background:#faf7ff; padding:22px; border-radius:10px; margin:25px 0; border-left:5px solid #6a11cb;">

        <p style="margin-top:0; font-weight:600;">Get started quickly:</p>

        <ul style="padding-left:20px; margin-bottom:0;">
          <li style="margin-bottom:8px;">Upload your profile picture</li>
          <li style="margin-bottom:8px;">Find and add your friends</li>
          <li style="margin-bottom:8px;">Start chatting instantly</li>
          <li>Share photos, videos and moments</li>
        </ul>

      </div>

      <!-- Button -->
      <div style="text-align:center; margin:35px 0;">
        <a href="${clientURL}" 
        style="background:linear-gradient(135deg,#6a11cb,#ff4ecd); 
        color:white; 
        text-decoration:none; 
        padding:14px 32px; 
        border-radius:40px; 
        font-weight:600; 
        font-size:15px; 
        display:inline-block;
        box-shadow:0 6px 14px rgba(106,17,203,0.25);">
        Open Messenger
        </a>
      </div>

      <p>If you ever need help, our team is always here for you.</p>

      <p style="margin-bottom:0;">
        Cheers,<br>
        <strong>The Messenger Team</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="background:#fafafa; text-align:center; padding:20px; font-size:12px; color:#888;">
      <p style="margin:0;">© 2026 Messenger. All rights reserved.</p>

      <p style="margin-top:8px;">
        <a href="#" style="color:#6a11cb; text-decoration:none; margin:0 8px;">Privacy Policy</a>
        <a href="#" style="color:#6a11cb; text-decoration:none; margin:0 8px;">Terms</a>
        <a href="#" style="color:#6a11cb; text-decoration:none; margin:0 8px;">Support</a>
      </p>
    </div>

  </div>

  </body>
  </html>
  `;
}