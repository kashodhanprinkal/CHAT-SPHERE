# 💬 Chat Sphere – Real-Time Chat Application

A **production-ready full-stack real-time chat application** built with the MERN stack and Socket.IO.
It enables instant messaging, real-time updates, secure authentication, and media sharing with a modern UI.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT Authentication (HTTP-only cookies)
* Secure login & signup system
* Forgot / Reset password (token-based)
* Protected routes & middleware

### 💬 Real-Time Communication

* Instant messaging using Socket.IO
* Typing indicator (real-time)
* Online / Offline user tracking
* Optimistic UI updates

### 📸 Media & UX

* Image upload & sharing (Cloudinary)
* Auto-scroll to latest messages
* Sound notifications 🔔
* Keyboard shortcuts (ESC to close chat)
* Fully responsive UI 📱

---

## 🧠 Tech Stack

### 🖥️ Frontend

* React (Vite)
* Tailwind CSS
* Zustand (State Management)
* Axios

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.IO

### ☁️ Services & Tools

* Cloudinary (Media Storage)
* Resend (Email Service)
* Arcjet (Security Middleware)

---

## 📂 Project Structure

```
CHAT-SPHERE/
│
├── backend/
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & security
│   ├── models/             # Database schemas
│   ├── lib/                # DB & socket setup
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── components/         # UI components
│   ├── pages/              # App pages
│   ├── store/              # Zustand store
│   ├── hooks/              # Custom hooks
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend/** folder:

```
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

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kashodhanprinkal/CHAT-SPHERE.git
cd CHAT-SPHERE
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Run Application

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

---

## 🔌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| POST   | /api/auth/signup                | Register user       |
| POST   | /api/auth/login                 | Login user          |
| POST   | /api/auth/logout                | Logout user         |
| POST   | /api/auth/forgot-password       | Generate reset link |
| POST   | /api/auth/reset-password/:token | Reset password      |

---

### 💬 Message Routes

| Method | Endpoint               | Description  |
| ------ | ---------------------- | ------------ |
| GET    | /api/messages/contacts | Get contacts |
| GET    | /api/messages/:id      | Get messages |
| POST   | /api/messages/send/:id | Send message |

---

## 🔄 Real-Time Events (Socket.IO)

| Event          | Description      |
| -------------- | ---------------- |
| getOnlineUsers | Get online users |
| newMessage     | Receive message  |
| typing         | User typing      |
| stop-typing    | Stop typing      |

---

## 🧪 Key Functionalities

* Real-time chat with WebSockets
* Typing indicator system
* Forgot password with secure token flow
* Image upload with preview
* Online/offline presence tracking
* Optimistic UI updates

---

## 🛡 Security Features

* HTTP-only cookies
* JWT authentication
* Protected routes
* Arcjet middleware (rate limiting & bot protection)
* Input validation

---

## ⭐ Future Improvements

* ✔ Seen / Delivered message status
* 🔔 Push notifications
* 👥 Group chats
* 🎤 Voice messages
* 📞 Video / Voice calling (WebRTC)
* 📱 Progressive Web App (PWA)

---

## 👨‍💻 Author

**Prinkal Kashodhan**

> Crafted by Prinkal — debugging code and life, one cup of tea at a time ☕

---

## 🌟 Show Your Support

If you like this project:

⭐ Star the repo

🍴 Fork it

📢 Share it
