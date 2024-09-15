"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image'; // For logo optimization

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Preload Hero Image */}
      <link
        rel="preload"
        as="image"
        href="/images/contact.jpeg" // Preloading contact.jpeg
        type="image/jpeg"
        importance="high"
      />

      {/* Hero Section */}
      <section
        className="relative min-h-[40vh] md:min-h-[60vh] bg-fixed bg-cover bg-center pt-20 flex flex-col justify-center"
        style={{
          backgroundImage: "url('/images/contact.jpeg')", // Keep contact.jpeg
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Header */}
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
              className="relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={`relative transition-colors duration-200 font-bold text-xs sm:text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
            >
              About Us
            </Link>
          </nav>
        </header>
        {/* Updated Overlay Gradient */}
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
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-2xl md:text-3xl text-[#333333] font-bold mb-4"
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
          </div>

          {/* Right Column - Get in Touch */}
          <div className="w-full md:w-1/2">
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
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative">
                  <input type="text" className="custom-input" placeholder="Name" />
                </div>
                <div className="relative">
                  <input type="email" className="custom-input" placeholder="Email" />
                </div>
              </div>
              <div className="relative">
                <input type="text" className="custom-input" placeholder="Mobile Number" />
              </div>
              <div className="relative">
                <textarea className="custom-input" rows="4" placeholder="Message"></textarea>
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
