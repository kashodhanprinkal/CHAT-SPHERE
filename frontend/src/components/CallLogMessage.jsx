import React from "react";
import { Phone, PhoneOff, Video, VideoOff, PhoneMissed } from "lucide-react";

const CallLogMessage = ({ callLog, isOwn }) => {
  const getCallIcon = () => {
    if (callLog.callType === "video") {
      return callLog.status === "missed" ? (
        <VideoOff className="w-5 h-5" />
      ) : (
        <Video className="w-5 h-5" />
      );
    } else {
      return callLog.status === "missed" ? (
        <PhoneOff className="w-5 h-5" />
      ) : (
        <Phone className="w-5 h-5" />
      );
    }
  };

  const getStatusText = () => {
    if (callLog.status === "missed") {
      return isOwn ? "Missed call from you" : "Missed call";
    } else if (callLog.status === "incoming") {
      return "Incoming call";
    } else if (callLog.status === "outgoing") {
      return "Outgoing call";
    } else if (callLog.status === "ended") {
      return "Call ended";
    }
    return "Call";
  };

  const getDurationText = () => {
    if (callLog.duration && callLog.duration > 0) {
      const minutes = Math.floor(callLog.duration / 60);
      const seconds = callLog.duration % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    return null;
  };

  return (
    <div className="flex justify-center my-2">
      <div className="bg-slate-700/50 rounded-full px-4 py-2 flex items-center gap-2">
        <div className={`${callLog.status === "missed" ? "text-red-400" : "text-cyan-400"}`}>
          {getCallIcon()}
        </div>
        <span className="text-slate-300 text-sm">
          {getStatusText()}
          {getDurationText() && (
            <span className="text-slate-400 text-xs ml-2">
              ({getDurationText()})
            </span>
          )}
        </span>
        <span className="text-slate-500 text-xs">
          {new Date(callLog.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default CallLogMessage;