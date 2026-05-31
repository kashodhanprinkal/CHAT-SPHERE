import useCallStore from "../store/useCallStore";
import { Phone, X } from "lucide-react";

const IncomingCallModal = () => {
  const { isRinging, incomingCall, acceptCall, rejectCall, callType } = useCallStore();
  
  // Debug log
  console.log("Modal render - isRinging:", isRinging, "incomingCall:", !!incomingCall);
  
  if (!isRinging || !incomingCall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl p-6 w-80 text-center border border-white/10 shadow-2xl">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full animate-ping bg-green-500/20"></div>
          <img
            src={incomingCall.caller?.profilePic || "/avatar.png"}
            alt={incomingCall.caller?.fullName}
            className="w-24 h-24 rounded-full mx-auto border-4 border-purple-500 object-cover relative z-10"
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {incomingCall.caller?.fullName}
        </h3>
        <p className="text-slate-400 mb-2">
          is calling you for{" "}
          <span className="text-purple-400 font-semibold">
            {callType === "video" ? "Video Call" : "Audio Call"}
          </span>
        </p>
        
        <p className="text-xs text-green-400 mb-4 animate-pulse">
          📞 Ringing...
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={acceptCall}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all hover:scale-110"
          >
            <Phone className="w-6 h-6" />
          </button>
          <button
            onClick={rejectCall}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;