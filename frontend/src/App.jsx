import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useAuthStore } from "./store/useAuthStore.js";
import useCallListeners from "./hooks/useCallListeners";
import useWebRTCListeners from "./hooks/useWebRTCListeners";
import PageLoader from "./components/PageLoader";
import IncomingCallModal from "./components/IncomingCallModal";
import CallScreen from "./components/CallScreen.jsx";

function App() {
  // ==================================================
  // 📞 CALL LISTENERS
  // ==================================================
  useCallListeners();
  useWebRTCListeners();

  // ==================================================
  // 📦 AUTH STORE
  // ==================================================
  const {
    checkAuth,
    isCheckingAuth,
    authUser,
  } = useAuthStore();

  // ==================================================
  // 🔐 CHECK AUTH ON APP LOAD
  // ==================================================
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ==================================================
  // ⏳ SHOW LOADER WHILE AUTH CHECKING
  // ==================================================
  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden text-white relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 scroll-smooth">
      
      {/* ==================================================
          ✨ ANIMATED BACKGROUND EFFECTS
      ================================================== */}
      
      {/* Animated Grid */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:30px_30px] sm:bg-[size:40px_40px]"
      />

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{ 
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-20 left-10 sm:left-32 w-48 sm:w-96 h-48 sm:h-96 
          bg-gradient-to-r from-pink-500/30 to-purple-500/30 
          blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{ 
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.8, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-20 right-10 sm:right-32 w-48 sm:w-96 h-48 sm:h-96 
          bg-gradient-to-r from-cyan-500/30 to-blue-500/30 
          blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.3, 0.5, 0.2, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:block fixed top-1/2 left-1/2 w-[35rem] h-[35rem] 
          -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 
          blur-[180px] rounded-full pointer-events-none"
      />

      {/* ==================================================
          📦 MAIN LAYOUT WRAPPER
      ================================================== */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-6 py-8">
        
        {/* ==================================================
            🧱 GRID LAYOUT
        ================================================== */}
        <div
          className={`
            w-full mx-auto grid gap-6 sm:gap-10 items-center
            ${authUser ? "max-w-7xl grid-cols-1" : "max-w-6xl lg:grid-cols-2"}
          `}
        >

          {/* ==================================================
              ✨ LEFT BRANDING SECTION
              (ONLY FOR LOGIN/SIGNUP)
          ================================================== */}
          {!authUser && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden lg:flex flex-col justify-center space-y-6 px-4 sm:px-8 py-8"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-slate-300">500+ Active Users</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  ChatSphere
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md">
                Connect instantly, chat seamlessly, and experience a beautifully designed
                real-time messaging platform with crystal-clear video & voice calls.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: "💬", text: "Real-time messaging" },
                  { icon: "🎥", text: "Video & voice calls" },
                  { icon: "🔒", text: "End-to-end encrypted" },
                  { icon: "📱", text: "Cross-platform support" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-slate-300 text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Stats */}
              <div className="flex gap-8 mt-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-xs text-slate-500">Messages Daily</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <div className="text-xs text-slate-500">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-xs text-slate-500">Support</div>
                </div>
              </div>

              {/* Animated Dots */}
              <div className="flex gap-3 mt-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full animate-bounce" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full animate-bounce delay-200" />
              </div>
            </motion.div>
          )}

          {/* ==================================================
              💬 CHAT / AUTH SECTION
          ================================================== */}
          <div className="w-full flex items-center justify-center py-8">
            
            {/* ==================================================
                🪟 MAIN GLASS CONTAINER
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`
                w-full rounded-2xl sm:rounded-3xl
                border border-white/20 
                bg-gradient-to-br from-white/10 via-white/5 to-transparent
                backdrop-blur-2xl shadow-2xl overflow-hidden
                transition-all duration-500 hover:shadow-cyan-500/10
                ${authUser ? "max-w-6xl" : "max-w-md"}
              `}
            >
              {/* Decorative Top Border Animation */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              
              {/* Inner Content */}
              <div className="relative z-10 p-2 sm:p-4">
                <Routes>
                  <Route
                    path="/"
                    element={authUser ? <ChatPage /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                  />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================================
          🔔 TOAST NOTIFICATIONS
      ================================================== */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(12px)",
            color: "#f8fafc",
            borderRadius: "16px",
            padding: "12px 20px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          },
        }}
      />

      {/* ==================================================
          📞 CALL COMPONENTS
      ================================================== */}
      <IncomingCallModal />
      <CallScreen />

    </div>
  );
}

export default App;