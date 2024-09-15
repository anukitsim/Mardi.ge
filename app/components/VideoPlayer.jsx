import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ sources, className, autoPlay = true, muted = true, loop = true, preload = "auto", style }) => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  let hls;

  const setupHls = () => {
    if (Hls.isSupported() && sources.hls) {
      hls = new Hls({
        lowLatencyMode: true,
        maxMaxBufferLength: 120,
        startLevel: 0,
        capLevelToPlayerSize: true,
        autoStartLoad: true,
        enableWorker: true,
        maxBufferLength: 60,
        maxAutoLevelCapping: -1,
        debug: false,
      });

      hls.loadSource(sources.hls);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
        hls.currentLevel = hls.levels.length - 1;
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
          hls.currentLevel = Math.max(hls.currentLevel - 1, 0);
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = sources.hls;
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setupHls();
        observerRef.current.disconnect();
      }
    }, { threshold: 0.25 });

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
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
      playsInline
    >
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
