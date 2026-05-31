import { useEffect, useRef } from "react";
import useCallStore from "../store/useCallStore";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

const CallScreen = () => {
  const {
    isCalling,
    localStream,
    remoteStream,
    callType,
    isMuted,
    isCameraOff,
    toggleMute,
    toggleCamera,
    endCall
  } = useCallStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (callType === "video" && remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (callType === "audio" && remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, callType]);

  if (!isCalling) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {callType === "video" && (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      )}

      {callType === "audio" && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <PhoneOff className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Voice Call</h3>
            <p className="text-slate-400">Call in progress...</p>
          </div>
          <audio ref={remoteAudioRef} autoPlay playsInline />
        </div>
      )}

      {callType === "video" && localStream && (
        <div className="absolute bottom-4 right-4 w-32 h-48 sm:w-48 sm:h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-xl">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">You</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 sm:gap-6">
        <button
          onClick={toggleMute}
          className={`p-3 sm:p-4 rounded-full transition-all hover:scale-110 ${
            isMuted ? "bg-red-500" : "bg-slate-700"
          }`}
        >
          {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>

        {callType === "video" && (
          <button
            onClick={toggleCamera}
            className={`p-3 sm:p-4 rounded-full transition-all hover:scale-110 ${
              isCameraOff ? "bg-red-500" : "bg-slate-700"
            }`}
          >
            {isCameraOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
        )}

        <button
          onClick={endCall}
          className="bg-red-500 hover:bg-red-600 p-3 sm:p-4 rounded-full transition-all hover:scale-110"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CallScreen;