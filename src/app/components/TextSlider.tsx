'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const texts = [
  'Free shipping for orders over €50!',
  'New arrivals every Friday!',
  'Limited-time summer sale – up to 40% off!',
];

export default function TextSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000); // هر ۴ ثانیه
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-3 bg-black text-white flex items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute text-sm sm:text-base text-center"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}