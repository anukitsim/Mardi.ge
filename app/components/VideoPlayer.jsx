import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ 
  sources, 
  className, 
  autoPlay = true, 
  muted = true, 
  loop = true, 
  preload = "auto", 
  style, 
  importance = "auto" 
}) => {
  const videoRef = useRef(null);
  const hlsInstance = useRef(null);  // Use ref to hold HLS instance

  const setupHls = () => {
    if (Hls.isSupported() && sources.hls) {
      hlsInstance.current = new Hls({
        lowLatencyMode: importance === "high", // Use low latency for the first video
        startLevel: -1, // Let HLS.js decide the start level based on network conditions
        maxMaxBufferLength: importance === "high" ? 60 : 30, // Increase buffer for smooth playback
        capLevelToPlayerSize: true, // Adjust video quality to player size
        autoStartLoad: true, // Start loading video immediately
        enableWorker: true, // Use Web Workers for parsing and decoding
      });

      hlsInstance.current.loadSource(sources.hls);
      hlsInstance.current.attachMedia(videoRef.current);

      // Ensure video plays when enough data is buffered
      hlsInstance.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          videoRef.current.addEventListener('canplaythrough', handleCanPlay);
        }
      });

      // Immediately switch to the highest quality after video starts playing
      hlsInstance.current.on(Hls.Events.FRAG_LOADED, () => {
        if (hlsInstance.current && hlsInstance.current.autoLevelEnabled) {
          hlsInstance.current.currentLevel = hlsInstance.current.levels.length - 1; // Ensure maximum quality is loaded
        }
      });
    } else if (videoRef.current && videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for Safari
      videoRef.current.src = sources.hls;
      videoRef.current.addEventListener('canplaythrough', handleCanPlay);
    }
  };

  const handleCanPlay = () => {
    // Check if videoRef.current exists and can play the video
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.warn("Auto-play prevented: ", error);
      });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setupHls();
    }

    return () => {
      // Clean up HLS instance and event listeners when the component unmounts
      if (hlsInstance.current) {
        hlsInstance.current.destroy();
      }

      if (videoRef.current) {
        videoRef.current.removeEventListener('canplaythrough', handleCanPlay);
      }
    };
  }, [sources.hls, importance]);  // Depend on sources and importance

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={false} // Wait until the video is ready before playing
      muted={muted}
      loop={loop}
      preload={preload}
      style={style}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
