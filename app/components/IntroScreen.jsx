// components/IntroScreen.jsx

"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function IntroScreen({ onIntroEnd }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    if (isIntroComplete) {
      if (onIntroEnd) onIntroEnd(); // Call the callback when intro finishes
    }
  }, [isIntroComplete, onIntroEnd]);

  // Set the intro duration to 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsIntroComplete(true);
    }, 3000); // Intro lasts for 3 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isIntroComplete ? 'hidden' : ''}`}>
      {/* Background gradient for the entire screen */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black z-0"></div>
      
      {/* Motion wrapper for the logo */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1, // Time for one bounce cycle
          ease: "easeInOut",
          repeat: Infinity, // Repeat the bounce indefinitely
        }}
        className="relative z-10"
      >
        <Image src="/images/logo.svg" alt="Logo" width={70} height={20} /> {/* Small Logo */}
      </motion.div>
    </div>
  );
}
