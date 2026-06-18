import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import useCallStore from "../store/useCallStore";
import { XIcon, Phone, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatHeader() {
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const socket = useAuthStore((state) => state.socket);
  
  // Get functions from store
  const startCall = useCallStore((state) => state.startCall);
  const setReceiverId = useCallStore((state) => state.setReceiverId);
  const setCallType = useCallStore((state) => state.setCallType);
  const isCalling = useCallStore((state) => state.isCalling);

  // Debug: Check if functions exist
  useEffect(() => {
    console.log("Store functions check:");
    console.log("  startCall:", typeof startCall);
    console.log("  setReceiverId:", typeof setReceiverId);
    console.log("  setCallType:", typeof setCallType);
    console.log("  isCalling:", isCalling);
  }, [startCall, setReceiverId, setCallType, isCalling]);

  const startAudioCall = () => {
    console.log("🎵 Audio call button clicked");
    
    if (!setReceiverId || !setCallType || !startCall) {
      console.error("Functions not ready yet");
      alert("Please wait, initializing...");
      return;
    }
    
    if (isCalling) {
      alert("Already in a call");
      return;
    }
    
    if (!socket) {
      alert("Connecting to server...");
      return;
    }
    
    if (!selectedUser || !authUser) return;

    console.log("Starting audio call to:", selectedUser.fullName);
    
    setReceiverId(selectedUser._id);
    setCallType("audio");

    startCall({
      receiverId: selectedUser._id,
      callType: "audio",
    });

    socket.emit("call-user", {
      receiverId: selectedUser._id,
      caller: {
        _id: authUser._id,
        fullName: authUser.fullName,
        profilePic: authUser.profilePic,
      },
      callType: "audio",
    });
  };

  const startVideoCall = () => {
    console.log("🎥 Video call button clicked");
    
    if (!setReceiverId || !setCallType || !startCall) {
      console.error("Functions not ready yet");
      alert("Please wait, initializing...");
      return;
    }
    
    if (isCalling) {
      alert("Already in a call");
      return;
    }
    
    if (!socket) {
      alert("Connecting to server...");
      return;
    }
    
    if (!selectedUser || !authUser) return;

    console.log("Starting video call to:", selectedUser.fullName);
    
    setReceiverId(selectedUser._id);
    setCallType("video");

    startCall({
      receiverId: selectedUser._id,
      callType: "video",
    });

    socket.emit("call-user", {
      receiverId: selectedUser._id,
      caller: {
        _id: authUser._id,
        fullName: authUser.fullName,
        profilePic: authUser.profilePic,
      },
      callType: "video",
    });
  };

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 px-6 py-3">
      <div className="flex items-center gap-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
          <p className={`text-sm ${isOnline ? "text-green-400" : "text-slate-400"}`}>
            {isOnline ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={startAudioCall}
          title="Audio Call"
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <Phone className="w-5 h-5 text-slate-300 hover:text-green-400 transition-colors" />
        </button>

        <button
          onClick={startVideoCall}
          title="Video Call"
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <Video className="w-5 h-5 text-slate-300 hover:text-blue-400 transition-colors" />
        </button>

        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;