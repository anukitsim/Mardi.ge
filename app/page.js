"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);

  const videoSources = [
    "/video1.mp4",
    "/video3.mp4",
    "/video2.mov",
    "/video5.mp4",
    "/video6.mov",
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

  const [currentVideo, setCurrentVideo] = useState("/video1.mp4");
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // Track progress for the active thumbnail

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleNextThumbnail(); // Move to next thumbnail
          return 0;
        }
        return prevProgress + 100 / 70; // 7 seconds divided into 70 steps (~100ms per step)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNextThumbnail = () => {
    const nextIndex = (activeIndex + 1) % videoSources.length;
    handleClick(nextIndex);
  };

  const handleClick = (index) => {
    if (index !== activeIndex) {
      setCurrentVideo(videoSources[index]);
      setActiveIndex(index);
      setProgress(0); // Reset progress for the new active thumbnail

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
            className="relative transition-colors duration-200 font-bold text-xs sm:text-sm after:content-[''] after:absolute after:left-0 after:bottom-[-0.3vw] after:h-[0.2vw] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="relative transition-colors duration-200 font-bold text-xs sm:text-sm after:content-[''] after:absolute after:left-0 after:bottom-[-0.3vw] after:h-[0.2vw] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </Link>
        </nav>
      </header>

      <div className="main-content absolute inset-0">
        <div className="relative w-full h-full min-h-[100vh] flex flex-col justify-center items-center">
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
                className="mt-[3vh] text-[4vw] sm:text-[1.2vw] max-w-[55vw] font-regular leading-normal tracking-wide text-shadow-strong"
                variants={slowSlideInFromLeft}
              >
                {descriptions[activeIndex]}
              </motion.p>

              <motion.button
                className="button-assist mt-[7vh] sm:mt-[2vh]  text-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white tracking-normal whitespace-nowrap leading-relaxed px-[6vw] py-[2vh] text-[4vw] sm:text-[1.2vw]  font-semi-bold">
                  Visit Website
                </span>
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
              <div
                className="bg-image absolute inset-0 bg-cover bg-center transition-transform duration-300"
                style={{
                  backgroundImage: `url(/images/image${index + 1}.webp)`,
                  filter: "brightness(0.7) contrast(1.1)",
                }}
              ></div>

              <div className="absolute bottom-0 left-0 right-0 p-[3vw] sm:p-[1vw] text-[3.5vw] sm:text-[1vw] text-center bg-white bg-opacity-15">
                <div className="text-white">{titles[index]}</div>
              </div>

              {/* Progress bar directly below each thumbnail */}
              {activeIndex === index && (
                <div
                  className="progress-bar-background absolute left-0 right-0 h-[0.4vw] z-[2000] overflow-hidden"
                  style={{ bottom: "0vw" }} // Ensure it's placed above the bottom edge
                >
                  <div
                    className="progress-bar-fill h-full"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.1s linear",
                    }}
                  />
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
    background-color: rgba(0, 0, 0, 0.3); /* Slightly darker for better contrast */
    height: 0.4vw; /* Increased for better visibility */
  }

  .progress-bar-fill {
    background-color: rgba(255, 255, 255, 0.8); /* Bright white fill */
    height: 100%;
  }
      `}</style>
    </main>
  );
}
