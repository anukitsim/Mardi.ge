"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import IntroScreen from "./components/IntroScreen";

// Memoize the DynamicVideoPlayer to prevent unnecessary re-renders
const DynamicVideoPlayer = memo(
  dynamic(() => import("./components/VideoPlayer"), {
    ssr: false,
    loading: () => <div className="loading-placeholder">Loading...</div>,
  })
);

export default function Home() {
  const containerRef = useRef(null);

  // Video sources
  const videoSources = [
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/012ad024a53bbf6e0e55510c2f52e9ea/manifest/video.m3u8" },
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/656f09909a1970c52a3b58af39a74593/manifest/video.m3u8" },
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/6c43f158d1d61c502d9ae7a3a0a35b9c/manifest/video.m3u8" },
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/3be1d3e3558f023c4f9801d2c50c98a8/manifest/video.m3u8" },
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/8cc0d687b8c9dff9d480aa3b6b7a104a/manifest/video.m3u8" },
    { hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/796906c6cdcaab891fe4b4b6b8678dbb/manifest/video.m3u8" },
    
  ];

  // Titles, descriptions, and URLs
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
    "https://awh.ge/en",
    "https://travelab.ge/",
    "/Mardi-Energy",
    "https://cigar.ge/",
    "/Mardi-Comfort",
  ];

  // State variables
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check if intro has been completed before in this session
    const hasSeenIntro = sessionStorage.getItem('introComplete');
    if (hasSeenIntro) {
      setIntroComplete(true); // Skip the intro if already shown
    }
  }, []);

  // Handle intro end
  const handleIntroEnd = () => {
    setIntroComplete(true);
    sessionStorage.setItem('introComplete', 'true'); // Store intro completion in session storage
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Reference to the VideoPlayer component
  const videoPlayerRef = useRef(null);

  // Preload the next video segments
  const preloadNextVideo = useCallback(
    (index) => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.preloadNextVideo(videoSources[index].hls);
      }
    },
    [videoSources]
  );

  // Switch to the next video every 10 seconds
  const handleNextVideo = useCallback(() => {
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;

    // Preload the next video's segments
    preloadNextVideo(nextIndex);

    // Transition to the next video
    setCurrentVideoIndex(nextIndex);

    // Scroll thumbnail into view
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
    // Preload the next video when the component mounts
    preloadNextVideo((currentVideoIndex + 1) % videoSources.length);

    const interval = setInterval(() => {
      handleNextVideo();
    }, 10000); // Switch videos every 10 seconds

    return () => clearInterval(interval);
  }, [handleNextVideo, preloadNextVideo, currentVideoIndex]);

  // Handle thumbnail click to switch videos manually
  const handleClick = useCallback(
    (index) => {
      if (index !== currentVideoIndex) {
        // Preload the next video's segments
        preloadNextVideo((index + 1) % videoSources.length);

        // Transition to the selected video
        setCurrentVideoIndex(index);

        // Scroll thumbnail into view
        const container = containerRef.current;
        const clickedThumbnail = container.children[index];
        clickedThumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
    [currentVideoIndex, preloadNextVideo]
  );

  return (
    <main className="relative w-full min-h-screen h-screen overflow-hidden font-primary">
      {/* Intro screen */}
      {!introComplete && <IntroScreen onIntroEnd={handleIntroEnd} />}

      {/* Video component */}
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
                forwardRef={videoPlayerRef}
                sources={videoSources[currentVideoIndex]}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                preload="auto"
                style={{ filter: "brightness(100%) contrast(105%) saturate(100%)" }}
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
              <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={100}
                    height={30}
                    className="h-6 sm:h-7 md:h-8"
                  />
                </Link>
                <nav className="flex space-x-4 sm:space-x-6 md:space-x-10">
                  <Link
                    href="/contact"
                    className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/about"
                    className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                  >
                    About Us
                  </Link>
                </nav>
              </header>

              {/* Video description and buttons */}
              <AnimatePresence>
                <motion.div
                  key={currentVideoIndex}
                  className="absolute left-[5vw] top-[18vh] text-white z-20"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.h1
                    className="text-[3vw] small-range:text-[30px] medium-range:text-[30px]  uppercase font-regular mb-[2vw] leading-tight tracking-tight text-shadow-strong"
                  >
                    {titles[currentVideoIndex]}
                  </motion.h1>

                  <motion.p
                    className="description mt-[3vh] small-range:text-[20px] medium-range:text-[30px] small-range:pt-5 text-[4vw] sm:text-[1.2vw] max-w-[55vw] font-regular leading-normal tracking-wide text-shadow-strong"
                  >
                    {descriptions[currentVideoIndex]}
                  </motion.p>

                  <motion.button
                    className="button-assist mb-[5vh] text-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={urls[currentVideoIndex]} target="_blank" rel="noopener noreferrer">
                      <span className="text-white medium-range:text-[20px] tracking-normal whitespace-nowrap leading-relaxed px-[6vw] py-[2vh] text-[4vw] sm:text-[1.2vw] font-semi-bold">
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
                onClick={() => handleClick(index)}
              >
                <Image
                  src={`/images/image${index + 1}-new.webp`}
                  alt={titles[index]}
                  fill="true"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 10vw"
                  priority
                  style={{ objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }}
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