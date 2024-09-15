import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = 'auto', style }) => {
  const videoRef = useRef(null);
  let hls; // Declare hls variable outside of useEffect to make it accessible for cleanup

  useEffect(() => {
    // Check if HLS.js is supported in the user's browser
    if (Hls.isSupported() && sources.hls) {
      // Initialize HLS.js
      hls = new Hls({
        lowLatencyMode: true,  // Reduce latency for faster video startup
        maxMaxBufferLength: 120,  // Increase buffer to ensure smooth playback
        startLevel: 0,  // Start with the lowest quality stream initially
        capLevelToPlayerSize: false,  // Don't cap quality based on player size
        autoStartLoad: true,  // Begin loading as soon as the component mounts
        enableWorker: true,  // Use web workers for better performance
        maxBufferLength: 60,  // Keep enough buffer to avoid stalling
        maxAutoLevelCapping: -1,  // Let HLS.js switch to the highest available quality
        debug: false,  // Disable debug logs in production
      });

      // Load the video source into HLS
      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      // Automatically switch to the best available quality once the video starts playing
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
        hls.currentLevel = hls.levels.length - 1;  // Set to the highest quality once playback starts
      });

      // Handle errors, e.g., if buffering occurs
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR || data.details === Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE) {
          hls.currentLevel = Math.max(hls.currentLevel - 1, 0);  // Step down quality to avoid stalling
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for Safari (which supports HLS natively)
      videoRef.current.src = sources.hls;
    }

    // Cleanup HLS instance on unmount
    return () => {
      if (hls) {
        hls.destroy();
      }
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
      playsInline  // For mobile support
    >
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
