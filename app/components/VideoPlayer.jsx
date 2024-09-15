import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = "auto", style }) => {
  const videoRef = useRef(null);
  let hls;

  const setupHls = () => {
    if (Hls.isSupported() && sources.hls) {
      hls = new Hls({
        lowLatencyMode: true, // Reduce latency for faster load
        startLevel: -1, // Start with automatic quality level but quickly scale to max quality
        maxMaxBufferLength: 60, // Increase buffer length to avoid frequent quality changes
        capLevelToPlayerSize: false, // Allow playing the highest possible quality, even if the screen is small
        autoStartLoad: true, // Start loading immediately
        enableWorker: true, // Use Web Workers for smooth experience
        // Ensure level capping is disabled if you want higher quality regardless of screen size
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      // Immediately switch to the highest quality after video starts playing
      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (hls.autoLevelEnabled) {
          hls.currentLevel = hls.levels.length - 1; // Switch to the highest available quality
        }
      });

      // Log the current quality level
      hls.on(Hls.Events.LEVEL_SWITCHED, () => {
        const currentLevel = hls.currentLevel;
        const levels = hls.levels;

        if (levels && levels[currentLevel]) {
          console.log(`Current Quality Level: ${levels[currentLevel].height}p`);
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = sources.hls;
    }
  };

  useEffect(() => {
    setupHls();
    return () => {
      if (hls) hls.destroy();
    };
  }, [sources]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
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
