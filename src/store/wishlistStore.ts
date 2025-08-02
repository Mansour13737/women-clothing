import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './productStore';

interface WishlistState {
  items: Product[];
  
  // Computed values
  totalItems: number;
  
  // Actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      get totalItems() {
        return get().items.length;
      },

      addToWishlist: (product) => {
        const { items } = get();
        const exists = items.find(item => item.id === product.id);
        
        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find(item => item.id === product.id);
        
        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
); 