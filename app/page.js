"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState("/video1.mp4");
  const [nextVideo, setNextVideo] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNextVideoReady, setIsNextVideoReady] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const videoSources = [
    "/video1.mp4",
    "/video3.mp4",
    "/video2.mp4",
    "/video5.mp4",
    "/video6.mp4",
    "/video7.mp4",
  ];

  const titles = [
    "Mardi Development",
    "Mardi Food & Beverage",
    "Mardi Travel Lab",
    "Mardi Energy",
    "Mardi Wine & Cigar",
    "Mardi Comfort (Hospitality)",
  ];

  const descriptions = [
    "Building high-class projects in collaboration with international hotel brands and management companies. Our goal is to create premium hotels with high-quality services. You can own profitable real estate with us, from apartments to townhouses.",
    "The Adjarian Wine House is a notable landmark in Adjara, cultivating the unique Chkhaveri grape. Here, you can taste our exceptional Georgian wines, learn about winemaking history, and enjoy delicious food. [Learn more](https://awh.ge/)",
    "Mardi Travel Lab is a tourism company that showcases the stunning beauty of Georgia.",
    "Cascade of hydropower plants on the Khokhniskali River, Keda.",
    "Production of Porto Franco wine and cigarettes from tobacco grown in Georgia and wrapped using classic Cuban technology.",
    "A management company that operates to the highest standards of the hospitality industry. Our goal is to become a leading management company in Georgia, providing services and profitability comparable to international brands.",
  ];

  useEffect(() => {
    if (isTransitioning && isNextVideoReady) {
      setCurrentVideo(nextVideo);
      setNextVideo(null);
      setIsNextVideoReady(false);
      setIsTransitioning(false);
    }
  }, [isTransitioning, isNextVideoReady, nextVideo]);

  const handleClick = (index) => {
    if (!isTransitioning) {
      if (videoSources[index]) {
        const videoElement = document.createElement("video");
        videoElement.src = videoSources[index];
        videoElement.muted = true;
        videoElement.oncanplay = () => {
          setNextVideo(videoSources[index]);
          setIsTransitioning(true);
          setIsNextVideoReady(true);
          videoElement.remove();
        };
      } else {
        setCurrentVideo("");
        setNextVideo(null);
      }
    }

    setActiveIndex(index);
    setIsTextVisible(false);
    setTimeout(() => setIsTextVisible(true), 50);
  };

  // Animation Variants for text content
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
    <main className="relative w-full h-screen overflow-hidden font-primary">
       {/* Header */}
       <header className="absolute top-0 left-0 w-full flex items-center justify-between px-16 py-6 shadow-md z-30 font-medium text-white">
          <Link href="/">
            <img src="/images/logo.svg" alt="Logo" className="h-8" />
          </Link>
          <nav className="flex space-x-10">
            <Link
              href="/contact"
              className="relative transition-colors duration-200 font-bold text-sm after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="relative transition-colors duration-200 font-bold text-sm after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
          </nav>
        </header>

      <div className="main-content absolute inset-0">
        <div className="relative w-full h-full">
          <AnimatePresence initial={false}>
            {currentVideo && (
              <motion.video
                key={currentVideo}
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={currentVideo}
                autoPlay
                muted
                loop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  filter: "brightness(100%) contrast(105%) saturate(100%)",
                }}
              />
            )}
          </AnimatePresence>
          <div
            className="overlay absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
            }}
          ></div>

          {/* Title and description animations */}
          <AnimatePresence>
            {isTextVisible && activeIndex !== null && (
              <motion.div
                key={activeIndex}
                className="absolute left-16 top-32 pt-10 text-white z-20"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slowSlideInFromLeft}
              >
                {/* Title */}
                <motion.h1
                  className="text-h1 uppercase font-regular mb-5 leading-tight tracking-tight text-shadow-strong"
                  variants={slowSlideInFromLeft}
                >
                  {titles[activeIndex]}
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="mt-2 text-body max-w-xl font-regular leading-normal tracking-wide text-shadow-strong"
                  variants={slowSlideInFromLeft}
                >
                  {descriptions[activeIndex]}
                </motion.p>

                {/* Button */}
                <motion.button
                  className="button-assist mt-6 text-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white tracking-normal whitespace-nowrap leading-relaxed p-4 text-md font-semi-bold">
                    Visit Website
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div
          ref={containerRef}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex overflow-x-auto w-full px-5 box-border whitespace-nowrap z-20"
        >
          {Array.from({ length: videoSources.length }).map((_, index) => (
            <motion.div
              key={index}
              className={`relative inline-block w-[250px] h-[120px] mx-2 overflow-hidden rounded-md transition-shadow duration-300 ${
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
                scale: 1.02, // Slight scale on hover
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow
                filter: "brightness(1.15)", // Slight brightness on hover
              }}
              onClick={() => handleClick(index)}
            >
              {/* Background Image with Overlay */}
              <div
                className="bg-image absolute inset-0 bg-cover bg-center transition-transform duration-300"
                style={{
                  backgroundImage: `url(/images/image${index + 1}.webp)`,
                  filter: "brightness(0.7) contrast(1.1)", // Slightly darkened background
                }}
              ></div>

              {/* Text content with background overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 text-end bg-white bg-opacity-15">
                <div className="text-white text-sm font-medium">
                  {titles[index]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .transition-opacity {
          transition: opacity 1.5s ease-in-out;
        }

        .text-shadow {
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
        }

        nav a.active {
          border-bottom: 2px solid #ffffff;
        }

        .button-assist:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .description-text {
          font-size: 1rem;
          line-height: 1.5;
        }

        .hover-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.5)
          );
        }

        .button-assist-small {
          padding: 0.5rem 1.5rem;
          font-size: 0.875rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          background-color: rgba(255, 255, 255, 0.1);
        }

        .button-assist-small:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
