import { useEffect, useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import VoiceRecorder from "./VoiceRecorder";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, X } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();

  // ✅ Chat store
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();

  // ✅ Auth store (SOCKET IS HERE)
  const { authUser, socket } = useAuthStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // =========================
  // 📤 SEND MESSAGE
  // =========================
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    // 🔥 STOP TYPING immediately
    if (socket && selectedUser?._id) {
      socket.emit("stop-typing", {
        receiverId: selectedUser._id,
      });
    }

    setText("");
    setImagePreview(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // =========================
  // 🖼 IMAGE HANDLER
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // =========================
  // ⌨️ TYPING HANDLER
  // =========================
  const handleTyping = (e) => {
    setText(e.target.value);

    if (isSoundEnabled) playRandomKeyStrokeSound();

    if (!socket || !selectedUser?._id) return;

    // 🔥 EMIT TYPING
    socket.emit("typing", {
      receiverId: selectedUser._id,
      senderName: authUser.fullName,
    });

    // clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 🔥 AUTO STOP AFTER 1 SEC
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", {
        receiverId: selectedUser._id,
      });
    }, 1000);
  };

  // =========================
  // 🧹 CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">

      {/* 🖼 IMAGE PREVIEW */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-white/10"
            />

            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 💬 INPUT ROW */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-center gap-3"
      >
        {/* TEXT INPUT */}
        <input
          type="text"
          value={text}
          onChange={handleTyping}
          placeholder="Type your message..."
          className="flex-1 bg-black/40 border border-white/10 rounded-full py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* IMAGE BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full transition ${
            imagePreview
              ? "text-gray-300 bg-white/10"
              : "text-gray-500 hover:text-white hover:bg-white/10"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <VoiceRecorder receiverId={selectedUser?._id} />

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;