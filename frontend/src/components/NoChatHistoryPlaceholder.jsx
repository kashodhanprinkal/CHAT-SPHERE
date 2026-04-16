import React from "react";
import { Clock3 } from "lucide-react";

function NoChatHistoryPlaceholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 text-center">
      
      {/* Glow icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl scale-150" />
        <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <Clock3 className="size-10 text-cyan-400" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-2">
        No Messages Yet
      </h2>

      {/* Subtitle */}
      <p className="text-slate-400 max-w-md leading-relaxed">
        {name
          ? `Start your first conversation with ${name}.`
          : "This conversation is empty for now. Send your first message and start the chat."}
      </p>

      {/* Animated dots */}
      <div className="flex gap-3 mt-8">
        <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse delay-200" />
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse delay-500" />
      </div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;