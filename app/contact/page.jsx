"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NextImage from "next/image"; // Rename to avoid conflict with native Image()
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  // Preload the Hero Image
  useEffect(() => {
    const img = new window.Image(); // Preload image for faster load
    img.src = "/images/contact.jpeg";
  }, []);

  // Smooth parallax scroll effect for the background image
  useEffect(() => {
    let ticking = false; // Throttle the scroll event

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const parallaxSection = document.querySelector(".parallax-section");
          const scrollPosition = window.scrollY;

          if (parallaxSection) {
            parallaxSection.style.transform = `translateY(${scrollPosition * 0.15}px)`; // Parallax speed set lower for smoother scroll
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoized header to avoid unnecessary re-renders
  const MemoizedHeader = useMemo(
    () => (
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-5 md:py-6 shadow-md z-30 font-medium text-white">
        <Link href="/">
          <NextImage
            src="/images/logo.svg"
            alt="Logo"
            width={100}
            height={30}
            className="h-6 sm:h-7 md:h-8"
            priority
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
    ),
    []
  );

  // Placeholder for API request
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      fields: {
        TITLE: "Contact Request",
        NAME: e.target.name.value,
        EMAIL: [{ VALUE: e.target.email.value, VALUE_TYPE: "WORK" }],
        PHONE: [{ VALUE: e.target.phone.value, VALUE_TYPE: "WORK" }],
        COMMENTS: e.target.message.value,
      },
    };
  
    console.log("Form Data to Send:", formData);
  
    try {
      // Replace with real Webhook URL after testing
      const response = await fetch("https://example.com/real-webhook-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Response from Webhook:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section
        className="parallax-section relative min-h-[40vh] md:min-h-[60vh] bg-fixed bg-cover bg-center pt-20 flex flex-col justify-center"
        style={{
          backgroundImage: "url('/images/contact.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      >
        {MemoizedHeader}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent opacity-90"></div>

        {/* Animated Contact Us Text */}
        <motion.div
          className="relative z-10 text-white text-left px-6 md:ml-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold uppercase mb-2 md:mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="mt-2 md:mt-4 text-lg md:text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            We're available to assist you with any questions or concerns.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 py-10 md:py-16 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          {/* Left Column - Head Office */}
          <div className="w-full mt-20 md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-2xl md:text-3xl  text-[#333333] font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            >
              Head Office
            </motion.h2>
            <motion.p
              className="text-base md:text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              Mardi Holding
            </motion.p>
            <motion.p
              className="text-base md:text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            >
              Batumi, Georgia
            </motion.p>
            <motion.p
              className="mt-4 text-base md:text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
            >
              Phone: +995 568 60 60 60
            </motion.p>

            {/* Social Icons */}
            <motion.div
              className="flex space-x-6 mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
            >
              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com/MardiHolding/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faFacebook} className="text-blue-900 text-2xl" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/company/mardi-holding/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-blue-900 text-2xl" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/mardi_holding/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faInstagram} className="text-blue-900 text-2xl" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Get in Touch */}
          <div className="w-full mt-20 md:w-1/2">
            <motion.h2
              className="text-2xl md:text-3xl text-[#333333] font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              Get in Touch
            </motion.h2>
            <motion.form
              className="space-y-4 md:space-y-6 custom-form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative">
                  <input type="text" name="name" className="custom-input" placeholder="Name" required />
                </div>
                <div className="relative">
                  <input type="email" name="email" className="custom-input" placeholder="Email" required />
                </div>
              </div>
              <div className="relative">
                <input type="text" name="phone" className="custom-input" placeholder="Mobile Number" required />
              </div>
              <div className="relative">
                <textarea name="message" className="custom-input" rows="4" placeholder="Message" required></textarea>
              </div>

              <motion.button
                type="submit"
                className="button-assist-form border text-[#88888] border-[#808080] p-1.5 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <span>Send Message</span>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-input {
          border: none;
          border-bottom: 1px solid #333333;
          width: 100%;
          padding: 8px 0;
          background: transparent;
          outline: none;
        }

        .custom-input::placeholder {
          color: #808080;
        }

        .button-assist-form {
          display: inline-flex;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          text-transform: uppercase;
          border-radius: 0.5rem;
          border: 1px solid #333333;
          color: #333333;
          background-color: transparent;
          cursor: pointer;
          transition: background-color 0.4s ease, color 0.4s ease, transform 0.2s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
          margin-top: 1.5rem;
        }

        .button-assist-form::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 100%;
          background: rgba(51, 51, 51, 0.2);
          transition: left 0.5s ease-in-out;
          z-index: 1;
        }

        .button-assist-form:hover::before {
          left: 0;
        }

        .button-assist-form:hover {
          background: linear-gradient(to right, rgba(51, 51, 51, 0.2), rgba(51, 51, 51, 0.1));
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(51, 51, 51, 0.6);
          border-color: #333333;
        }

        .button-assist-form span {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default Contact;
