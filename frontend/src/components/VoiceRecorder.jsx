import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

function VoiceRecorder({ receiverId }) {
  const { sendMessage } = useChatStore();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  // ================= TIMER =================
  const startTimer = () => {
    setRecordTime(0);

    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setRecordTime(0);
  };

  // ================= START =================
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();

      setIsRecording(true);
      startTimer();

    } catch (error) {
      toast.error("Microphone access denied");
    }
  };

  // ================= STOP =================
  const stopRecording = () => {
    return new Promise((resolve) => {
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        resolve(audioBlob);
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    });
  };

  // ================= UPLOAD =================
  const uploadVoice = async (audioBlob) => {
    const formData = new FormData();
    formData.append("voice", audioBlob);

    const res = await fetch("http://localhost:3000/api/upload/voice", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.voiceUrl;
  };

  // ================= SEND =================
  const handleSend = async () => {
    const audioBlob = await stopRecording();

    const voiceUrl = await uploadVoice(audioBlob);

    sendMessage({
      voiceUrl,
      voiceDuration: recordTime,
    });
  };

  // ================= CANCEL =================
  const cancelRecording = () => {
    mediaRecorderRef.current.stop();
    audioChunksRef.current = [];

    setIsRecording(false);
    stopTimer();

    toast.error("Recording cancelled");
  };

  // ================= UI =================
  return (
    <div className="flex items-center gap-3">

      {!isRecording ? (
        <button
          onMouseDown={startRecording}
          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          🎤
        </button>
      ) : (
        <>
          {/* TIMER */}
          <span className="text-red-500 font-semibold animate-pulse">
            🔴 {recordTime}s
          </span>

          {/* CANCEL */}
          <button
            onClick={cancelRecording}
            className="p-2 rounded-full bg-gray-700 text-white hover:bg-red-500"
          >
            ✖
          </button>

          {/* SEND */}
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-red-500 text-white animate-bounce"
          >
            ⏹
          </button>
        </>
      )}

    </div>
  );
}

export default VoiceRecorder;