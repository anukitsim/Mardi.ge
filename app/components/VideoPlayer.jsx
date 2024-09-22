// components/VideoPlayer.jsx

"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";
import { motion } from "framer-motion";
import Image from "next/image";

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
    const hlsPreloaderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

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
            maxBufferLength: 120, // Adjust as needed
            maxMaxBufferLength: 240,
            pLoader: function (config) {
              const loader = new Hls.DefaultConfig.loader(config);
              this.load = (context, config, callbacks) => {
                context.url = context.url.replace(/(\?|&)rnd=\d+/, "");
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
      setIsLoading(true); // Start loading

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
                context.url = context.url.replace(/(\?|&)rnd=\d+/, "");
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
              .then(() => {
                setIsLoading(false); // Video is ready
              })
              .catch((error) => {
                console.warn("Auto-play prevented: ", error);
                setIsLoading(false); // Consider video ready even if autoplay is prevented
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
              .then(() => {
                setIsLoading(false); // Video is ready
              })
              .catch((error) => {
                console.warn("Auto-play prevented: ", error);
                setIsLoading(false);
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
      <div className={className} style={style}>
        {isLoading && (
          <div className="loading-background absolute top-0 left-0 w-full h-full z-10">
            {/* Background gradient similar to intro */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
            {/* Logo */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="flex items-center justify-center h-full"
            >
              <Image src="/images/logo.svg" alt="Logo" width={70} height={20} />
            </motion.div>
          </div>
        )}
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          style={style}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

export default VideoPlayer;
