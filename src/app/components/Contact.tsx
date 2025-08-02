'use client';

import SearchIcon from './icons/SearchIcon';
import ProfileIcon from './icons/ProfileIcon';
import BasketIcon from './icons/BasketIcon';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';

interface Style {
  style: string;
}

export default function Contact({ style }: Style) {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className={style} style={{ color: 'inherit' }}>
      <SearchIcon className="w-4 h-4 opacity-90" />
      
      <Link 
        href="/profile" 
        className="inline-flex  items-center justify-center w-4 h-4 opacity-90 hover:opacity-100 transition-opacity duration-200"
      >
        <ProfileIcon id='profile' className="w-full h-full" />
      </Link>
      
      <Link 
        href="/basket" 
        className="inline-flex items-center justify-center w-4 h-4 opacity-90 hover:opacity-100 transition-opacity duration-200 relative"
      >
        <BasketIcon id='basket' className="w-full h-full" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}
