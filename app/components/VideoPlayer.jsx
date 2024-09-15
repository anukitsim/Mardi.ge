import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = 'auto', style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && sources.hls) {
      const hls = new Hls({
        lowLatencyMode: true,         // Low latency for faster video startup
        maxMaxBufferLength: 120,      // Buffer enough data for smooth transitions
        startLevel: -1,               // Automatically start at the highest available quality
        capLevelToPlayerSize: false,  // Don't cap the quality based on player size
        maxBufferLength: 60,          // Increase buffer size to avoid buffering
        autoStartLoad: true,          // Start loading as soon as the component mounts
        enableWorker: true,           // Use web workers for better performance
        maxAutoLevelCapping: -1,      // Ensure the highest quality is prioritized
        debug: false,                 // Disable debug logs for production
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      // Event listener to force starting at the highest quality level (4K)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Play the video
        videoRef.current.play();

        // Force the highest available quality (e.g., 4K)
        hls.currentLevel = hls.levels.length - 1; // Start with highest level
      });

      // Handle errors: Allow fallback to lower quality if buffering issues occur
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR || data.details === Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE) {
          hls.currentLevel = Math.max(hls.currentLevel - 1, 0);  // Step down the quality to prevent interruptions
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = sources.hls;
    }
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
      playsInline  // For better mobile support
    >
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
