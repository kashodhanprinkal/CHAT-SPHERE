# 💬 Chat Sphere

> A Real-Time Full Stack Chat Application built with MERN Stack, Socket.IO, WebRTC, and Cloudinary.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)

---

## 🚀 Overview

Chat Sphere is a modern real-time communication platform that enables users to exchange messages instantly, share media, send voice notes, and make audio/video calls.

The application focuses on real-time communication, user experience, secure authentication, and scalable architecture using industry-standard technologies.

---

## ✨ Features

### 🔐 Authentication & Security

- User Registration & Login
- JWT Authentication
- HTTP-Only Cookies
- Protected Routes
- Forgot Password & Reset Password
- Password Encryption using bcrypt

### 💬 Real-Time Messaging

- One-to-One Chat
- Instant Message Delivery
- Typing Indicators
- Online/Offline Presence
- Message Status Tracking
  - Sent
  - Delivered
  - Read

### 📸 Media Sharing

- Image Upload & Sharing
- Voice Message Recording
- Voice Message Playback
- Cloudinary Media Storage

### 📞 Calling System

- Audio Calling
- Video Calling
- WebRTC Integration
- Call History
- Call Duration Tracking

### 🎨 User Experience

- Responsive Design
- Modern UI
- Optimistic Updates
- Smooth Animations
- Loading States
- Toast Notifications

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Zustand
- Axios
- Framer Motion
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- WebRTC

### Services

- Cloudinary
- Resend
- Arcjet

---

## 📂 Project Structure

```bash
CHAT-SPHERE
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── lib
│   ├── emails
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── store
│   ├── lib
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
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

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/signup |
| POST | /api/auth/login |
| POST | /api/auth/logout |
| POST | /api/auth/forgot-password |
| POST | /api/auth/reset-password/:token |
| GET | /api/auth/check |

### Messages

| Method | Endpoint |
|----------|----------|
| GET | /api/messages/contacts |
| GET | /api/messages/:id |
| POST | /api/messages/send/:id |
| POST | /api/messages/voice/:id |

### Calls

| Method | Endpoint |
|----------|----------|
| GET | /api/calls/:userId |
| GET | /api/calls/recent/all |

---

## ⚡ Key Highlights

- Real-Time Communication using Socket.IO
- Audio & Video Calling using WebRTC
- Secure Authentication with JWT
- Cloud-Based Media Storage
- Responsive User Interface
- Modular Backend Architecture
- Scalable Folder Structure
- State Management with Zustand

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

---

## 🚧 Future Improvements

- Group Chats
- Push Notifications
- Docker Support
- CI/CD Pipeline
- Progressive Web App (PWA)
- AI-Powered Features

---

## 👨‍💻 Developer

### Prinkal Kashodhan

Full Stack MERN Developer passionate about building scalable web applications and real-time systems.

#### Connect

- GitHub: https://github.com/kashodhanprinkal
- LinkedIn: https://linkedin.com/in/prinkal-kashodhan

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful:

- Star the repository
- Fork the project
- Share it with others

---

Made with ❤️ by Prinkal Kashodhan