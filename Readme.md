Alright — now I’ll give you a **clean README based on your actual env setup**, but **secure (no real secrets exposed)** and **ready for deployment later**.

👉 This is final — just copy-paste into `README.md`

---

# 📄 ✅ FINAL README (BASED ON YOUR ENV)

```md
# 💬 Chat Sphere – Real-Time Chat Application

Chat Sphere is a full-stack real-time chat application built using the MERN stack and Socket.IO.  
It supports instant messaging, real-time updates, image sharing, and secure authentication.

---

## 🚀 Features

- 🔐 Authentication (JWT + HTTP-only cookies)
- 💬 Real-time messaging using Socket.IO
- 🟢 Online / Offline user tracking
- 📸 Image upload & sharing (Cloudinary)
- ⚡ Optimistic UI (instant message rendering)
- 🔔 Sound notifications
- ⌨️ Keyboard shortcuts (ESC to close chat)
- 🔄 Auto-scroll to latest messages
- 📱 Fully responsive UI

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Zustand
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO

### Services
- Cloudinary (media storage)
- Resend (email service)
- Arcjet (security middleware)

---

## 📂 Project Structure

```

CHAT-SPHERE/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── lib/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── store/
│   ├── hooks/
│   └── pages/
│
└── README.md

```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```

PORT=3000
MONGO_URI=your_mongodb_uri

NODE_ENV=production
JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email
EMAIL_FROM_NAME=your_name

CLIENT_URL=[http://localhost:5173](http://localhost:5173)

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

````

⚠️ **Important:**
- Never expose real values
- Do not commit `.env` file
- Use environment variables in deployment platforms

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/kashodhanprinkal/CHAT-SPHERE.git
cd CHAT-SPHERE
````

---

### 2. Install Dependencies

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

### 3. Run Application

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

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | /api/auth/signup       | Register user     |
| POST   | /api/auth/login        | Login user        |
| POST   | /api/auth/logout       | Logout            |
| GET    | /api/messages/contacts | Get all contacts  |
| GET    | /api/messages/chats    | Get chat partners |
| GET    | /api/messages/:id      | Get messages      |
| POST   | /api/messages/send/:id | Send message      |

---

## 🔄 Real-Time Events

| Event          | Description          |
| -------------- | -------------------- |
| getOnlineUsers | List of online users |
| newMessage     | Receive new message  |

---

## 🌐 Deployment

> Deployment details will be added after project is deployed.

Recommended:

* Backend → Render / Railway
* Frontend → Vercel

---

## ⚠️ Important Notes

* Enable CORS with credentials
* Use `withCredentials: true` in Axios
* Ensure frontend URL matches backend CORS
* Socket event names must match exactly (`newMessage`)
* Never expose secrets in public repositories

---

## 🧪 Key Functionalities

* Real-time chat using WebSockets
* Optimistic UI updates
* Image upload with preview
* Auto-scroll to latest messages
* Online/offline detection

---

## 👨‍💻 Author

**Prinkal Kashodhan**

---

## 📌 Resume Description

Built a full-stack real-time chat application using MERN stack and Socket.IO with features like authentication, live messaging, online user tracking, and image sharing. Implemented secure APIs, real-time communication, and optimized UI for better user experience.

---

## ⭐ Future Improvements

* ✔ Message seen status
* 💬 Typing indicator
* 🔔 Push notifications
* 👥 Group chats
* 📱 Progressive Web App

```

---

