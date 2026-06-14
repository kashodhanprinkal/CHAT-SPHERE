import React from "react";
import { MessageSquareText, Users, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function NoConversationPlaceHolder() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full min-h-[500px] px-6 text-center"
    >
      
      {/* Animated Glowing Icon Circle */}
      <div className="relative mb-6">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-2xl scale-150"
        />
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
          <MessageSquareText className="w-12 h-12 text-cyan-400" />
        </div>
      </div>

      {/* Heading with Gradient */}
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3"
      >
        No Conversation Selected
      </motion.h2>

      {/* Subtitle */}
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 max-w-md leading-relaxed text-sm"
      >
        Choose a contact or open an existing chat to start messaging in ChatSphere.
      </motion.p>

      {/* Tips Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 max-w-sm"
      >
        <div className="flex items-center gap-2 justify-center mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-slate-300 font-medium">Getting Started</span>
        </div>
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            <span>Click on any contact in the sidebar</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            <span>Search for users by name or email</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
            <span>Start video or audio calls instantly</span>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 group"
        onClick={() => {
          // Focus on search input or open contacts
          const searchInput = document.querySelector('input[placeholder*="Search"]');
          if (searchInput) {
            searchInput.focus();
          }
        }}
      >
        <Users className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Browse Contacts
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Animated Dots */}
      <div className="flex gap-3 mt-8">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 animate-bounce delay-100" />
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 animate-bounce delay-200" />
      </div>
    </motion.div>
  );
}

export default NoConversationPlaceHolder;