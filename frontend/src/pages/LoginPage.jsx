import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-[#0f172a]">
      <div className="w-full max-w-md">

        <BorderAnimatedContainer>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden 
            backdrop-blur-2xl bg-white/10 border border-white/20 
            shadow-[0_0_40px_rgba(0,255,255,0.1)] p-8"
          >

            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-xl 
                bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg">
                <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>

              <p className="text-slate-400 text-sm mt-2">
                Jump back into your conversations 💬
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Email
                </label>

                <div className="relative group">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition" />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 text-white 
                    placeholder:text-slate-500 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/40 
                    focus:border-cyan-400 transition-all duration-300"
                    placeholder="johndoe@gmail.com"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Password
                </label>

                <div className="relative group">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition" />

                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg 
                    bg-white/5 border border-white/10 text-white 
                    placeholder:text-slate-500 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/40 
                    focus:border-cyan-400 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl 
                bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 
                hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 
                transition-all duration-300 font-semibold text-white 
                shadow-lg hover:shadow-cyan-500/30 
                active:scale-[0.97] relative overflow-hidden"
              >
                {isLoggingIn ? (
                  <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-slate-500">OR</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* SIGNUP */}
            <div className="text-center">
              <Link
                to="/signup"
                className="text-slate-400 hover:text-cyan-400 transition text-sm tracking-wide"
              >
                Don’t have an account?{" "}
                <span className="underline">Sign up</span>
              </Link>
            </div>

          </motion.div>
        </BorderAnimatedContainer>

      </div>
    </div>
  );
}

export default LoginPage;