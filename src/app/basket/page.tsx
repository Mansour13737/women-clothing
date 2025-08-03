'use client';

import { useCart, useUI } from '@/store/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function BasketPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { addNotification } = useUI();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    addNotification({
      type: 'info',
      message: 'Item removed from cart',
      duration: 2000
    });
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
    addNotification({
      type: 'success',
      message: 'Cart updated',
      duration: 2000
    });
  };

  const handleClearCart = () => {
    clearCart();
    addNotification({
      type: 'info',
      message: 'Cart cleared',
      duration: 2000
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      addNotification({
        type: 'success',
        message: 'Order placed successfully!',
        duration: 3000
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dcdddc] to-[#f5f5f5] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full mx-4 text-[13px] max-w-md text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold text-[#262013] mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-[#262013]/70 font-serif">
              Looks like you haven&apos;t added any items to your cart yet
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="bg-[#262013] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#262013]/90 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dcdddc] to-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold text-[#262013]">
              Shopping Cart
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-[#262013]/70 font-serif">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-display font-bold text-[#262013]">
                  Cart Items
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        {item.size && (
                          <div className="absolute -top-2 -right-2 bg-[#262013] text-white text-xs px-2 py-1 rounded">
                            {item.size}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-[#262013] mb-1">{item.name}</h3>
                        <p className="text-sm text-[#262013]/60 mb-2">
                          ${item.price}
                          {item.color && ` • ${item.color}`}
                        </p>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-[#262013]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-display font-bold text-[#262013] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#262013]/70">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#262013]/70">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#262013]/70">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-[#262013]">Total</span>
                    <span className="text-lg font-bold text-[#262013]">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${isCheckingOut
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#262013] text-white hover:bg-[#262013]/90'
                  }`}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#262013]/60">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 