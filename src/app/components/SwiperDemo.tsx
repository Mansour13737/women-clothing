'use client';

import { useCart, useWishlist, useUI } from '@/store/hooks';

export default function SwiperDemo() {
  const { totalItems, totalPrice } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { addNotification } = useUI();

  const handleShowCart = () => {
    addNotification({
      type: 'info',
      message: `Cart has ${totalItems} items worth $${totalPrice.toFixed(2)}`,
      duration: 3000
    });
  };

  const handleShowWishlist = () => {
    addNotification({
      type: 'info',
      message: `Wishlist has ${wishlistItems} items`,
      duration: 3000
    });
  };

  return (
    <div className=" flex gap-2 mt-[1.5%] items-center justify-end w-full mr-3 text-[9px]">
      <button
        onClick={handleShowCart}
        className="bg-[#262013] text-white px-2 py-1 rounded-lg font-medium hover:bg-[#262013]/80 transition-colors"
      >
        🛒 Cart ({totalItems})
      </button>
      <button
        onClick={handleShowWishlist}
        className="bg-[#262013] text-white px-2 py-1 rounded-lg font-medium hover:bg-[#262013]/80 transition-colors"
      >
        ❤️ Wishlist ({wishlistItems})
      </button>
    </div>
  );
} 