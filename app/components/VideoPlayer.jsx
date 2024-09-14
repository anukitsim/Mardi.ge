"use client"

import { useRef, useEffect } from "react";

function VideoPlayer({ sources, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [sources]);

  return (
    <video ref={videoRef} {...props} preload="auto" playsInline muted>
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
