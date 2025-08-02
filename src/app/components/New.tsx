'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';

const img = [
  {id : 1 , src : '/clothes/1.png', title: 'Elegant Summer Dress'},
  {id : 2 , src : '/clothes/2.png', title: 'Casual Blouse'},
  {id : 3 , src : '/clothes/3.png', title: 'Designer Jeans'},
  {id : 4 , src : '/clothes/1.png', title: 'Evening Gown'},
  {id : 5 , src : '/clothes/2.png', title: 'Business Suit'},
  {id : 6 , src : '/clothes/3.png', title: 'Casual Dress'},
];

export default function New() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (img.length - 2)); // -2 because we show 3 at once
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (img.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (img.length - 2)) % (img.length - 2));
  };

  return (
    <div id="new" className="w-full h-[23%] relative bg-[#dcdddc] overflow-hidden">
      <div className="flex justify-around items-center h-full px-4">
        {img.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <div key={currentIndex + index} className="flex items-center justify-center">
            <div className="relative">
              <Image 
                src={item.src} 
                width={700} 
                height={700}  
                alt={item.title}
                className="h-40 w-29 object-cover object-center rounded-[2px]" 
                loading="lazy"
              />
              <div className="absolute bottom-2 left-[50%] -translate-x-[50%] bg-black bg-opacity-50 text-white px-2 py-1 text-nowrap overflow-x-clip rounded text-[8px] ">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: img.length - 2 }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#262013] scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
