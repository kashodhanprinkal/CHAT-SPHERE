import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import useCallStore from '../store/useCallStore';

const useCallListeners = () => {
  const socket = useAuthStore((state) => state.socket);
  const setIncomingCall = useCallStore((state) => state.setIncomingCall);
  const endCall = useCallStore((state) => state.endCall);
  const cleanupCall = useCallStore((state) => state.cleanupCall);

  useEffect(() => {
    if (!socket) return;

    socket.on("incoming-call", (data) => {
      console.log("📞 INCOMING CALL from:", data.caller?.fullName);
      setIncomingCall(data);
    });

    socket.on("call-rejected", () => {
      console.log("❌ Call rejected");
      alert("Call was rejected");
      cleanupCall();
    });

    socket.on("call-ended", () => {
      console.log("📴 Call ended");
      alert("Call ended");
      cleanupCall();
    });

    socket.on("user-offline", ({ message }) => {
      console.log("⚠️", message);
      alert(message);
      cleanupCall();
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-rejected");
      socket.off("call-ended");
      socket.off("user-offline");
    };
  }, [socket, setIncomingCall, cleanupCall]);
};

export default useCallListeners;