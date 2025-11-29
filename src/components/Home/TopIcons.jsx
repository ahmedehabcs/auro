import React, { useState, useRef, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { TbMaximize, TbMaximizeOff } from "react-icons/tb";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

const TopIcons = ({ isFullscreen, setIsFullscreen }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && !isMuted && userInteracted) {
      audioRef.current.play().catch(console.warn);
    } else if (audioRef.current && isMuted) {
      audioRef.current.pause();
    }
  }, [isMuted, userInteracted]);

  const handleUserInteraction = () => setUserInteracted(true);
  const toggleMute = () => setIsMuted((prev) => !prev);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className="absolute top-4 right-7 flex gap-4 z-50 text-white"
      onClickCapture={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <audio ref={audioRef} loop src="/audio/relax.wav" volume={0.3} />

      <button
        onClick={toggleMute}
        className={`p-2 rounded-full bg-black/40 hover:bg-main transition-opacity duration-300 ${isFullscreen ? "opacity-0 -z-10" : "opacity-100 z-10"
          }`}
      >
        {isMuted ? <MdMusicOff size={20} /> : <MdMusicNote size={20} />}
      </button>

      <button
        onClick={() => window.location.reload()}
        className={`p-2 rounded-full bg-black/40 hover:bg-main transition-transform duration-300 ${isFullscreen ? "opacity-0 -z-10" : "opacity-100 z-10"
          } hover:rotate-180`}
      >
        <FaSyncAlt size={20} />
      </button>

      <button
        onClick={toggleFullscreen}
        className="p-2 rounded-full bg-black/40 hover:bg-main transition"
      >
        {isFullscreen ? <TbMaximizeOff size={20} /> : <TbMaximize size={20} />}
      </button>
    </div>
  );
};

export default TopIcons;
