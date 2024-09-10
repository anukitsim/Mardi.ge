"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const About = () => {
  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
  });

  const sectionRefs = useRef({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
    section6: null,
  });

  const pathname = usePathname();

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.dataset.section;
        setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [handleIntersection]);

  return (
    <main className="relative w-full overflow-hidden font-primary">
      {/* First Section */}
      <section
        className="min-h-[100vh] bg-cover bg-center relative px-4 sm:px-6 md:px-16 py-20"
        style={{
          backgroundImage: "url('/images/about-poster.jpg')",
          backgroundAttachment: "fixed",
        }}
        ref={(el) => (sectionRefs.current.section1 = el)}
        data-section="section1"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
          <Link href="/">
            <img src="/images/logo.svg" alt="Logo" className="h-6 sm:h-7 md:h-8" />
          </Link>
          <nav className="flex space-x-4 sm:space-x-6 md:space-x-10">
            <Link
              href="/contact"
              className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={`relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] ${
                pathname === "/about" ? "after:w-full" : "after:w-0"
              } after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
            >
              About Us
            </Link>
          </nav>
        </header>

        {/* Animated Text */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-16"
          initial="hidden"
          animate={visibleSections.section1 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-primary uppercase leading-wide tracking-wide text-shadow-strong font-semibold text-white"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            About Us
          </motion.h2>
          <motion.h2
            className="mt-2 sm:mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-shadow-strong font-light text-white text-opacity-80"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Mardi Holding
          </motion.h2>
        </motion.div>
      </section>

      {/* Second Section */}
      <section
        className="relative min-h-[100vh] bg-[#f5f5f5] text-[#808080] flex flex-col justify-center items-center px-4 sm:px-6 md:px-16 py-10 md:py-20"
        ref={(el) => (sectionRefs.current.section2 = el)}
        data-section="section2"
      >
        <motion.div
          className="w-full h-full flex flex-col items-center"
          initial="hidden"
          animate={visibleSections.section2 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl text-[#333333] font-primary font-bold mb-8 sm:mb-10 md:mb-20 text-center"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Company Overview
          </motion.h2>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-7xl mx-auto px-4">
            <motion.div
              className="w-full text-justify"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h3 className="text-2xl sm:text-3xl font-primary font-bold mb-4 text-center sm:text-left">
                Building and Development Company
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-primary leading-relaxed">
                Mardi Holding is a construction and development company that unifies construction, architectural, tourism, transportation, and real estate companies, along with wine and cigar factories, as well as hotel and restaurant complexes.
              </p>
            </motion.div>

            <motion.div
              className="w-full text-justify"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h3 className="text-2xl sm:text-3xl font-primary font-bold mb-4 text-center sm:text-left">
                Historical Background
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-primary leading-relaxed">
                The history of the holding dates back to the 1990s, when two friends founded the Mardi fast food cafe. Mardi offered healthy and delicious pastries to Batumi students at an affordable price. Years later, this success became the foundation for a bigger challenge—the establishment of "Mardi Holding" construction and development company.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Third Section */}
      <section
        className="relative min-h-[100vh] bg-cover bg-center text-[#808080] px-4 sm:px-6 md:px-16 py-10 md:py-20"
        style={{
          backgroundImage: "url('/images/mardiplaza2.jpg')",
          backgroundAttachment: "fixed",
        }}
        ref={(el) => (sectionRefs.current.section3 = el)}
        data-section="section3"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <motion.div
          className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-16"
          initial="hidden"
          animate={visibleSections.section3 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl text-shadow-strong font-bold mb-8 text-white"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Business Operations
          </motion.h2>

          <motion.div
            className="w-full md:w-1/2 text-left text-lg"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h3 className="text-xl sm:text-2xl text-shadow-strong font-bold mb-4 text-white">
              Core Business and Services
            </h3>
            <p className="leading-relaxed text-white">
              The main business focus of Mardi Holding is construction and
              development. Facilities under construction are located in Batumi,
              Tbilisi, and Bakuriani. Mardi offers customers both residential
              and apart-hotel services in both under-construction and completed
              hospitality complexes. Customers are guaranteed an income of 7.0%
              from the value of the apart-hotel from the date of purchase.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Fourth Section */}
      <section
        className="relative min-h-[100vh] bg-cover bg-center text-[#808080] px-4 sm:px-6 md:px-16 py-10 md:py-20"
        style={{
          backgroundImage: "url('/images/mardiplaza1.jpg')",
          backgroundAttachment: "fixed",
        }}
        ref={(el) => (sectionRefs.current.section4 = el)}
        data-section="section4"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <motion.div
          className="relative z-10 flex flex-col items-end h-full px-4 sm:px-6 md:px-16"
          initial="hidden"
          animate={visibleSections.section4 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            className="w-full md:w-1/2 text-left text-lg"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h3 className="text-xl sm:text-2xl text-shadow-strong font-bold mb-4 text-white">
              Major Projects
            </h3>
            <p className="leading-relaxed text-white">
              Mardi Holding owns one of the largest recreational complexes
              located in the center of Batumi—Mardi Plaza. This includes a
              42-room four-star hotel, Olympic pool, and shopping center. Plaza
              Pool is the only Olympic pool in western Georgia that meets
              European standards, offering customers a clean and healthy
              environment.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Fifth Section */}
      <section
        className="relative min-h-[100vh] bg-gray-100 text-[#808080] flex flex-col justify-center items-center px-4 sm:px-6 md:px-16 py-10 md:py-20"
        ref={(el) => (sectionRefs.current.section5 = el)}
        data-section="section5"
      >
        <motion.div
          className="w-full h-full flex flex-col items-center"
          initial="hidden"
          animate={visibleSections.section5 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl text-[#333333] font-primary font-bold mb-8 sm:mb-10 md:mb-20 text-center"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Subsidiaries and Brands
          </motion.h2>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-7xl mx-auto px-4">
            <motion.div
              className="relative w-full text-justify p-10 rounded-lg overflow-hidden"
              style={{
                backgroundImage: "url('/images/image5aaa.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: visibleSections.section5 ? 1 : 0,
                x: visibleSections.section5 ? 0 : -100,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl sm:text-3xl text-shadow-strong font-bold mb-4 text-white text-center sm:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: visibleSections.section5 ? 1 : 0,
                    y: visibleSections.section5 ? 0 : 20,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                  Imeri
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-shadow-strong text-white leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: visibleSections.section5 ? 1 : 0,
                    y: visibleSections.section5 ? 0 : 20,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                >
                  The holding's subsidiary, "Imeri," is the first producer of Georgian cigars. It produces 29 sorts of cigars and cigarillos made from tobacco leaves grown in Adjara, Keda.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="relative w-full text-justify p-10 rounded-lg overflow-hidden"
              style={{
                backgroundImage: "url('/images/lala.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: visibleSections.section5 ? 1 : 0,
                x: visibleSections.section5 ? 0 : -100,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl sm:text-3xl text-shadow-strong font-bold mb-4 text-white text-center sm:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: visibleSections.section5 ? 1 : 0,
                    y: visibleSections.section5 ? 0 : 20,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                  Adjara Wine House
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-shadow-strong text-white leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: visibleSections.section5 ? 1 : 0,
                    y: visibleSections.section5 ? 0 : 20,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                >
                  Adjara Wine House is a chateau-style restaurant and winery offering a blend of traditional Georgian wines and cuisine. It includes a museum, enotheque, and cellar, where you can taste and purchase rare, locally produced wines, including the unique Chkhaveri variety.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sixth Section */}
      <section
        className="relative min-h-[50vh] bg-[#f5f5f5] text-[#808080] flex flex-col justify-start items-start px-4 sm:px-6 md:px-16 py-10 md:py-20"
        ref={(el) => (sectionRefs.current.section6 = el)}
        data-section="section6"
      >
        <motion.div
          className="w-full h-full flex flex-col justify-start items-start "
          initial="hidden"
          animate={visibleSections.section6 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-primary font-bold mb-8 sm:mb-10 md:mb-20 text-left"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Company Vision and Goals
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-left leading-relaxed max-w-3xl mb-10"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Mardi Holding is led by a young, creative, and professional team
            with the goal of offering a wide variety of high-quality products.
            The company's mission is rooted in environmental protection and the
            economic development of the region. Mardi Holding aims to provide
            employment opportunities and attract local and foreign investments
            in Adjara, ultimately contributing to the well-being of the local
            population.
          </motion.p>

          <motion.div
            className="flex justify-start items-start mt-10"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/images/logo.svg"
              alt="Mardi Holding Logo"
              width={150}
              height={150}
              className="opacity-90"
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
