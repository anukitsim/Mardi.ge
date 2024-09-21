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

  // Automatically hide the intro screen after 5 seconds (as fallback)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsIntroComplete(true);
    }, 5000); // Fallback after 5 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-opacity-90 backdrop-blur-xl ${isIntroComplete ? 'hidden' : ''}`}>
      <motion.div
        initial={{ scale: 1 }} // Start at normal size
        animate={{ scale: [1, 1.1, 1] }} // Continuous bounce between 1 and 1.1 scale
        transition={{
          duration: 1, // Time for one bounce cycle
          ease: "easeInOut", // Smooth bounce
          repeat: Infinity, // Repeat the bounce indefinitely
        }}
        style={{ opacity: 1 }} // Ensure opacity remains constant
      >
        <Image src="/images/logo.svg" alt="Logo" width={70} height={20} /> {/* Small Logo */}
      </motion.div>
    </div>
  );
}
