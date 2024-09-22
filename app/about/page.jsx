"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Linear interpolation function for smoother scrolling
const lerp = (start, end, factor) => start + (end - start) * factor;

const About = React.memo(() => {
  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
  });

  const sectionRefs = useRef({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
  });

  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [lerpedScrollY, setLerpedScrollY] = useState(0);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.dataset.section;
      if (entry.isIntersecting) {
        setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    const sections = Object.values(sectionRefs.current);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [handleIntersection]);

  // Parallax scroll effect
  const handleParallaxScroll = useCallback(() => {
    const parallaxElement = sectionRefs.current.section1;
    if (parallaxElement) {
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * 0.5; // Adjust speed factor here
      parallaxElement.style.transform = `translateY(${offset}px)`; // Move background
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleParallaxScroll);
    return () => window.removeEventListener("scroll", handleParallaxScroll);
  }, [handleParallaxScroll]);

  useEffect(() => {
    let animationFrame;
    let lastScrollY = 0;

    const handleSmoothScroll = () => {
      const targetScrollY = window.scrollY;

      // Lerp for smoother scroll transition
      lastScrollY = lerp(lastScrollY, targetScrollY, 0.1);
      setLerpedScrollY(lastScrollY);

      animationFrame = requestAnimationFrame(handleSmoothScroll);
    };

    window.addEventListener("scroll", () => {
      cancelAnimationFrame(animationFrame); // Stop previous animation
      animationFrame = requestAnimationFrame(handleSmoothScroll);
    });

    return () => {
      window.removeEventListener("scroll", handleSmoothScroll);
      cancelAnimationFrame(animationFrame); // Cleanup
    };
  }, []);

  return (
    <main className="relative w-full overflow-hidden font-primary">
      {/* Section 1: Hero Section with Parallax */}
      <section
        className="min-h-[100vh] w-full relative flex items-center justify-center"
        ref={(el) => (sectionRefs.current.section1 = el)}
        data-section="section1"
      >
        <div className="absolute inset-0 z-10 parallax-background" style={{ backgroundPositionY: lerpedScrollY * 0.5 }}>
          <Image
            src="/images/about-poster.jpg"
            alt="About Poster"
            layout="fill"
            objectFit="cover"
            quality={75}
            priority 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-20"></div>

        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={100}
              height={30}
              className="h-6 sm:h-7 md:h-8"
              priority={false} // Defer loading for less critical images
            />
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
              className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
          </nav>
        </header>

        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 md:px-16"
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
            className="text-3xl sm:text-4xl md:text-5xl font-primary uppercase leading-wide tracking-wide text-shadow-strong font-semibold text-white mb-4"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About us
          </motion.h2>
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl text-shadow-strong font-light text-white text-opacity-80 mb-6"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            MARDI HOLDING
          </motion.h2>
        </motion.div>
      </section>

      {/* Section 2: Our Story */}
      <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section2 = el)}
        data-section="section2"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-full sm:max-w-11/12 md:max-w-10/12"
          initial="hidden"
          animate={visibleSections.section2 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-6"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Story
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="md:w-1/2 pr-4"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed galaxy-fold:text-balanced tracking-normal mb-6">
                Mardi Holding is a construction and development company that
                unifies construction, architectural, tourism, transportation and
                real estate companies, wine and cigar factories, as well as
                hotel and restaurant complexes. The history of the holding dates
                back to the 1990s, when two friends founded the Mardi fast food
                cafe.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed tracking-normal">
                Mardi offered healthy and delicious pastry to Batumi students
                for an affordable price. Years later, this success became the
                basis for a bigger challenge - to establish "Mardi Holding"
                construction and development company. With a full Georgian
                capital and hardworking team of professionals it stands on one
                of the leading positions in the Georgian market today.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Subsidiaries */}
      <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section3 = el)}
        data-section="section3"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-full sm:max-w-11/12 md:max-w-10/12"
          initial="hidden"
          animate={visibleSections.section3 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-6"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Subsidiaries
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="md:w-1/2 pr-4"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed galaxy-fold:text-balanced tracking-normal mb-6">
                The holding daughter company "Imeri" is the first producer of
                Georgian cigars. 29 sorts of cigars and cigarillas are produced
                from tobacco leaves grown in Adjara, Keda.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed tracking-normal">
                The outstanding brand of the company is "Adjara Wine House", a
                chateau-type restaurant, which includes a winery, enotheque,
                ethnographic museum, cellar, and a restaurant. Here, in the
                beautiful nature, by the river, you will get acquainted with the
                ancient Georgian traditions, taste the most delicious wine and
                Georgian dishes.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Construction & Development */}
      <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section4 = el)}
        data-section="section4"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-full sm:max-w-11/12 md:max-w-10/12"
          initial="hidden"
          animate={visibleSections.section4 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-6"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Construction & Development
          </motion.h2>
          <motion.p
            className="text-base sm:w-full lg:w-1/2 sm:text-lg md:text-xl text-left leading-relaxed tracking-normal mb-8"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            The main field of business of Mardi Holding is construction and
            development. The facilities under construction are located in
            Batumi, Tbilisi, and Bakuriani. Mardi offers customers both
            residential and apart-hotel services in both under-construction
            and completed hospitality complexes.
          </motion.p>
        </motion.div>
      </section>

      {/* Section 5: Company Vision and Goals (Last section on the right) */}
      <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section5 = el)}
        data-section="section5"
      >
        <motion.div
          className="flex flex-col lg:flex-row mx-auto max-w-full sm:max-w-11/12 md:max-w-10/12"
          initial="hidden"
          animate={visibleSections.section5 ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          {/* Company Vision (Right aligned) */}
          <motion.div
            className="lg:w-1/2 lg:ml-auto"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-6">
              Company Vision and Goals
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed tracking-normal mb-6">
              Mardi Holding is led by a young, creative and professional team,
              which aims to offer customers a big variety of quality products.
              Our starting point is the protection of the environment and the
              economic development of the region.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Us Button */}
      <section className="w-full py-10 bg-white flex justify-end pr-[10vw]">
        <motion.button
          className="button-contact text-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/contact" passHref>
            <span className="text-white tracking-normal leading-relaxed px-10 py-4 text-lg font-semi-bold">
              Contact Us
            </span>
          </Link>
        </motion.button>
      </section>
    </main>
  );
});

export default About;
