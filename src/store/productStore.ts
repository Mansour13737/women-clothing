import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Filters
  searchQuery: string;
  selectedCategory: string;
  selectedSize: string;
  selectedColor: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
  
  // Actions
  fetchProducts: () => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSize: (size: string) => void;
  setColor: (color: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: 'name' | 'price' | 'rating' | 'newest') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

// Mock products data
const mockProducts: Product[] = [
  {

    id: '1',
    name: 'Elegant Summer Dress',
    price: 89.99,
    originalPrice: 119.99,
    image: '/clothes/1.png',
    images: ['/clothes/1.png', '/clothes/2.png', '/clothes/3.png'],
    description: 'A beautiful summer dress perfect for any occasion',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    rating: 4.5,
    reviews: 128,
    tags: ['summer', 'dress', 'elegant']
    
  },
  {
    id: '2',
    name: 'Casual Blouse',
    price: 45.99,
    image: '/clothes/2.png',
    images: ['/clothes/2.png', '/clothes/1.png'],
    description: 'Comfortable and stylish casual blouse',
    category: 'Tops',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Pink'],
    inStock: true,
    rating: 4.2,
    reviews: 89,
    tags: ['casual', 'blouse', 'comfortable']
  },
  {
    id: '3',
    name: 'Designer Jeans',
    price: 129.99,
    image: '/clothes/3.png',
    images: ['/clothes/3.png'],
    description: 'High-quality designer jeans with perfect fit',
    category: 'Bottoms',
    sizes: ['28', '30', '32', '34'],
    colors: ['Blue', 'Black'],
    inStock: true,
    rating: 4.8,
    reviews: 256,
    tags: ['jeans', 'designer', 'premium']
  }
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  
  // Filters
  searchQuery: '',
  selectedCategory: '',
  selectedSize: '',
  selectedColor: '',
  priceRange: [0, 1000],
  sortBy: 'newest',
  sortOrder: 'desc',

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ 
        products: mockProducts, 
        filteredProducts: mockProducts,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch products', 
        isLoading: false 
      });
    }
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSize: (size) => {
    set({ selectedSize: size });
    get().applyFilters();
  },

  setColor: (color) => {
    set({ selectedColor: color });
    get().applyFilters();
  },

  setPriceRange: (range) => {
    set({ priceRange: range });
    get().applyFilters();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFilters();
  },

  setSortOrder: (order) => {
    set({ sortOrder: order });
    get().applyFilters();
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      selectedCategory: '',
      selectedSize: '',
      selectedColor: '',
      priceRange: [0, 1000],
      sortBy: 'newest',
      sortOrder: 'desc'
    });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, searchQuery, selectedCategory, selectedSize, selectedColor, priceRange, sortBy, sortOrder } = get();
    
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Size filter
    if (selectedSize) {
      filtered = filtered.filter(product => product.sizes.includes(selectedSize));
    }

    // Color filter
    if (selectedColor) {
      filtered = filtered.filter(product => product.colors.includes(selectedColor));
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'newest':
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    set({ filteredProducts: filtered });
  },
})); 