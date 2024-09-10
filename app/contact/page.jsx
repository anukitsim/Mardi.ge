"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact.webp')",
        }}
      >
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
        {/* Updated Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent opacity-90"></div>

        {/* Animated Contact Us Text */}
        <motion.div
          className="relative z-10 text-white text-left flex flex-col justify-center ml-16 items-start h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p
            className="mt-4 text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            We're available to assist you with any questions or concerns.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 py-16 px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-3xl text-[#333333] font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            >
              Head Office
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              Mardi Holding
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            >
              123 Main St, Batumi, Georgia
            </motion.p>
            <motion.p
              className="mt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
            >
              Phone: +995-555-123456
            </motion.p>
          </div>

          <div className="md:w-1/2">
            <motion.h2
              className="text-3xl text-[#333333] font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              Get in Touch
            </motion.h2>
            <motion.form
              className="space-y-6 custom-form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
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

              {/* Button styled like 'button-assist-small' with updated colors */}
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

      {/* Add custom styles */}
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
          margin-top: 2rem;
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
