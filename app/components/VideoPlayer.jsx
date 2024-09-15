import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = 'auto', style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && sources.hls) {
      const hls = new Hls({
        lowLatencyMode: true,         // Prioritize low latency for faster startup
        maxMaxBufferLength: 60,       // Increase buffer size to handle transitions better
        startLevel: -1,               // Start at the highest possible quality
        autoStartLoad: true,          // Start preloading as soon as the component mounts
        liveSyncDurationCount: 2,     // Ensure minimal delay in video transitions
        enableWorker: true,           // Use web workers to offload processing
        maxBufferLength: 30,          // Keep the buffer manageable but high enough for smooth playback
        debug: false,                 // Disable debug logs
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
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
