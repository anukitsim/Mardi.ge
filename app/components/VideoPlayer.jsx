// components/VideoPlayer.jsx

"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";

const VideoPlayer = forwardRef(
  (
    {
      sources,
      className,
      autoPlay = true,
      muted = true,
      loop = true,
      preload = "auto",
      style,
      importance = "auto",
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const hlsInstance = useRef(null);
    const hlsPreloaderRef = useRef(null); // Store preloader instance

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      preloadNextVideo: (nextSource) => {
        if (Hls.isSupported() && nextSource) {
          // Destroy any existing preloader
          if (hlsPreloaderRef.current) {
            hlsPreloaderRef.current.destroy();
            hlsPreloaderRef.current = null;
          }

          // Create a new HLS.js instance for preloading
          const hlsPreloader = new Hls({
            autoStartLoad: true, // Start loading immediately
            enableWorker: true,
            lowLatencyMode: false,
            maxBufferLength: 60, // Adjust as needed
            maxMaxBufferLength: 120,
            pLoader: function (config) {
              const loader = new Hls.DefaultConfig.loader(config);
              this.load = (context, config, callbacks) => {
                context.url = context.url.replace(/(\?|&)rnd=\d+/, '');
                loader.load(context, config, callbacks);
              };
              this.abort = () => {
                loader.abort();
              };
              this.destroy = () => {
                loader.destroy();
              };
            },
          });

          hlsPreloader.loadSource(nextSource);

          hlsPreloader.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS.js preloader error:", data);
            hlsPreloader.destroy();
            hlsPreloaderRef.current = null;
          });

          // Store the preloader instance
          hlsPreloaderRef.current = hlsPreloader;
        }
      },
    }));

    useEffect(() => {
      if (videoRef.current) {
        if (hlsInstance.current) {
          hlsInstance.current.destroy();
          hlsInstance.current = null;
        }

        if (Hls.isSupported() && sources.hls) {
          hlsInstance.current = new Hls({
            autoStartLoad: true,
            enableWorker: true,
            lowLatencyMode: false,
            maxBufferLength: 60,
            maxMaxBufferLength: 120,
            pLoader: function (config) {
              const loader = new Hls.DefaultConfig.loader(config);
              this.load = (context, config, callbacks) => {
                context.url = context.url.replace(/(\?|&)rnd=\d+/, '');
                loader.load(context, config, callbacks);
              };
              this.abort = () => {
                loader.abort();
              };
              this.destroy = () => {
                loader.destroy();
              };
            },
          });

          hlsInstance.current.loadSource(sources.hls);
          hlsInstance.current.attachMedia(videoRef.current);

          hlsInstance.current.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current
              .play()
              .catch((error) => {
                console.warn("Auto-play prevented: ", error);
              });
          });

          hlsInstance.current.on(Hls.Events.ERROR, function (event, data) {
            console.error("HLS.js error:", data);
          });
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
          // For Safari
          videoRef.current.src = sources.hls;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current
              .play()
              .catch((error) => {
                console.warn("Auto-play prevented: ", error);
              });
          });
        }
      }

      return () => {
        if (hlsInstance.current) {
          hlsInstance.current.destroy();
          hlsInstance.current = null;
        }
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.removeAttribute("src");
          videoRef.current.load();
        }
        // Destroy the preloader when the component unmounts
        if (hlsPreloaderRef.current) {
          hlsPreloaderRef.current.destroy();
          hlsPreloaderRef.current = null;
        }
      };
    }, [sources.hls]);

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
  }
);

export default VideoPlayer;
