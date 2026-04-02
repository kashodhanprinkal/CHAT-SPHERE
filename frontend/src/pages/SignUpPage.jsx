import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-5xl">
        <BorderAnimatedContainer>
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-slate-700/40 shadow-2xl">
            {/* LEFT SIDE */}
            <div className="md:w-1/2 p-10 border-b md:border-b-0 md:border-r border-slate-700/40">
              <div className="max-w-md mx-auto">
                {/* HEADING */}
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center w-14 h-14 mx-auto mb-4 rounded-xl bg-cyan-500/10">
                    <MessageCircleIcon className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Join us and start chatting instantly 🚀
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (OPTIONAL DESIGN PANEL) */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <p className="text-slate-400 text-sm px-10 text-center">
                Connect with people in real-time. Share moments. Build
                conversations.
              </p>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
