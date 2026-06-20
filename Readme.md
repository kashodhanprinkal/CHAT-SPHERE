
# 💬 Chat Sphere

> A Real-Time Full Stack Chat Application built with MERN Stack, Socket.IO, WebRTC, and Cloudinary.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)
![WebRTC](https://img.shields.io/badge/Calls-WebRTC-orange)

---

## 🚀 Overview

Chat Sphere is a modern real-time communication platform that enables users to exchange messages instantly, share media, send voice notes, and make audio/video calls with **push notifications** and **message status tracking**.

The application focuses on real-time communication, user experience, secure authentication, and scalable architecture using industry-standard technologies.

---

## ✨ Features

### 🔐 Authentication & Security

- User Registration & Login
- JWT Authentication with HTTP-Only Cookies
- Protected Routes
- Forgot Password & Reset Password
- Password Encryption using bcrypt

### 💬 Real-Time Messaging

- One-to-One Chat
- Instant Message Delivery via Socket.IO
- Typing Indicators
- Online/Offline Presence
- **Message Status Tracking**
  - ✅ Sent (Single grey tick)
  - ✅ Delivered (Double grey tick)
  - ✅ Read (Double blue tick)
- **Push Notifications** 🔔
  - New message notifications
  - Incoming call alerts
  - Missed call notifications

### 📸 Media Sharing

- Image Upload & Sharing
- Voice Message Recording & Playback
- Cloudinary Media Storage

### 📞 Calling System

- Audio Calling
- Video Calling
- WebRTC Integration
- Call History
- Call Duration Tracking

### 🎨 User Experience

- Responsive Design
- Modern UI with Glassmorphism
- Optimistic Updates
- Smooth Animations (Framer Motion)
- Loading States
- Toast Notifications
- **Time & Date Formatting**
  - Message timestamps (HH:MM AM/PM)
  - Date grouping (Today, Yesterday)
  - "Time ago" display (2min ago, 1h ago)
  - Last seen status

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React | UI Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Zustand | State Management |
| Axios | API Calls |
| Framer Motion | Animations |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Socket.IO | Real-Time |
| JWT | Authentication |
| WebRTC | Video/Audio Calls |
| web-push | Push Notifications |

### Services

| Service | Purpose |
|---------|---------|
| Cloudinary | Media Storage |
| Resend | Email Service |
| Arcjet | Security |

---

## 📂 Project Structure

```
CHAT-SPHERE
│
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   ├── call.controller.js
│   │   └── notification.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   ├── Call.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   ├── call.routes.js
│   │   └── notification.routes.js
│   ├── lib/
│   │   ├── socket.js
│   │   ├── call.socket.js
│   │   ├── notification.service.js
│   │   └── cloudinary.js
│   ├── emails/
│   │   └── emailHandlers.js
│   └── server.js
│
├── frontend/
│   ├── components/
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── NotificationToggle.jsx
│   │   ├── CallScreen.jsx
│   │   ├── IncomingCallModal.jsx
│   │   ├── MessageStatus.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── ChatPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── hooks/
│   │   ├── useCallListeners.js
│   │   └── useWebRTCListeners.js
│   ├── store/
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
│   │   └── useCallStore.js
│   ├── lib/
│   │   ├── axios.js
│   │   ├── notification.js
│   │   └── time.js
│   ├── public/
│   │   └── sw.js
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=3000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Arcjet
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Push Notifications (VAPID)
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:your-email@gmail.com
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/kashodhanprinkal/CHAT-SPHERE.git
cd CHAT-SPHERE
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/forgot-password` | Request reset |
| POST | `/api/auth/reset-password/:token` | Reset password |
| GET | `/api/auth/check` | Check auth status |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/contacts` | Get contacts |
| GET | `/api/messages/chats` | Get chat partners |
| GET | `/api/messages/:id` | Get messages |
| POST | `/api/messages/send/:id` | Send message |
| POST | `/api/messages/voice/:id` | Send voice message |
| GET | `/api/messages/status/:userId` | Get message status |

### Calls

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calls/:userId` | Get call logs |
| GET | `/api/calls/recent/all` | Get recent calls |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/subscribe` | Save subscription |
| POST | `/api/notifications/unsubscribe` | Remove subscription |
| POST | `/api/notifications/test` | Test notification |

---

## ⚡ Key Highlights

- ✅ Real-Time Communication using Socket.IO
- ✅ Audio & Video Calling using WebRTC
- ✅ Secure Authentication with JWT
- ✅ Cloud-Based Media Storage
- ✅ Responsive User Interface
- ✅ Modular Backend Architecture
- ✅ Scalable Folder Structure
- ✅ State Management with Zustand
- ✅ Push Notifications with VAPID
- ✅ Message Status (Sent/Delivered/Read)
- ✅ Time & Date Formatting
- ✅ Voice Messages

---

## 🎯 Skills Demonstrated

- Full Stack Development
- MERN Stack
- REST API Development
- Authentication & Authorization
- Real-Time Systems
- WebRTC Integration
- Database Design
- State Management
- Cloud Integration
- Responsive Design
- Push Notifications
- Service Workers

---

## 🚧 Future Improvements

- 👥 Group Chats
- 🐳 Docker Support
- 🔄 CI/CD Pipeline
- 📱 Progressive Web App (PWA)
- 🤖 AI-Powered Features

---

## 👨‍💻 Developer

### Prinkal Kashodhan

Full Stack MERN Developer passionate about building scalable web applications and real-time systems.

#### Connect

- **GitHub:** [kashodhanprinkal](https://github.com/kashodhanprinkal)
- **LinkedIn:** [prinkal-kashodhan](https://linkedin.com/in/prinkal-kashodhan)

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 📢 Share it with others

---

**Made with ❤️ by Prinkal Kashodhan**
```

