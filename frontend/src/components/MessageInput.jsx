import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, X } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled } = useChatStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null); // ✅ fix
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return; // ✅ prevent crash

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

  return (
    <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      
      {/* Image Preview */}
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

      {/* Input Row */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-center gap-3"
      >
        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
          placeholder="Type your message..."
          className="flex-1 bg-slate-900/60 border border-white/10 rounded-full py-2 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full transition ${
            imagePreview
              ? "text-cyan-400 bg-cyan-500/10"
              : "text-slate-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;