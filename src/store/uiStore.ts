import { create } from 'zustand';

interface UIState {
  // Theme
  theme: 'light' | 'dark';
  
  // Modals
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isProductModalOpen: boolean;
  isFilterModalOpen: boolean;
  
  // Sidebar
  isSidebarOpen: boolean;
  
  // Loading states
  isPageLoading: boolean;
  isImageLoading: boolean;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  
  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Modal actions
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  openProductModal: () => void;
  closeProductModal: () => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  
  // Sidebar actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  
  // Loading actions
  setPageLoading: (loading: boolean) => void;
  setImageLoading: (loading: boolean) => void;
  
  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'light',
  
  // Modals
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isProductModalOpen: false,
  isFilterModalOpen: false,
  
  // Sidebar
  isSidebarOpen: false,
  
  // Loading states
  isPageLoading: false,
  isImageLoading: false,
  
  // Notifications
  notifications: [],

  // Theme actions
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    
    // Update document class for CSS
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  },

  setTheme: (theme) => {
    set({ theme });
    
    // Update document class for CSS
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  },

  // Modal actions
  openLoginModal: () => {
    set({ isLoginModalOpen: true });
  },

  closeLoginModal: () => {
    set({ isLoginModalOpen: false });
  },

  openRegisterModal: () => {
    set({ isRegisterModalOpen: true });
  },

  closeRegisterModal: () => {
    set({ isRegisterModalOpen: false });
  },

  openProductModal: () => {
    set({ isProductModalOpen: true });
  },

  closeProductModal: () => {
    set({ isProductModalOpen: false });
  },

  openFilterModal: () => {
    set({ isFilterModalOpen: true });
  },

  closeFilterModal: () => {
    set({ isFilterModalOpen: false });
  },

  // Sidebar actions
  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },

  openSidebar: () => {
    set({ isSidebarOpen: true });
  },

  closeSidebar: () => {
    set({ isSidebarOpen: false });
  },

  // Loading actions
  setPageLoading: (loading) => {
    set({ isPageLoading: loading });
  },

  setImageLoading: (loading) => {
    set({ isImageLoading: loading });
  },

  // Notification actions
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };

    set({ notifications: [...get().notifications, newNotification] });

    // Auto remove notification after duration
    setTimeout(() => {
      get().removeNotification(id);
    }, newNotification.duration);
  },

  removeNotification: (id) => {
    set({
      notifications: get().notifications.filter(notification => notification.id !== id)
    });
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
})); 