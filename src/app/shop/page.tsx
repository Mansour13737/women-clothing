'use client';

import { useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import Image from 'next/image';
import Btn from '../components/Btn';
import Nav from '../components/Nav';
import ProductFilter from '../components/ProductFilter';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { ArrowUp } from 'lucide-react'; // از آیکون‌های Lucide برای دکمه برگشت بالا

export default function Shop() {
  const scrollToNextSection = useCallback(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="w-full relative h-auto flex flex-col items-center bg-[#dcdddc]">
      {/* Header */}
      <div
        id="shop-header"
        className="relative bg-[url('/header.png')] w-full h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-start"
      >
        <Nav />

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="p-6 rounded-xl text-center mt-[25%] max-w-lg"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#262013] font-display tracking-widest">
            Discover Timeless Elegance
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-700 font-light">
            Explore our curated collection of classic & contemporary fashion.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Btn style="text-[11px] absolute font-extralight border-gray-500 px-6 py-2 top-[43%] left-[13%] bg-[#262013] rounded-[3px] border-1 font-sans tracking-wider text-white/90">
            EXPLORE MORE
          </Btn>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Image
            id="down"
            src="/icons/down-white.svg"
            alt="Scroll down"
            width={40}
            height={40}
            onClick={scrollToNextSection}
            className="cursor-pointer opacity-50 absolute bottom-[5%] left-[50%] -translate-x-[50%]"
          />
        </motion.button>
      </div>

      {/* Sticky Filter */}
      <div className="sticky top-[5vh] z-30 w-full backdrop-blur-lg bg-[#262013]/70">
        <Text
          style="
            text-[16px] 
            font-display 
            font-semibold 
            tracking-widest 
            text-[#dcdddc] 
            text-center 
            py-3
          "
        >
          SHOP
        </Text>
        <ProductFilter />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <ProductCard
            key={idx}
            title="Linen Wrap Dress"
            price={129}
            oldPrice={159}
            rating={4.8}
            reviewCount={200}
            imageSrc="/clothes/1.png"
            colors={['#f5f5f5', '#1a1a1a', '#d2b48c']}
          />
        ))}
      </div>

      {/* Newsletter */}
      <div className="w-full bg-[#1f1f1f] text-[#f5f5f5] px-8 py-16 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-wide mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Be the first to know about new arrivals, sales & exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md w-full sm:w-72 text-[#1f1f1f]"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#f5f5f5] text-[#1f1f1f] rounded-md font-display tracking-wider hover:bg-white transition"
          >
            <span>Sign Me Up</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </form>
      </div>

      {/* Footer / Contact */}
      <div className="w-full bg-[#262013] text-[#dcdddc] px-6 pt-10 pb-6 text-sm relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-display font-semibold text-base mb-3">ABOUT US</h4>
            <p className="text-gray-400">
              We offer a curated selection of timeless clothing made from premium materials. Every piece is crafted with care for the modern wardrobe.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-base mb-3">CONTACT</h4>
            <p className="text-gray-400">Email: support@timelesswear.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-400">Location: Los Angeles, CA</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-base mb-3">FOLLOW US</h4>
            <div className="flex gap-4 mt-2">
              <Contact style="flex gap-4 items-center" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-500 text-xs">
          © 2025 Timeless Wear. All rights reserved.
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 z-50 bg-[#1f1f1f] hover:bg-[#333] text-white rounded-full p-3 shadow-lg transition"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
