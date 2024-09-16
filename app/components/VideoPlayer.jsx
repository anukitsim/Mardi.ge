import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = "auto", style, importance = "auto" }) => {
  const videoRef = useRef(null);
  let hls;

  const setupHls = () => {
    if (Hls.isSupported() && sources.hls) {
      hls = new Hls({
        lowLatencyMode: importance === "high", // Use low latency for the first video
        startLevel: -1, // Let HLS.js decide the start level based on network conditions
        maxMaxBufferLength: importance === "high" ? 60 : 30, // Increase buffer for smooth playback
        capLevelToPlayerSize: true, // Adjust video quality to player size
        autoStartLoad: true, // Start loading video immediately
        enableWorker: true, // Use Web Workers for parsing and decoding
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      // Ensure video plays when enough data is buffered
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.addEventListener('canplaythrough', () => {
          videoRef.current.play();
        });
      });

      // Immediately switch to the highest quality after video starts playing
      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (hls.autoLevelEnabled) {
          hls.currentLevel = hls.levels.length - 1; // Ensure maximum quality is loaded
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = sources.hls;
      videoRef.current.addEventListener('canplaythrough', () => {
        videoRef.current.play();
      });
    }
  };

  useEffect(() => {
    setupHls();
    return () => {
      if (hls) hls.destroy();
    };
  }, [sources, importance]);

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
