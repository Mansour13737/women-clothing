'use client';

import Image from 'next/image';
import Btn from './Btn';
import { useCartStore } from '../../store/cartStore';

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  colors: string[];
};

export default function ProductCard({
  id,
  title,
  price,
  rating,
  reviewCount,
  imageSrc,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name: title,
      price,
      image: imageSrc,
    });
  };

  return (
    <div className="flex mt-2 font-sans flex-col items-center text-[#262013] px-2 py-[6px] rounded-[6px] bg-[rgba(0,0,0,0.1)] w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px]">
      <Image
        src={imageSrc}
        width={500}
        height={350}
        alt="pic"
        className="w-full h-auto object-cover rounded-[4px]"
      />

      <span className="text-left w-full text-[12px] sm:text-[13px] md:text-[14px] pl-1.5 pt-1 font-semibold leading-tight">
        {title}
      </span>

      <div className="flex justify-between w-full text-[11px] sm:text-[12px] px-1 pt-1">
        <span>${price}</span>
        <span>
          ⭐ {rating}{' '}
          <span className="opacity-70 text-gray-700 text-[10px]">({reviewCount})</span>
        </span>
      </div>

      <Btn 
        style="bg-[#262013] font-display tracking-widest w-full text-center text-white py-[6px] rounded-[6px] mt-3 text-[11px] sm:text-[12px]"
        onClick={handleAddToCart}
      >
        Add To Cart
      </Btn>
    </div>
  );
}
