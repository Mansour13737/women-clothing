'use client'
import { useEffect, useState } from 'react';
import Contact from "./Contact";
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      animate={{ height: scrolled ? '5.6vh' : '8vh' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="
        fixed z-[100] flex justify-between items-center w-full
        
        bg-[#1f1a13cc]  /* قهوه‌ای تیره نیمه شفاف */
        backdrop-blur-sm
        px-6
        text-[#f0e9dc]
        shadow-md
      "
    >
      {/* سمت چپ: آیکون ها */}
      <Contact style="flex items-center gap-4 w-fit" />

      {/* سمت راست: متن ساده و شیک */}
      <div className="text-sm font-semibold font-display tracking-wide select-none">
        Timeless Style
      </div>
    </motion.div>
  );
}
