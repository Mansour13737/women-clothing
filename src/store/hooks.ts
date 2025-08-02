import { useAuthStore } from './authStore';
import { useCartStore } from './cartStore';
import { useProductStore } from './productStore';
import { useUIStore } from './uiStore';
import { useWishlistStore } from './wishlistStore';

// Auth hooks
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    logout: store.logout,
    register: store.register,
    clearError: store.clearError,
  };
};

// Cart hooks
export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    totalItems: store.totalItems,
    totalPrice: store.getTotalPrice(),
    isOpen: store.isOpen,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
  };
};

// Product hooks
export const useProducts = () => {
  const store = useProductStore();
  return {
    products: store.products,
    filteredProducts: store.filteredProducts,
    selectedProduct: store.selectedProduct,
    isLoading: store.isLoading,
    error: store.error,
    searchQuery: store.searchQuery,
    selectedCategory: store.selectedCategory,
    selectedSize: store.selectedSize,
    selectedColor: store.selectedColor,
    priceRange: store.priceRange,
    sortBy: store.sortBy,
    sortOrder: store.sortOrder,
    fetchProducts: store.fetchProducts,
    setSelectedProduct: store.setSelectedProduct,
    setSearchQuery: store.setSearchQuery,
    setCategory: store.setCategory,
    setSize: store.setSize,
    setColor: store.setColor,
    setPriceRange: store.setPriceRange,
    setSortBy: store.setSortBy,
    setSortOrder: store.setSortOrder,
    clearFilters: store.clearFilters,
  };
};

// UI hooks
export const useUI = () => {
  const store = useUIStore();
  return {
    theme: store.theme,
    isLoginModalOpen: store.isLoginModalOpen,
    isRegisterModalOpen: store.isRegisterModalOpen,
    isProductModalOpen: store.isProductModalOpen,
    isFilterModalOpen: store.isFilterModalOpen,
    isSidebarOpen: store.isSidebarOpen,
    isPageLoading: store.isPageLoading,
    isImageLoading: store.isImageLoading,
    notifications: store.notifications,
    toggleTheme: store.toggleTheme,
    setTheme: store.setTheme,
    openLoginModal: store.openLoginModal,
    closeLoginModal: store.closeLoginModal,
    openRegisterModal: store.openRegisterModal,
    closeRegisterModal: store.closeRegisterModal,
    openProductModal: store.openProductModal,
    closeProductModal: store.closeProductModal,
    openFilterModal: store.openFilterModal,
    closeFilterModal: store.closeFilterModal,
    toggleSidebar: store.toggleSidebar,
    openSidebar: store.openSidebar,
    closeSidebar: store.closeSidebar,
    setPageLoading: store.setPageLoading,
    setImageLoading: store.setImageLoading,
    addNotification: store.addNotification,
    removeNotification: store.removeNotification,
    clearNotifications: store.clearNotifications,
  };
};

// Wishlist hooks
export const useWishlist = () => {
  const store = useWishlistStore();
  return {
    items: store.items,
    totalItems: store.totalItems,
    addToWishlist: store.addToWishlist,
    removeFromWishlist: store.removeFromWishlist,
    clearWishlist: store.clearWishlist,
    isInWishlist: store.isInWishlist,
    toggleWishlist: store.toggleWishlist,
  };
}; 