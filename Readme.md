
# 💬 Chat Sphere – Real-Time Chat Application

Built a full-stack real-time chat application using MERN stack and Socket.IO with features like authentication, live messaging, online user tracking, and image sharing. Implemented secure APIs, real-time communication, and optimized UI for better user experience.

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
│   ├── controllers/        # Business logic (auth, messages)
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, security (Arcjet, JWT)
│   ├── models/             # Mongoose schemas
│   ├── lib/                # DB connection, socket setup, utils
│   ├── .env                # 🔐 Environment variables (NOT COMMITTED)
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── components/         # UI components (Chat, Header, Input)
│   ├── pages/              # App pages
│   ├── store/              # Zustand state management
│   ├── hooks/              # Custom hooks (sound, etc.)
│   ├── .env                # 🌐 Frontend environment variables (optional)
│   ├── index.html
│   └── package.json
│
├── .gitignore              # Ignore node_modules, .env, etc.
├── README.md               # Project documentation
└── package.json (optional root)
```

---

## ⚠️ Important Notes About `.env`

* The `.env` file **must be created inside the `backend/` folder**
* Never push `.env` to GitHub
* Add this to `.gitignore`:

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

## ⚠️ Important Notes

* Enable CORS with credentials
* Use `withCredentials: true` in Axios
* Ensure frontend URL matches backend CORS
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

**Kashodhan Prinkal**

**Crafted by Prinkal Kashodhan — debugging code and life, one cup of tea at a time ☕**

---

## ⭐ Future Improvements

* ✔ Message seen status
* 💬 Typing indicator
* 🔔 Push notifications
* 👥 Group chats
* 📱 Progressive Web App

```

---

