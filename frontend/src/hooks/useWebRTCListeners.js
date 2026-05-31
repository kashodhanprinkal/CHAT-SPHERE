import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import useCallStore from '../store/useCallStore';

const useWebRTCListeners = () => {
  const socket = useAuthStore((state) => state.socket);
  const handleOffer = useCallStore((state) => state.handleOffer);
  const handleAnswer = useCallStore((state) => state.handleAnswer);
  const handleICECandidate = useCallStore((state) => state.handleICECandidate);

  useEffect(() => {
    if (!socket) return;

    socket.on("offer", ({ offer, senderId }) => {
      console.log("📡 Received offer from:", senderId);
      handleOffer(offer, senderId);
    });

    socket.on("answer", ({ answer }) => {
      console.log("📡 Received answer");
      handleAnswer(answer);
    });

    socket.on("ice-candidate", ({ candidate }) => {
      console.log("🧊 Received ICE candidate");
      handleICECandidate(candidate);
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [socket, handleOffer, handleAnswer, handleICECandidate]);
};

export default useWebRTCListeners;