'use client';

import Image from 'next/image';
import Btn from './Btn';

type ProductCardProps = {
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  colors: string[];
};

export default function ProductCard({
  title,
  price,
  oldPrice,
  rating,
  reviewCount,
  imageSrc,
  colors,
}: ProductCardProps) {
  return (
    <div className="flex flex-col items-center text-[#262013] px-2 py-[6px] rounded-[6px] bg-[rgba(0,0,0,0.1)] w-[160px] sm:w-[160px] md:w-[180px] lg:w-[200px]">
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

      <Btn style="bg-[#262013] font-display tracking-widest w-full text-center text-white py-[6px] rounded-[6px] mt-3 text-[11px] sm:text-[12px]">
        Add To Cart
      </Btn>
    </div>
  );
}
