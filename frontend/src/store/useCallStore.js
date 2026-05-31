import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ]
};

const useCallStore = create((set, get) => ({
  // State
  isRinging: false,
  isCalling: false,
  incomingCall: null,
  callType: null,
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  receiverId: null,
  isMuted: false,
  isCameraOff: false,

  // Setters
  setCallType: (type) => {
    console.log("📞 Call type set:", type);
    set({ callType: type });
  },

  setReceiverId: (id) => {
    console.log("👤 Receiver ID set:", id);
    set({ receiverId: id });
  },

  setIncomingCall: (callData) => {
    console.log("📞 Incoming call set:", callData.caller?.fullName);
    set({
      incomingCall: callData,
      isRinging: true,
      isCalling: false,
      callType: callData.callType
    });
  },

  // Start a call (caller)
  startCall: async (callData) => {
    console.log("Starting call to:", callData.receiverId);
    
    // Stop existing stream if any
    const { localStream: existingStream } = get();
    if (existingStream) {
      console.log("Stopping existing local stream");
      existingStream.getTracks().forEach(track => track.stop());
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callData.callType === 'video',
        audio: true
      });
      
      set({
        localStream: stream,
        isCalling: true,
        isRinging: false,
        callType: callData.callType,
        receiverId: callData.receiverId
      });
      
      const pc = new RTCPeerConnection(configuration);
      
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });
      
      pc.ontrack = (event) => {
        console.log("Received remote stream");
        set({ remoteStream: event.streams[0] });
      };
      
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const socket = useAuthStore.getState().socket;
          socket.emit("ice-candidate", {
            receiverId: callData.receiverId,
            candidate: event.candidate
          });
        }
      };
      
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      const socket = useAuthStore.getState().socket;
      socket.emit("offer", {
        receiverId: callData.receiverId,
        offer: pc.localDescription
      });
      
      set({ peerConnection: pc });
      
    } catch (error) {
      console.error("Error starting call:", error);
      alert("Cannot access camera/microphone. Please check permissions.");
      get().endCall();
    }
  },

  // Accept call (receiver)
  acceptCall: async () => {
    console.log("Accepting call...");
    const { incomingCall, callType, localStream: existingStream } = get();
    
    if (!incomingCall) return;
    
    // Stop existing stream if any
    if (existingStream) {
      console.log("Stopping existing local stream");
      existingStream.getTracks().forEach(track => track.stop());
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callType === 'video',
        audio: true
      });
      
      console.log("✅ Got local stream for accepting call");
      
      set({
        localStream: stream,
        isCalling: true,
        isRinging: false,
        callType: callType,
        receiverId: incomingCall.caller._id
      });
      
      const pc = new RTCPeerConnection(configuration);
      
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });
      
      pc.ontrack = (event) => {
        console.log("Received remote stream");
        set({ remoteStream: event.streams[0] });
      };
      
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const socket = useAuthStore.getState().socket;
          socket.emit("ice-candidate", {
            receiverId: incomingCall.caller._id,
            candidate: event.candidate
          });
        }
      };
      
      set({ peerConnection: pc });
      
      const socket = useAuthStore.getState().socket;
      socket.emit("accept-call", {
        receiverId: incomingCall.caller._id
      });
      
      set({ incomingCall: null });
      
    } catch (error) {
      console.error("Error accepting call:", error);
      alert("Cannot access camera/microphone. Please close other apps and try again.");
      get().endCall();
    }
  },

  handleOffer: async (offer, senderId) => {
    console.log("Handling offer from:", senderId);
    const { peerConnection, isCalling } = get();
    
    if (!peerConnection || !isCalling) return;
    
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      const socket = useAuthStore.getState().socket;
      socket.emit("answer", {
        receiverId: senderId,
        answer: peerConnection.localDescription
      });
      
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  },

  handleAnswer: async (answer) => {
    console.log("Handling answer");
    const { peerConnection } = get();
    
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Call connected!");
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    }
  },

  handleICECandidate: async (candidate) => {
    const { peerConnection } = get();
    if (peerConnection) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    }
  },

  rejectCall: () => {
    console.log("Rejecting call");
    const { incomingCall } = get();
    const socket = useAuthStore.getState().socket;
    
    if (incomingCall) {
      socket.emit("reject-call", {
        receiverId: incomingCall.caller._id
      });
    }
    
    get().cleanupCall();
  },

  endCall: () => {
    console.log("Ending call");
    const { peerConnection, localStream, remoteStream, receiverId } = get();
    
    if (peerConnection) {
      peerConnection.close();
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    
    const socket = useAuthStore.getState().socket;
    if (receiverId) {
      socket.emit("end-call", { receiverId });
    }
    
    set({
      isRinging: false,
      isCalling: false,
      incomingCall: null,
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      receiverId: null,
      callType: null,
      isMuted: false,
      isCameraOff: false
    });
  },

  cleanupCall: () => {
    const { peerConnection, localStream, remoteStream } = get();
    
    if (peerConnection) peerConnection.close();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    if (remoteStream) remoteStream.getTracks().forEach(track => track.stop());
    
    set({
      isRinging: false,
      isCalling: false,
      incomingCall: null,
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      receiverId: null,
      callType: null,
      isMuted: false,
      isCameraOff: false
    });
  },

  toggleMute: () => {
    const { localStream, isMuted } = get();
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        set({ isMuted: !isMuted });
      }
    }
  },

  toggleCamera: () => {
    const { localStream, isCameraOff } = get();
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isCameraOff;
        set({ isCameraOff: !isCameraOff });
      }
    }
  }
}));

export default useCallStore;