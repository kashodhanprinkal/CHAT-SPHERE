import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { useAuthStore } from "./store/useAuthStore.js";

import PageLoader from "./components/PageLoader";

function App() {

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

    // ==================================================
    // 🌍 MAIN APP CONTAINER
    // - overflow-hidden prevents page overflow
    // - h-screen keeps fixed screen height
    // ==================================================
    <div className="
      h-screen
      overflow-hidden
      bg-slate-950
      text-white
      relative
    ">

      {/* ==================================================
          🟣 BACKGROUND GRID
      ================================================== */}
      <div
        className="
          absolute
          inset-0
          opacity-20
          pointer-events-none
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:25px_25px]
          sm:bg-[size:30px_30px]
        "
      />

      {/* ==================================================
          🌈 GLOW EFFECTS
      ================================================== */}

      {/* Pink Glow */}
      <div
        className="
          absolute
          top-10
          left-5
          sm:left-20
          w-40
          sm:w-72
          h-40
          sm:h-72
          bg-pink-500/20
          blur-[80px]
          sm:blur-[120px]
          rounded-full
        "
      />

      {/* Cyan Glow */}
      <div
        className="
          absolute
          bottom-10
          right-5
          sm:right-20
          w-40
          sm:w-72
          h-40
          sm:h-72
          bg-cyan-500/20
          blur-[80px]
          sm:blur-[120px]
          rounded-full
        "
      />

      {/* Center Purple Glow */}
      <div
        className="
          hidden
          sm:block
          absolute
          top-1/2
          left-1/2
          w-[28rem]
          h-[28rem]
          -translate-x-1/2
          -translate-y-1/2
          bg-purple-500/10
          blur-[140px]
          rounded-full
        "
      />

      {/* ==================================================
          📦 MAIN LAYOUT WRAPPER
      ================================================== */}
      <div
        className="
          relative
          z-10
          h-full
          flex
          items-center
          justify-center
          px-3
          sm:px-6
          py-4
        "
      >

        {/* ==================================================
            🧱 GRID LAYOUT
        ================================================== */}
        <div
          className={`
            w-full
            h-full
            ${
              authUser
                ? "max-w-7xl"
                : "max-w-6xl"
            }
            mx-auto
            grid
            ${
              !authUser
                ? "md:grid-cols-2"
                : "grid-cols-1"
            }
            gap-6
            sm:gap-10
            items-center
          `}
        >

          {/* ==================================================
              ✨ LEFT BRANDING SECTION
              (ONLY FOR LOGIN/SIGNUP)
          ================================================== */}
          {!authUser && (

            <div
              className="
                hidden
                md:flex
                flex-col
                justify-center
                space-y-5
                px-2
                sm:px-6
              "
            >

              {/* Heading */}
              <h1 className="
                text-3xl
                sm:text-5xl
                font-bold
                leading-tight
              ">
                Welcome to{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-pink-500
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  ChatSphere
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  text-slate-300
                  text-base
                  sm:text-lg
                  leading-relaxed
                  max-w-md
                "
              >
                Connect instantly, chat seamlessly,
                and experience a beautifully designed
                real-time messaging platform.
              </p>

              {/* Animated Dots */}
              <div className="flex gap-3 mt-4">

                <div
                  className="
                    w-3
                    h-3
                    sm:w-4
                    sm:h-4
                    bg-pink-500
                    rounded-full
                    animate-pulse
                  "
                />

                <div
                  className="
                    w-3
                    h-3
                    sm:w-4
                    sm:h-4
                    bg-cyan-500
                    rounded-full
                    animate-pulse
                    delay-200
                  "
                />

                <div
                  className="
                    w-3
                    h-3
                    sm:w-4
                    sm:h-4
                    bg-purple-500
                    rounded-full
                    animate-pulse
                    delay-500
                  "
                />

              </div>

            </div>
          )}

          {/* ==================================================
              💬 CHAT / AUTH SECTION
          ================================================== */}
          <div className="
            w-full
            h-full
            flex
            items-center
            justify-center
          ">

            {/* ==================================================
                🪟 MAIN GLASS CONTAINER
            ================================================== */}
            <div
              className={`
                w-full
                h-full
                ${
                  authUser
                    ? "max-w-6xl"
                    : "max-w-md"
                }

                rounded-2xl
                sm:rounded-3xl

                border
                border-white/10

                bg-white/5
                backdrop-blur-xl

                shadow-xl
                sm:shadow-2xl

                p-2
                sm:p-4

                overflow-hidden
              `}
            >

              {/* ==================================================
                  🛣️ ROUTES
              ================================================== */}
              <Routes>

                {/* ================= HOME ================= */}
                <Route
                  path="/"
                  element={
                    authUser
                      ? <ChatPage />
                      : <Navigate to="/login" />
                  }
                />

                {/* ================= LOGIN ================= */}
                <Route
                  path="/login"
                  element={
                    !authUser
                      ? <LoginPage />
                      : <Navigate to="/" />
                  }
                />

                {/* ================= SIGNUP ================= */}
                <Route
                  path="/signup"
                  element={
                    !authUser
                      ? <SignUpPage />
                      : <Navigate to="/" />
                  }
                />

                {/* ================= FORGOT PASSWORD ================= */}
                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />

                {/* ================= RESET PASSWORD ================= */}
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />

              </Routes>

            </div>

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
            background: "#0f172a",
            color: "#f8fafc",
            borderRadius: "12px",
            padding: "12px 16px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          },

        }}
      />

    </div>
  );
}

export default App;