import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const { signup, isSigningUp } = useAuthStore();

  const checkPasswordStrength = (pass) => {
    setPasswordStrength({
      length: pass.length >= 6,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate("/")
  };

  const getStrengthColor = () => {
    const strength = Object.values(passwordStrength).filter(Boolean).length;
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    const strength = Object.values(passwordStrength).filter(Boolean).length;
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Fair";
    if (strength <= 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-3xl opacity-5"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 20, -20],
              x: [null, 20, -20, 20],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md z-10">
        
        <BorderAnimatedContainer>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl"
          >
            
            {/* Decorative Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8">
              
              {/* HEADER with Animation */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="flex justify-center items-center w-20 h-20 mx-auto mb-5 rounded-2xl 
                    bg-gradient-to-br from-cyan-500/30 to-purple-600/30 
                    shadow-lg backdrop-blur-sm border border-white/20"
                >
                  <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
                </motion.div>

                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Account
                </h2>

                <p className="text-slate-400 text-sm mt-3 flex items-center justify-center gap-2">
                  <SparklesIcon className="w-3 h-3 text-cyan-400" />
                  Join us and start chatting instantly
                  <SparklesIcon className="w-3 h-3 text-cyan-400" />
                </p>
              </motion.div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* FULL NAME FIELD */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-slate-300 font-medium flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-cyan-400" />
                    Full Name
                  </label>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl 
                        bg-white/10 border border-white/20 text-white 
                        placeholder:text-slate-500 
                        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                        focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* EMAIL FIELD */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-slate-300 font-medium flex items-center gap-2">
                    <MailIcon className="w-4 h-4 text-cyan-400" />
                    Email Address
                  </label>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative">
                      <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl 
                        bg-white/10 border border-white/20 text-white 
                        placeholder:text-slate-500 
                        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                        focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* PASSWORD FIELD */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-slate-300 font-medium flex items-center gap-2">
                    <LockIcon className="w-4 h-4 text-cyan-400" />
                    Password
                  </label>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl 
                        bg-white/10 border border-white/20 text-white 
                        placeholder:text-slate-500 
                        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                        focus:border-transparent transition-all duration-300"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 rounded-full ${getStrengthColor()}`}
                            style={{ width: `${(Object.values(passwordStrength).filter(Boolean).length / 4) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs ml-2 font-medium ${
                          getStrengthColor().replace('bg-', 'text-')
                        }`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <p className={`flex items-center gap-1.5 ${passwordStrength.length ? 'text-green-400' : 'text-slate-500'}`}>
                          {passwordStrength.length ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
                          Min 6 characters
                        </p>
                        <p className={`flex items-center gap-1.5 ${passwordStrength.uppercase ? 'text-green-400' : 'text-slate-500'}`}>
                          {passwordStrength.uppercase ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
                          Uppercase letter
                        </p>
                        <p className={`flex items-center gap-1.5 ${passwordStrength.lowercase ? 'text-green-400' : 'text-slate-500'}`}>
                          {passwordStrength.lowercase ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
                          Lowercase letter
                        </p>
                        <p className={`flex items-center gap-1.5 ${passwordStrength.number ? 'text-green-400' : 'text-slate-500'}`}>
                          {passwordStrength.number ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
                          Number
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* SIGNUP BUTTON */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSigningUp}
                    className="relative w-full py-3.5 rounded-xl 
                    bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
                    text-white font-semibold shadow-lg hover:shadow-cyan-500/30 
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSigningUp ? (
                        <>
                          <LoaderIcon className="w-5 h-5 animate-spin" />
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircleIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          <span>Create Account</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                </motion.div>
              </form>

              {/* DIVIDER */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-3 my-8"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-xs text-slate-500">or continue with</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </motion.div>

              {/* LOGIN LINK */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <p className="text-slate-400 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors relative group"
                  >
                    Sign in
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </p>
              </motion.div>

            </div>
          </motion.div>
        </BorderAnimatedContainer>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-slate-500 text-xs mt-6"
        >
          By signing up, you agree to our Terms of Service
        </motion.p>
      </div>
    </div>
  );
}

export default SignUpPage;