"use client"

// components/IntroScreen.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function IntroScreen({ onIntroEnd }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // This effect hides the intro after the parent signals it's ready
  useEffect(() => {
    if (isIntroComplete) {
      if (onIntroEnd) onIntroEnd();  // Call the callback when intro finishes
    }
  }, [isIntroComplete, onIntroEnd]);

  // Manually trigger the end of the intro when the parent tells us
  const endIntro = () => {
    setIsIntroComplete(true);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-500 ${isIntroComplete ? 'hidden' : ''}`}>
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}  // Start smaller (0.3)
        animate={{
          scale: [0.3, 0.5, 0.45],  // Subtle scale from 0.3 to 0.5 with a bounce to 0.45
          opacity: [0, 1, 1],  // Fade in
        }}
        transition={{
          duration: 4,  // Animation duration
          ease: 'easeInOut',
          times: [0, 0.8, 1],  // Bounce effect timing
          repeat: Infinity,  // Keep the bounce effect looping
          repeatType: 'reverse',
        }}
      >
        <Image src="/images/logo.svg" alt="Logo" width={150} height={50} />  {/* Smaller Logo */}
      </motion.div>
    </div>
  );
}
