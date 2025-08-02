'use client';

import { useCallback, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import Image from 'next/image';
import Btn from '../components/Btn';
import Nav from '../components/Nav';
import ProductFilter from '../components/ProductFilter';

import Contact from '../components/Contact';
import { ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'; // از آیکون‌های Lucide برای دکمه برگشت بالا

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
  // Sample products data - in real app this would come from API
  const allProducts = Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    title: "Linen Wrap Dress",
    price: 129,
    oldPrice: 159,
    rating: 4.8,
    reviewCount: 200,
    imageSrc: "/clothes/1.png",
    colors: ['#f5f5f5', '#1a1a1a', '#d2b48c']
  }));

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to product grid when page changes
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <div id="product-grid" className="grid grid-cols-2 gap-2 p-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            imageSrc={product.imageSrc}
            colors={product.colors}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center items-center py-8 px-4">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md transition ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#262013] hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNumber = idx + 1;
                // Show first page, last page, current page, and pages around current
                const shouldShow = 
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                if (!shouldShow) {
                  // Show ellipsis if there's a gap
                  const prevPage = idx > 0 ? idx : null;
                  const nextPage = idx < totalPages - 1 ? idx + 2 : null;
                  
                  if (prevPage && nextPage && 
                      prevPage < currentPage - 2 && 
                      nextPage > currentPage + 2) {
                    return <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      currentPage === pageNumber
                        ? 'bg-[#262013] text-white'
                        : 'text-[#262013] hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md transition ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#262013] hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

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
