"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const About = React.memo(() =>{
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


  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
        const sectionId = entry.target.dataset.section;
        if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
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

  // Parallax effect for the background without background-attachment: fixed
  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        requestAnimationFrame(() => {
            if (sectionRefs.current.section1) {
                sectionRefs.current.section1.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
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
        <div className="absolute inset-0 z-10">
        <Image
    src="/images/about-poster.jpg"
    alt="About Poster"
    layout="fill"
    objectFit="cover"
    quality={75}
/>

        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-20"></div>


        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="h-6 sm:h-7 md:h-8"
            />
          </Link>
          <nav className="flex space-x-4 sm:space-x-6 md:space-x-10">
            <Link
              href="/contact"
              className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={`relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base ${
                pathname === "/about" ? "after:w-full" : "after:w-0"
              }`}
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
            className="text-3xl sm:text-4xl md:text-5xl font-primary uppercase leading-wide tracking-wide text-shadow-strong font-semibold text-white"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About us
          </motion.h2>
          <motion.h2
            className="mt-2 sm:mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-shadow-strong font-light text-white text-opacity-80"
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
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10" // Ensure this section comes above
        ref={(el) => (sectionRefs.current.section2 = el)}
        data-section="section2"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-10/12"
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
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-10 lg:mb-20"
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
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed galaxy-fold:text-balanced tracking-normal">
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
 {/* Section 5: Construction and Development */}
 <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section5 = el)}
        data-section="section5"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-10/12"
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
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-10 lg:mb-20"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Construction & Development
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="md:w-1/2 pr-4 galaxy-fold:w-full"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-left leading-relaxed tracking-normal">
                The main field of business of Mardi Holding is construction and
                development. The facilities under construction are located in
                Batumi, Tbilisi, and Bakuriani. Mardi offers customers both
                residential and apart-hotel services in both under-construction
                and completed hospitality complexes.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* Section 3: Parallax Background */}
      <section
        className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section3 = el)}
        data-section="section3"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-10/12"
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
          <div className="flex flex-col items-start space-y-12">
            <motion.div
              className="w-full h-[85vh] flex justify-start items-center relative text-white bg-cover bg-no-repeat bg-center lg:bg-fixed"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                backgroundImage: "url('/images/cigarr.jpeg')",
                backgroundPosition: "end",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>

              <p className="relative galaxy-fold:w-full z-10 text-base sm:text-lg md:text-xl w-full sm:w-2/3 text-left p-10 leading-relaxed tracking-normal">
                The holding daughter company "Imeri" is the first producer of
                Georgian cigars. 29 sorts of cigars and cigarillas are produced
                from tobacco leaves grown in Adjara, Keda.
              </p>
            </motion.div>

            <motion.div
              className="w-full h-[85vh] p-10 flex justify-end items-center relative text-white bg-cover bg-no-repeat bg-center lg:bg-fixed"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                backgroundImage: "url('/images/wine.webp')",
                backgroundPosition: "start",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>
              <p className="relative z-10 galaxy-fold:w-full text-base sm:text-lg md:text-xl w-full sm:w-2/3 text-left leading-relaxed tracking-normal">
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

      {/* Section 4: Company Vision */}
      <section
        className="min-h-[50vh] px-4 sm:px-2 md:px-16 lg:py-20 bg-white relative z-10"
        ref={(el) => (sectionRefs.current.section4 = el)}
        data-section="section4"
      >
        <motion.div
          className="flex flex-col mx-auto max-w-10/12"
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
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-5 lg:mb-10"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Company Vision and Goals
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-start items-start space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="md:w-1/2 pr-4"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base galaxy-fold:w-full sm:text-lg md:text-xl text-left leading-relaxed tracking-normal">
                Mardi Holding is led by a young, creative and professional team,
                which aims to offer customers a big variety of quality products;
                Our starting point is the protection of the environment and the
                economic development of the region.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

     
    </main>
  );
});

export default About;
