import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { XIcon } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // ✅ Prevent crash
  if (!selectedUser) return null;

  // ✅ Online status
  const isOnline = onlineUsers?.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 px-6 py-3">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        
        {/* Avatar */}
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
            />
          </div>
        </div>

        {/* Name + Status */}
        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser?.fullName}
          </h3>

          <p
            className={`text-sm ${
              isOnline ? "text-green-400" : "text-slate-400"
            }`}
          >
            {isOnline ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}

export default ChatHeader;