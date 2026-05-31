// hooks/useWebRTC.js

import { useRef } from "react";
import useCallStore from "../store/useCallStore";
import { useAuthStore } from "../store/useAuthStore";

const useWebRTC = () => {
  // peer connection
  const peerConnection = useRef(null);

  // remote stream
  const remoteStream = useRef(new MediaStream());

  // socket
  const socket = useAuthStore((state) => state.socket);

  // call store
  const {
    receiverId,
    setLocalStream,
    setRemoteStream,
  } = useCallStore();

  // get camera/mic
  const getMediaStream = async (callType = "video") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callType === "video",
      });

      setLocalStream(stream);

      return stream;
    } catch (error) {
      console.log("Media access error:", error);
    }
  };

  // create peer connection
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peerConnection.current = pc;

    // send ice candidates
    pc.onicecandidate = (event) => {
      if (!event.candidate) return;

      socket.emit("ice-candidate", {
        receiverId,
        candidate: event.candidate,
      });
    };

    // receive remote stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });

      setRemoteStream(remoteStream.current);
    };

    return pc;
  };

  // caller creates offer
  const createOffer = async (receiverId, callType = "video") => {
    const pc = createPeerConnection();

    const stream = await getMediaStream(callType);

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);

    socket.emit("offer", {
      receiverId,
      offer,
    });
  };

  // receiver handles offer
  const handleOffer = async ({ offer, senderId }) => {
    const pc = createPeerConnection();

    const stream = await getMediaStream("video");

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    await pc.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await pc.createAnswer();

    await pc.setLocalDescription(answer);

    socket.emit("answer", {
      receiverId: senderId,
      answer,
    });
  };

  // caller handles answer
  const handleAnswer = async ({ answer }) => {
    if (!peerConnection.current) return;

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  // handle ice candidate
  const handleIceCandidate = async ({ candidate }) => {
    if (!peerConnection.current) return;

    await peerConnection.current.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  };

  return {
    peerConnection,
    createPeerConnection,
    getMediaStream,
    createOffer,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
  };
};

export default useWebRTC;