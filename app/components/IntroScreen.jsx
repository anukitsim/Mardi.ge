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

  // Increase the intro duration to 8 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsIntroComplete(true);
    }, 8000); // Adjust the duration as needed
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
          duration: 2, // Increase the animation duration
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="relative z-10"
      >
        <Image src="/images/logo.svg" alt="Logo" width={70} height={20} />
      </motion.div>
    </div>
  );
}
