"use client";

import { useRef, useState, useEffect, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import IntroScreen from "./components/IntroScreen";
import Header from "./components/Header";
import { useRouter } from "next/navigation";

// Memoize DynamicVideoPlayer to prevent unnecessary re-renders
const DynamicVideoPlayer = dynamic(
  () => import("./components/VideoPlayerWithRef"),
  {
    ssr: false,
    loading: () => <div className="loading-placeholder">Loading...</div>,
  }
);

export default function Home() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Media query check for mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile-specific video sources (first two only), full list for desktop
  const videoSources = isMobile
    ? [
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/cc730046c9c161b5f4de30f8177cf56b/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/768b5125af7c11692fa615543d9c1bd1/manifest/video.m3u8",
        },
      ]
    : [
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/f4fb76f47db81b0cde3fd60a782a04f3/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/52ad84cd5c8e4cb200b0c94bfd37390c/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/c366b9ce080eb15b9c5dbde238764a9a/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/e5803735e4285dd454257322851dbc58/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/eb1719925f1afa6230661cf820fd1c9e/manifest/video.m3u8",
        },
        {
          hls: "https://customer-hvour7z20hdwmt52.cloudflarestream.com/1e8850b8998b898b87df99a7919f8143/manifest/video.m3u8",
        },
      ];

  const titles = [
    "Mardi Development",
    "Mardi Comfort",
    "Mardi Food & Beverage",
    "Mardi Travel Lab",
    "Mardi Energy",
    "Mardi Wine & Cigar",
  ];

  const descriptions = [
    "Creating premium hotels in partnership with top international brands.",
    "Aiming to be Georgia’s top hospitality management company.",
    "Discover Adjarian Wine House, home to the unique Chkhaveri grape.",
    "Explore the beauty of Georgia with Mardi Travel Lab.",
    "Cascade of hydropower plants on the Khokhniskali River, Keda.",
    "Producing Porto Franco wine and Georgian-grown tobacco.",
  ];

  const urls = [
    "https://www.mardi.ge/",
    "/Mardi-Comfort",
    "https://awh.ge/en",
    "https://travelab.ge/",
    "/Mardi-Energy",
    "https://cigar.ge/",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("introComplete");
    if (hasSeenIntro) {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroEnd = () => {
    setIntroComplete(true);
    sessionStorage.setItem("introComplete", "true");
  };

  const videoPlayerRef = useRef(null);

  // Preload the next video segments
  const preloadNextVideo = useCallback(
    (index) => {
      if (
        videoPlayerRef.current &&
        typeof videoPlayerRef.current.preloadNextVideo === "function"
      ) {
        videoPlayerRef.current.preloadNextVideo(videoSources[index].hls);
      } else {
        console.error(
          "preloadNextVideo is not a function on videoPlayerRef.current"
        );
      }
    },
    [videoSources]
  );

  const handleNextVideo = useCallback(() => {
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    preloadNextVideo(nextIndex);
    setCurrentVideoIndex(nextIndex);

    const container = containerRef.current;
    if (container && container.children[nextIndex]) {
      const thumbnail = container.children[nextIndex];
      thumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentVideoIndex, videoSources.length, preloadNextVideo]);

  useEffect(() => {
    preloadNextVideo((currentVideoIndex + 1) % videoSources.length);
    const interval = setInterval(() => {
      handleNextVideo();
    }, 10000); // Advance every 10 seconds

    return () => clearInterval(interval);
  }, [
    handleNextVideo,
    preloadNextVideo,
    currentVideoIndex,
    videoSources.length,
  ]);

  const handleClick = useCallback(
    (index) => {
      const clickedTime = new Date().getTime();

      // Initialize lastClickTime if not present
      if (!videoPlayerRef.current) {
        videoPlayerRef.current = {};
      }

      if (
        videoPlayerRef.current.lastClickTime &&
        clickedTime - videoPlayerRef.current.lastClickTime < 300
      ) {
        // Double click detected: Open the relevant website in a new tab
        let url = urls[index];

        // If the URL is internal, construct the full URL
        if (!url.startsWith("http")) {
          // Ensure the internal URL starts with a slash
          if (!url.startsWith("/")) {
            url = `/${url}`;
          }
          url = `${window.location.origin}${url}`;
        }

        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        // Single click: Change to the clicked video
        videoPlayerRef.current.lastClickTime = clickedTime;
        setTimeout(() => {
          if (
            new Date().getTime() - videoPlayerRef.current.lastClickTime >=
            300
          ) {
            // Ensure no double-click was detected
            setCurrentVideoIndex(index);
            preloadNextVideo((index + 1) % videoSources.length);
          }
        }, 300); // Timeout to detect double-click
      }
    },
    [urls, videoSources.length, preloadNextVideo]
  );

  return (
    <main className="relative w-full min-h-screen h-screen overflow-hidden font-primary">
      {!introComplete && <IntroScreen onIntroEnd={handleIntroEnd} />}

      <div className="main-content absolute inset-0">
        <div className="relative w-full h-full min-h-[100vh] flex flex-col justify-center items-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentVideoIndex}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: introComplete ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <DynamicVideoPlayer
                ref={videoPlayerRef} // Correct ref usage
                sources={videoSources[currentVideoIndex]}
                className="absolute top-0 left-0 w-full h-full object-cover lg:object-cover small-range:object-contain medium-range:object-contain"
                autoPlay
                muted
                loop
                preload="auto"
                style={{
                  filter: "brightness(100%) contrast(105%) saturate(100%)",
                }}
                importance="auto"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay */}
          <div
            className="overlay absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
            }}
          ></div>

          {/* Render content that depends on introComplete */}
          {introComplete && (
            <>
              {/* Header */}
              <Header />

              {/* Video description and buttons */}
              <AnimatePresence>
                <motion.div
                  key={currentVideoIndex}
                  className="absolute left-[5vw] top-[18vh] text-white z-20"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.h1 className="text-[3vw] small-range:text-[30px] medium-range:text-[30px] uppercase font-regular mb-[2vw] leading-tight tracking-tight text-shadow-strong">
                    {titles[currentVideoIndex]}
                  </motion.h1>

                  <motion.p className="description mt-[3vh] small-range:text-[20px] medium-range:text-[30px] small-range:pt-5 text-[4vw] sm:text-[1.2vw] max-w-[55vw] font-regular leading-normal tracking-wide text-shadow-strong">
                    {descriptions[currentVideoIndex]}
                  </motion.p>

                  <motion.button
                    className="button-assist mb-[5vh] text-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: [1, 1.05, 1], // Gentle scaling for bounce
                    }}
                    transition={{
                      duration: 2, // Duration for one bounce cycle
                      repeat: Infinity, // Infinite looping
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    <Link
                      href={urls[currentVideoIndex]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-white text-shadow medium-range:text-[20px] tracking-normal whitespace-nowrap leading-relaxed px-[6vw] py-[2vh] text-[3vw] sm:text-[1vw] font-semi-bold">
                        Visit Website
                      </span>
                    </Link>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Thumbnail navigation */}
        {introComplete && (
          <div
            ref={containerRef}
            className="absolute bottom-[10vh] left-1/2 transform -translate-x-1/2 flex overflow-x-auto w-full px-[5vw] box-border whitespace-nowrap z-50 scrollbar-none gap-[3vw]"
          >
            {videoSources.map((_, index) => (
              <motion.div
                key={index}
                data-index={index}
                className={`relative inline-block w-[40vw] sm:w-[20vw] medium-range:w-[40vw] medium-range:h-[15vh] h-[25vw] sm:h-[10vw] mx-auto overflow-hidden rounded-md transition-shadow duration-300 flex-shrink-0 ${
                  currentVideoIndex === index ? "shadow-lg" : ""
                }`}
                style={{
                  border:
                    currentVideoIndex === index
                      ? "2px solid rgba(255, 255, 255, 0.8)"
                      : "2px solid transparent",
                  transition: "all 0.4s ease",
                  borderRadius: "15px",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                  filter: "brightness(1.15)",
                }}
                onClick={() => handleClick(index)} // Updated to use the new `handleClick` function
              >
                <Image
                  src={`/images/image${index + 1}-new.webp`}
                  alt={titles[index]}
                  fill="true"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 10vw"
                  priority
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.7) contrast(1.1)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-[3vw] sm:p-[1vw] text-[3.5vw] sm:text-[1vw] text-center bg-white bg-opacity-15">
                  <div className="text-white text-right">{titles[index]}</div>
                </div>

                {currentVideoIndex === index && (
                  <div
                    className="progress-bar-background absolute left-0 right-0 h-[0.4vw] z-[2000] overflow-hidden"
                    style={{ bottom: "0vw" }}
                  >
                    <div className="progress-bar-fill h-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-shadow {
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
        }
        .progress-bar-background {
          background-color: rgba(0, 0, 0, 0.3);
          height: 0.4vw;
        }
        .progress-bar-fill {
          background-color: rgba(255, 255, 255, 0.8);
          height: 100%;
          width: 100%;
          animation: progressBar 10s linear forwards;
        }
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
