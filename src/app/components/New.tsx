'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';

const img = [
  {id : 1 , src : '/clothes/1.jpeg', title: 'Elegant Summer Dress'},
  {id : 2 , src : '/clothes/2.jpg', title: 'Designer Jeans'},
  {id : 3 , src : '/clothes/3.jpg', title: 'Casual Blouse'},
  {id : 4 , src : '/clothes/4.jpg', title: 'Business Suit'},
  {id : 5 , src : '/clothes/5.png', title: 'Evening Gown'},
  {id : 6 , src : '/clothes/6.png', title: 'Casual Dress'},
  {id : 7 , src : '/clothes/7.png', title: 'Casual Dress'},
  {id : 8 , src : '/clothes/8.jpg', title: 'Casual Dress'},//
  {id : 9 , src : '/clothes/9.jpg', title: 'Casual Dress'},
  {id : 10 , src : '/clothes/10.jpg', title: 'Casual Dress'},
  {id : 11 , src : '/clothes/11.jpg', title: 'Casual Dress'},
  {id : 12 , src : '/clothes/12.jpg', title: 'Casual Dress'},
  {id : 13 , src : '/clothes/13.jpg', title: 'Casual Dress'},
  {id : 14 , src : '/clothes/14.jpg', title: 'Casual Dress'},
  {id : 15 , src : '/clothes/15.jpg', title: 'Casual Dress'},
  {id : 16 , src : '/clothes/16.jpg', title: 'Casual Dress'},
  {id : 17 , src : '/clothes/17.jpg', title: 'Casual Dress'},
  {id : 18 , src : '/clothes/18.jpg', title: 'Casual Dress'},
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
    <div id="new" className="w-full mt-[1.5%] h-[23%] relative bg-[#dcdddc]">
      <div className="flex gap-1 justify-around items-center h-full px-4">
        {img.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <div key={currentIndex + index} className="flex items-center justify-center">
            <div className="relative">
              <Image 
                src={item.src} 
                width={300} 
                height={500}  
                alt={item.title}
                className=" object-cover object-center rounded-[2px] shadow-xl" 
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
