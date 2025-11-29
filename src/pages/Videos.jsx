import React, { useEffect, useState } from "react";
import { FaHome, FaTimes, FaPlay } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ThreeDVideosJSON from "../components/jsonFiles/AllVideos.json";

const getYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
};

const LazyThumbnailCard = ({ video, index, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (video.poster) {
      setThumbnailUrl(video.poster);
    } else {
      const videoId = getYouTubeVideoId(video.src);
      if (videoId) {
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      }
    }
  }, [video]);

  const handleClick = () => {
    if (!video.src || video.src.trim() === "") {
      alert("Please check your internet connection and try again");
      return;
    }

    if (!video.src.includes("youtube.com") && !video.src.includes("youtu.be")) {
      alert("Please check your internet connection and try again");
      return;
    }

    onClick(index);
  };

  return (
    <div
      ref={ref}
      className="relative group overflow-hidden rounded-2xl shadow-2xl bg-[#0b0b14] border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300"
    >
      <div
        className="w-full aspect-video cursor-pointer relative"
        onClick={handleClick}
      >
        {inView && thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for video ${index + 1}`}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-purple-900/20 to-black flex items-center justify-center">
            <FaPlay className="text-purple-500 text-4xl opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-full bg-linear-to-br from-purple-900/20 to-black flex items-center justify-center">
            <FaPlay className="text-purple-500 text-4xl opacity-50" />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
      </div>
    </div>
  );
};

const ThreeDVideos = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("3D");
  const [videos, setVideos] = useState([]);
  const [expandedVideo, setExpandedVideo] = useState(null);

  useEffect(() => {
    const filteredVideos = ThreeDVideosJSON.filter(
      (vid) => vid.type === selectedType
    );
    setVideos(filteredVideos);
    setExpandedVideo(null);
  }, [selectedType]);

  const closeExpanded = () => setExpandedVideo(null);

  const currentVideo = expandedVideo !== null ? videos[expandedVideo] : null;

  return (
    <section className="relative min-h-screen w-screen bg-linear-to-br from-purple-900/90 via-black to-purple-900/90 pt-16 pb-20">
      <div className="absolute top-6 left-6 flex items-center text-white text-lg font-semibold z-50">
        <FaHome
          onClick={() => navigate("/home")}
          className="text-3xl hover:text-purple-300 cursor-pointer transition transform hover:scale-110"
        />
        <BsArrowRight className="mx-3 text-xl text-purple-300" />
        <span className="text-xl hover:text-purple-300 cursor-pointer">
          Videos
        </span>
        <BsArrowRight className="mx-3 text-xl text-purple-300" />
        <span className="text-xl text-purple-300 capitalize">
          {selectedType} Videos
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 mt-16 mb-12">
        <h2
          className="text-4xl sm:text-5xl font-bold text-white text-center mb-6 sm:mb-0"
          style={{ fontFamily: '"UnifrakturCook", cursive' }}
        >
          Discover the {selectedType === "3D" ? "3D Videos" : "Reels"}
        </h2>

        <div className="relative bg-[#1a1a2e] border border-purple-800 rounded-full p-1 flex text-white font-semibold shadow-lg transition-all">
          <div
            className={`absolute top-0 left-0 transition-all duration-300 ease-in-out rounded-full w-1/2 h-full ${
              selectedType === "3D"
                ? "bg-purple-600"
                : "translate-x-full bg-purple-600"
            }`}
          />
          <button
            onClick={() => setSelectedType("3D")}
            className={`relative z-10 px-4 py-2 rounded-full text-lg ${
              selectedType === "3D" ? "text-white" : "text-gray-400"
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setSelectedType("reel")}
            className={`relative z-10 pl-5 pr-2 py-2 rounded-full text-lg ${
              selectedType === "reel" ? "text-white" : "text-gray-400"
            }`}
          >
            Reels
          </button>
        </div>
      </div>

      <div className="container px-6">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <LazyThumbnailCard
                key={i}
                video={video}
                index={i}
                onClick={setExpandedVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl py-20">
            No videos found
          </div>
        )}
      </div>

      <AnimatePresence>
        {currentVideo && (
          <Motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeExpanded}
          >
            <Motion.button
              className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                closeExpanded();
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close"
            >
              <FaTimes />
            </Motion.button>

            <Motion.div
              className="relative w-full sm:h-[90vh] max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={currentVideo.src}
                title={`AURO video player ${expandedVideo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ThreeDVideos;
