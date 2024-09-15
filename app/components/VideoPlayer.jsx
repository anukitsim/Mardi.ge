import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = "auto", style }) => {
  const videoRef = useRef(null);
  let hls;

  const setupHls = () => {
    if (Hls.isSupported() && sources.hls) {
      hls = new Hls({
        lowLatencyMode: true,  // Improve latency for faster response
        startLevel: 1,  // Start with a middle quality to balance speed/quality
        maxMaxBufferLength: 10,  // Max buffer length for quicker load
        liveSyncDuration: 1.5,  // Helps reduce startup latency for live videos
        maxBufferLength: 10,  // Keep buffer short to avoid long load times
        capLevelToPlayerSize: true,  // Ensure video quality matches screen size
        autoStartLoad: true,
        enableWorker: true,  // Offload video processing to web workers
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
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
