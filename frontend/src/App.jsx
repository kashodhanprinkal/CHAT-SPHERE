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
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none 
        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
        bg-[size:25px_25px] sm:bg-[size:30px_30px]" 
      />

      {/* Gradient Glow (Responsive + Optimized) */}
      <div className="absolute top-10 left-5 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-pink-500/20 blur-[80px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-5 sm:right-20 w-40 sm:w-72 h-40 sm:h-72 bg-cyan-500/20 blur-[80px] sm:blur-[120px] rounded-full" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 blur-[100px] sm:blur-[140px] rounded-full" />

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-6 py-6">
        
        <div
          className={`w-full ${
            authUser ? "max-w-7xl" : "max-w-6xl"
          } mx-auto grid ${
            !authUser
              ? "md:grid-cols-2"
              : "grid-cols-1"
          } gap-6 sm:gap-10 items-center`}
        >

          {/* Left Branding */}
          {!authUser && (
            <div className="hidden md:flex flex-col justify-center space-y-5 px-2 sm:px-6">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  ChatSphere
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md">
                Connect instantly, chat seamlessly, and experience a beautifully
                designed real-time messaging platform.
              </p>

              <div className="flex gap-3 mt-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-500 rounded-full animate-pulse delay-200" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-pulse delay-500" />
              </div>
            </div>
          )}

          {/* Auth / Chat Section */}
          <div className="w-full flex items-center justify-center">
            <div
              className={`w-full ${
                authUser ? "max-w-5xl" : "max-w-md"
              } rounded-2xl sm:rounded-3xl border border-white/10 
              bg-white/5 backdrop-blur-xl shadow-xl sm:shadow-2xl 
              p-2 sm:p-4`}
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

      {/* Toast */}
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