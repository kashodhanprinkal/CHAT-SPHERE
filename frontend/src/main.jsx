import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // ✅ ADD THIS
import './index.css'
import App from './App.jsx'

// 🔔 REGISTER SERVICE WORKER FOR PUSH NOTIFICATION
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) => console.log("❌ Service Worker registration failed:", err));
  });
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* ✅ WRAP APP */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
