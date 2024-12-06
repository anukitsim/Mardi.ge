// components/VideoPlayerWithRef.jsx
"use client";

import React, { forwardRef } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoPlayerWithRef = forwardRef((props, ref) => {
  return <VideoPlayer {...props} ref={ref} />;
});

export default VideoPlayerWithRef;
