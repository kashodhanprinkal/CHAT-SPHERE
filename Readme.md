# 💬 Chat Sphere – Real-Time Full Stack Chat Application

<div align="center">

## 🚀 Production-Ready MERN Chat Application

A modern **real-time communication platform** built using the **MERN Stack + Socket.IO** with secure authentication, real-time messaging, media sharing, and scalable architecture.

Designed to demonstrate **full-stack engineering**, **real-time systems**, and **production-level development practices**.

---

### 🌟 Core Highlights

⚡ Real-Time Messaging
🔐 Secure JWT Authentication
💬 Typing Indicator
🟢 Online/Offline Presence
📸 Image Sharing
📱 Responsive UI
☁️ Cloudinary Integration
🛡️ Security Middleware
🎯 Optimistic UI Updates

</div>

---

# 📸 Project Overview

Chat Sphere is a full-stack real-time chat platform where users can:

* Create accounts securely
* Chat instantly in real time
* Share images
* Track online users
* View typing indicators
* Reset forgotten passwords securely
* Experience smooth responsive UI/UX

The project focuses on **scalable backend architecture**, **real-time communication**, and **modern frontend engineering**.

---

# 🧠 Tech Stack

## 🖥 Frontend

| Technology      | Logo | Version | Purpose                      |
| --------------- | ---- | ------- | ---------------------------- |
| React           | ⚛️   | 19.x    | Frontend UI development      |
| Vite            | ⚡    | 6.x     | Fast frontend build tool     |
| Tailwind CSS    | 🎨   | 3.x     | Responsive UI styling        |
| Zustand         | 🐻   | 5.x     | Lightweight state management |
| Axios           | 🌐   | 1.x     | API communication            |
| Framer Motion   | 🎞️  | 12.x    | Animations & transitions     |
| React Hot Toast | 🍞   | 2.x     | Notifications                |
| Lucide React    | ✨    | Latest  | Icons library                |

---

## ⚙ Backend

| Technology | Logo | Version | Purpose                 |
| ---------- | ---- | ------- | ----------------------- |
| Node.js    | 🟢   | 22.x    | Backend runtime         |
| Express.js | 🚂   | 5.x     | API & server framework  |
| MongoDB    | 🍃   | Latest  | NoSQL database          |
| Mongoose   | 📘   | 8.x     | MongoDB ODM             |
| Socket.IO  | 🔌   | 4.x     | Real-time communication |
| JWT        | 🔐   | 9.x     | Authentication          |
| Arcjet     | 🛡️  | Latest  | Security & protection   |

---

## ☁ Services & Tools

| Service    | Logo | Purpose                      |
| ---------- | ---- | ---------------------------- |
| Cloudinary | ☁️   | Image storage & optimization |
| Resend     | 📧   | Email service                |
| Git        | 🌱   | Version control              |
| GitHub     | 🐙   | Repository hosting           |
| Postman    | 📮   | API testing                  |

---

# 🚀 Features

## 🔐 Authentication & Security

* JWT Authentication using HTTP-only cookies
* Secure Login & Signup
* Forgot Password & Reset Password Flow
* Protected Routes & Middleware
* Token-based password reset
* Secure environment handling

---

## 💬 Real-Time Communication

* Instant Messaging using Socket.IO
* Real-Time Typing Indicator
* Online / Offline Presence System
* Real-Time Message Synchronization
* Optimistic UI Updates

---

## 📸 Media & User Experience

* Image Upload & Sharing
* Cloudinary Media Storage
* Auto-scroll to latest messages
* Sound Notifications 🔔
* Fully Responsive UI 📱
* Modern Glassmorphism Design
* Loading Skeletons & Smooth Animations

---

# 🏗️ Project Architecture

```bash id="tzn07y"
CHAT-SPHERE/
│
├── backend/
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & security
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── lib/                # DB & socket setup
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── store/              # Zustand state management
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Axios & socket configs
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder.

```env id="1lww6z"
PORT=3000

MONGO_URI=your_mongodb_uri

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email
EMAIL_FROM_NAME=your_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

# 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash id="k7o4ot"
git clone https://github.com/kashodhanprinkal/CHAT-SPHERE.git

cd CHAT-SPHERE
```

---

## 2️⃣ Install Dependencies

### Backend

```bash id="s31azm"
cd backend
npm install
```

### Frontend

```bash id="vnr7xt"
cd frontend
npm install
```

---

## 3️⃣ Run Application

### Start Backend

```bash id="n7g8g6"
npm run dev
```

### Start Frontend

```bash id="m0a95z"
npm run dev
```

---

# 🔌 REST API Endpoints

## 🔐 Authentication Routes

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| POST   | `/api/auth/signup`                | Register user         |
| POST   | `/api/auth/login`                 | Login user            |
| POST   | `/api/auth/logout`                | Logout user           |
| POST   | `/api/auth/forgot-password`       | Generate reset link   |
| POST   | `/api/auth/reset-password/:token` | Reset password        |
| GET    | `/api/auth/check`                 | Verify authentication |

---

## 💬 Message Routes

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| GET    | `/api/messages/contacts` | Get contacts      |
| GET    | `/api/messages/chats`    | Get chat partners |
| GET    | `/api/messages/:id`      | Get messages      |
| POST   | `/api/messages/send/:id` | Send message      |

---

# 🔄 Socket.IO Real-Time Events

| Event            | Description           |
| ---------------- | --------------------- |
| `getOnlineUsers` | Fetch online users    |
| `newMessage`     | Receive live message  |
| `typing`         | Typing indicator      |
| `stop-typing`    | Stop typing indicator |

---

# 🛡️ Security Features

* JWT Authentication
* HTTP-only Cookies
* Protected Backend Routes
* Arcjet Security Middleware
* Rate Limiting & Bot Protection
* Input Validation
* Secure Token Handling

---

# ⚡ Engineering Highlights

✅ Real-time WebSocket Architecture
✅ Optimistic UI Rendering
✅ Modular Backend Structure
✅ Reusable Frontend Components
✅ Scalable Folder Structure
✅ Responsive Modern UI
✅ Production-Oriented Development Practices

---

# 🌍 Future Scope

* ✔ Seen / Delivered Status
* 🎤 Voice Messages
* 📞 Voice & Video Calling
* 👥 Group Chats
* 🔔 Push Notifications
* 🐳 Docker & CI/CD
* 📱 Progressive Web App (PWA)
* 🤖 AI-powered Features

---

# 👨‍💻 Developer

## Prinkal Kashodhan

Full Stack MERN Developer passionate about building scalable real-time applications and modern user experiences.

### Skills Demonstrated

* Full Stack MERN Development
* Real-Time Systems with Socket.IO
* REST API Development
* Authentication & Security
* State Management
* Responsive UI Engineering
* Backend Architecture
* Cloud Integration

---

# 🌟 Why This Project Matters

This project demonstrates the ability to:

* Build scalable full-stack applications
* Handle real-time communication systems
* Design secure authentication flows
* Structure maintainable backend architecture
* Create responsive modern interfaces
* Integrate third-party cloud services
* Implement production-level engineering concepts

---

# ⭐ Support

If you like this project:

```bash id="k5y0h0"
⭐ Star the repository
🍴 Fork the project
📢 Share with others
```

---

# 📜 License

This project is developed for learning, portfolio, and demonstration purposes.
