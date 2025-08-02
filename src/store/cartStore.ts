'use client'

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  getTotalPrice: () => number;
}

function calculateTotalItems(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
        );

        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = items.map(item =>
            item.id === existingItem.id &&
            item.size === existingItem.size &&
            item.color === existingItem.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...items, { ...newItem, quantity: 1 }];
        }

        set({
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
        });
      },

      removeItem: (id) => {
        const updatedItems = get().items.filter(item => item.id !== id);
        set({
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const updatedItems = get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );

        set({
          items: updatedItems,
          totalItems: calculateTotalItems(updatedItems),
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0 });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
      }),
    }
  )
);
