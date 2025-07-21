'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const filters = [
  { label: 'Category', options: ['Dresses', 'Tops', 'Bottoms', 'Outerwear'] },
  { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { label: 'Color', options: ['White', 'Black', 'Beige', 'Olive', 'Brown'] },
  { label: 'Price', options: ['Under $50', '$50 - $100', '$100 - $200', 'Above $200'] },
];

export default function ProductFilter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full top-0 bg-[#262013]/80 backdrop-blur-[1px] text-[#dcdddc] px-4 py-2 z-20 relative"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter, index) => {
          const openToLeft = index >= filters.length - 2;

          return (
            <div key={filter.label} className="relative">
              <button
                onClick={() => toggleFilter(index)}
                className="flex items-center text-[12px] tracking-wider font-sans gap-1 text-sm font-medium bg-[#3a342d] px-2 py-1 rounded-[5px] border border-[#dcdddc]/30 hover:bg-[#50483d] transition-all duration-200"
              >
                {filter.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`
                      absolute top-full mt-2 w-48 rounded-xl border border-[#ffffff1a] shadow-lg z-40 backdrop-blur-md bg-[#3a342d]
                      ${openToLeft ? 'right-0' : 'left-0'}
                    `}
                  >
                    {filter.options.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 text-sm hover:bg-[#50483d] cursor-pointer transition-all"
                      >
                        {option}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
