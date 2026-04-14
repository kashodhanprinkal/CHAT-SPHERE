import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />

      {/* Gradient Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 blur-[140px] rounded-full" />

      {/* Main Center Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6">
        <div
          className={`w-full ${
            authUser ? "max-w-7xl" : "max-w-6xl"
          } mx-auto grid ${
            !authUser ? "lg:grid-cols-2" : "grid-cols-1"
          } gap-10 items-center justify-center`}
        >
          {/* Left Branding Section */}
          {!authUser && (
            <div className="hidden lg:flex flex-col justify-center space-y-6 px-6">
              <h1 className="text-5xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  ChatSphere
                </span>
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                Connect instantly, chat seamlessly, and experience a beautifully
                designed real-time messaging platform.
              </p>

              <div className="flex gap-4 mt-6">
                <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse delay-200" />
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-500" />
              </div>
            </div>
          )}

          {/* Auth / Chat Section */}
          <div className="w-full flex items-center justify-center">
            <div
              className={`w-full ${
                authUser ? "max-w-5xl" : "max-w-md"
              } mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl`}
            >
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
              </Routes>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            borderRadius: "14px",
            padding: "14px 20px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#f8fafc",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f8fafc",
            },
          },
        }}
      />
    </div>
  );
}

export default App;