import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SettingsMenu from "./SettingsMenu";

function ProfileHeader() {
  const { authUser, updateProfile, onlineUsers } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const isOnline = onlineUsers?.includes(authUser?._id);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-4 md:p-6 border-b border-[#2a2a2a] bg-[#1a1a1a]">
      <div className="flex items-center justify-between">
        
        {/* LEFT - Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <button
              className="size-12 rounded-full overflow-hidden relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h3 className="text-gray-100 font-semibold text-base">
              {authUser?.fullName}
            </h3>
            <p className={`text-xs ${isOnline ? "text-emerald-400" : "text-gray-500"}`}>
              {isOnline ? "● Online" : "○ Offline"}
            </p>
          </div>
        </div>

        {/* RIGHT - Settings Menu */}
        <SettingsMenu />
      </div>
    </div>
  );
}

export default ProfileHeader;