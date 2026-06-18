import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MailIcon, LoaderIcon, ArrowLeftIcon, SendIcon, KeyRoundIcon } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        `/auth/forgot-password`,
        { email }
      );

      toast.success("Reset link sent to your registered email");
      console.log("Reset URL:", res.data.resetUrl);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-3xl opacity-5"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 mb-6 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Login</span>
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8">
            
            {/* Icon & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg mb-5"
              >
                <KeyRoundIcon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Forgot Password?
              </h2>
              
              <p className="text-slate-400 text-sm">
                No worries! Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-slate-300 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <LoaderIcon className="animate-spin w-5 h-5" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-transparent text-slate-500">or</span>
                </div>
              </div>

              {/* Login Link */}
              <p className="text-center text-slate-400 text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-xs mt-6"
        >
          We'll send a password reset link to your email
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;