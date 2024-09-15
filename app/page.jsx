"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import VideoPlayer for better load times
const DynamicVideoPlayer = dynamic(() => import("./components/VideoPlayer"), {
  ssr: false,
  loading: () => <div>Loading video...</div>, // Loading placeholder
});

export default function Home() {
  const containerRef = useRef(null);

  const videoSources = [
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/bf21043eaee42753a3d3bc48e222d754/manifest/video.m3u8",
    },
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/0277dfb0898223f82c258c0a2d881bce/manifest/video.m3u8",
    },
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/c5754dddf6541ec9ddbd434c356616d4/manifest/video.m3u8",
    },
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/3a53346ff334a41d95699aaced9184bd/manifest/video.m3u8",
    },
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/4f9b08d32c2cb4a17d34619f5e5c2e66/manifest/video.m3u8",
    },
    {
      hls: "https://customer-s2m96v0a16zk0okb.cloudflarestream.com/82f394e500d8d442bb211749f4d29d25/manifest/video.m3u8",
    },
  ];

  const titles = [
    "Mardi Development",
    "Mardi Food & Beverage",
    "Mardi Travel Lab",
    "Mardi Energy",
    "Mardi Wine & Cigar",
    "Mardi Comfort",
  ];

  const descriptions = [
    "Creating premium hotels in partnership with top international brands. Invest in high-quality real estate, from luxury apartments to townhouses.",
    "Discover Adjarian Wine House, home to the unique Chkhaveri grape. Enjoy Georgian wines, explore winemaking history, and enjoy delicious cuisine.",
    "Explore the beauty of Georgia with Mardi Travel Lab, your guide to authentic travel experiences.",
    "Cascade of hydropower plants on the Khokhniskali River, Keda.",
    "Producing Porto Franco wine and Georgian-grown tobacco, crafted with traditional Cuban techniques.",
    "Aiming to be Georgia’s top hospitality management company, delivering services and profitability matching international standards.",
  ];

  const urls = [
    "https://www.mardi.ge/",
    "https://awh.ge/en",
    "https://travelab.ge/",
    "/in-development",
    "https://cigar.ge/",
    "/in-development",
  ];

  const [currentVideo, setCurrentVideo] = useState(videoSources[0]);
  const [prevVideo, setPrevVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload the next video in advance to ensure it's ready
  const preloadNextVideo = useCallback(() => {
    const nextIndex = (activeIndex + 1) % videoSources.length;
    const preloadVideo = document.createElement("video");
    preloadVideo.src = videoSources[nextIndex].hls; // Preload next video
  }, [activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextThumbnail();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (prevVideo) {
      const timeout = setTimeout(() => {
        setPrevVideo(null); // Clear the previous video after 1 second (transition duration)
      }, 1000);
      return () => clearTimeout(timeout); // Clean up timeout on unmount
    }
  }, [prevVideo]);

  const handleNextThumbnail = useCallback(() => {
    const nextIndex = (activeIndex + 1) % videoSources.length;
    handleClick(nextIndex);
  }, [activeIndex]);

  const handleClick = (index) => {
    if (index !== activeIndex) {
      setPrevVideo(currentVideo); // Set the previous video before changing
      setCurrentVideo(videoSources[index]);
      setActiveIndex(index);
      preloadNextVideo();

      const container = containerRef.current;
      const clickedThumbnail = container.children[index];
      clickedThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const slowSlideInFromLeft = {
    initial: { opacity: 0, x: -200 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0, 
      x: -200,
      transition: { duration: 0.7, ease: "easeIn" },
    },
  };

  return (
    <main className="relative w-full min-h-screen h-screen overflow-hidden font-primary">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-[5vw] py-[2vh] shadow-md z-30 font-medium text-white">
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo" className="h-[3vh]" />
        </Link>
        <nav className="flex space-x-[2vw]">
          <Link
            href="/contact"
            className="relative transition-colors duration-200 font-bold text-xs sm:text-sm"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="relative transition-colors duration-200 font-bold text-xs sm:text-sm"
          >
            About Us
          </Link>
        </nav>
      </header>

      <div className="main-content absolute inset-0">
        <div className="relative w-full h-full min-h-[100vh] flex flex-col justify-center items-center">
          <AnimatePresence initial={false}>
            {currentVideo && (
              <motion.div
                key={currentVideo.hls}
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <DynamicVideoPlayer
                  sources={currentVideo}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  preload="auto"
                  style={{ filter: "brightness(100%) contrast(105%) saturate(100%)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="overlay absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
            }}
          ></div>

          <AnimatePresence>
            <motion.div
              key={activeIndex}
              className="absolute left-[5vw] top-[18vh] text-white z-20"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slowSlideInFromLeft}
            >
              <motion.h1
                className="text-[5vw] sm:text-[2.5vw] uppercase font-regular mb-[2vw] leading-tight tracking-tight text-shadow-strong"
                variants={slowSlideInFromLeft}
              >
                {titles[activeIndex]}
              </motion.h1>

              <motion.p
                className="description mt-[3vh] text-[4vw] sm:text-[1.2vw] max-w-[55vw] font-regular leading-normal tracking-wide text-shadow-strong"
                variants={slowSlideInFromLeft}
              >
                {descriptions[activeIndex]}
              </motion.p>

              <motion.button
                className="button-assist mb-[5vh] text-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={urls[activeIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-white tracking-normal whitespace-nowrap leading-relaxed px-[6vw] py-[2vh] text-[4vw] sm:text-[1.2vw] font-semi-bold">
                    Visit Website
                  </span>
                </Link>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          ref={containerRef}
          className="absolute bottom-[10vh] left-1/2 transform -translate-x-1/2 flex overflow-x-auto w-full px-[5vw] box-border whitespace-nowrap z-50 scrollbar-none gap-[3vw]"
        >
          {Array.from({ length: videoSources.length }).map((_, index) => (
            <motion.div
              key={index}
              className={`relative inline-block w-[40vw] sm:w-[20vw] h-[25vw] sm:h-[10vw] mx-auto overflow-hidden rounded-md transition-shadow duration-300 flex-shrink-0 ${
                activeIndex === index ? "shadow-lg" : ""
              }`}
              style={{
                border:
                  activeIndex === index
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
                src={`/images/image${index + 1}.webp`}
                alt={titles[index]}
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 10vw"
                priority={index === 0}
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.7) contrast(1.1)",
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-[3vw] sm:p-[1vw] text-[3.5vw] sm:text-[1vw] text-center bg-white bg-opacity-15">
                <div className="text-white text-right">{titles[index]}</div>
              </div>

              {activeIndex === index && (
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

        .button-assist:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
