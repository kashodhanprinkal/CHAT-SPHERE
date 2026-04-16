import React from "react";

function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      {[...Array(6)].map((_, index) => {
        const isSender = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex ${
              isSender ? "justify-end" : "justify-start"
            } animate-pulse`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 space-y-3 ${
                isSender
                  ? "bg-cyan-500/20 rounded-br-none"
                  : "bg-slate-800 rounded-bl-none"
              }`}
            >
              {/* Optional image skeleton */}
              <div className="w-40 h-24 rounded-lg bg-slate-700/50" />

              {/* Text lines */}
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-slate-700/70" />
                <div className="h-4 w-24 rounded bg-slate-700/50" />
              </div>

              {/* Time */}
              <div className="h-3 w-12 rounded bg-slate-700/40 ml-auto" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton