# Zustand State Management

## Overview
This project uses Zustand for state management with a comprehensive store structure designed for an e-commerce women's clothing store.

## Store Structure

### 1. Auth Store (`authStore.ts`)
Manages user authentication state.

**State:**
- `user`: Current user object
- `isAuthenticated`: Authentication status
- `isLoading`: Loading state for auth operations
- `error`: Error messages

**Actions:**
- `login(email, password)`: User login
- `logout()`: User logout
- `register(name, email, password)`: User registration
- `clearError()`: Clear error messages
- `setUser(user)`: Set user data

**Usage:**
```typescript
import { useAuth } from '@/store/hooks';

const { user, isAuthenticated, login, logout } = useAuth();
```

### 2. Cart Store (`cartStore.ts`)
Manages shopping cart functionality.

**State:**
- `items`: Array of cart items
- `isOpen`: Cart modal state
- `totalItems`: Computed total items count
- `totalPrice`: Computed total price

**Actions:**
- `addItem(item)`: Add item to cart
- `removeItem(id)`: Remove item from cart
- `updateQuantity(id, quantity)`: Update item quantity
- `clearCart()`: Clear all items
- `toggleCart()`: Toggle cart modal
- `openCart()`: Open cart modal
- `closeCart()`: Close cart modal

**Usage:**
```typescript
import { useCart } from '@/store/hooks';

const { items, totalItems, totalPrice, addItem, removeItem } = useCart();
```

### 3. Product Store (`productStore.ts`)
Manages products and filtering.

**State:**
- `products`: All products
- `filteredProducts`: Filtered products
- `selectedProduct`: Currently selected product
- `isLoading`: Loading state
- `error`: Error messages
- Filters: `searchQuery`, `selectedCategory`, `selectedSize`, `selectedColor`, `priceRange`, `sortBy`, `sortOrder`

**Actions:**
- `fetchProducts()`: Load products
- `setSelectedProduct(product)`: Set selected product
- `setSearchQuery(query)`: Set search query
- `setCategory(category)`: Set category filter
- `setSize(size)`: Set size filter
- `setColor(color)`: Set color filter
- `setPriceRange(range)`: Set price range
- `setSortBy(sortBy)`: Set sort field
- `setSortOrder(order)`: Set sort order
- `clearFilters()`: Clear all filters
- `applyFilters()`: Apply current filters

**Usage:**
```typescript
import { useProducts } from '@/store/hooks';

const { 
  filteredProducts, 
  searchQuery, 
  setSearchQuery, 
  fetchProducts 
} = useProducts();
```

### 4. UI Store (`uiStore.ts`)
Manages UI state like modals, theme, and notifications.

**State:**
- `theme`: Current theme (light/dark)
- Modal states: `isLoginModalOpen`, `isRegisterModalOpen`, `isProductModalOpen`, `isFilterModalOpen`
- `isSidebarOpen`: Sidebar state
- Loading states: `isPageLoading`, `isImageLoading`
- `notifications`: Array of notifications

**Actions:**
- `toggleTheme()`: Toggle theme
- `setTheme(theme)`: Set specific theme
- Modal actions: `openLoginModal()`, `closeLoginModal()`, etc.
- Sidebar actions: `toggleSidebar()`, `openSidebar()`, `closeSidebar()`
- Loading actions: `setPageLoading()`, `setImageLoading()`
- Notification actions: `addNotification()`, `removeNotification()`, `clearNotifications()`

**Usage:**
```typescript
import { useUI } from '@/store/hooks';

const { 
  theme, 
  toggleTheme, 
  addNotification, 
  openLoginModal 
} = useUI();
```

### 5. Wishlist Store (`wishlistStore.ts`)
Manages user's wishlist/favorites.

**State:**
- `items`: Array of wishlist items
- `totalItems`: Computed total items count

**Actions:**
- `addToWishlist(product)`: Add product to wishlist
- `removeFromWishlist(productId)`: Remove product from wishlist
- `clearWishlist()`: Clear all wishlist items
- `isInWishlist(productId)`: Check if product is in wishlist
- `toggleWishlist(product)`: Toggle product in wishlist

**Usage:**
```typescript
import { useWishlist } from '@/store/hooks';

const { 
  items, 
  addToWishlist, 
  removeFromWishlist, 
  isInWishlist 
} = useWishlist();
```

## Custom Hooks (`hooks.ts`)

Convenient hooks that provide clean access to store functionality:

- `useAuth()`: Authentication functionality
- `useCart()`: Shopping cart functionality
- `useProducts()`: Products and filtering
- `useUI()`: UI state management
- `useWishlist()`: Wishlist functionality

## Persistence

Some stores use Zustand's persist middleware to save state to localStorage:

- **Auth Store**: Persists user and authentication state
- **Cart Store**: Persists cart items
- **Wishlist Store**: Persists wishlist items

## Notification System

The UI store includes a notification system that can be used throughout the app:

```typescript
const { addNotification } = useUI();

// Add different types of notifications
addNotification({
  type: 'success',
  message: 'Product added to cart!',
  duration: 3000
});

addNotification({
  type: 'error',
  message: 'Failed to load products',
  duration: 5000
});
```

## Example Usage in Components

### Product Card Component
```typescript
import { useCart, useWishlist, useUI } from '@/store/hooks';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useUI();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    addNotification({
      type: 'success',
      message: 'Product added to cart!'
    });
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={() => toggleWishlist(product)}>
        {isInWishlist(product.id) ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
```

### Cart Component
```typescript
import { useCart } from '@/store/hooks';

export default function Cart() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeItem, 
    updateQuantity,
    isOpen,
    closeCart 
  } = useCart();

  return (
    <div className={isOpen ? 'block' : 'hidden'}>
      <h2>Cart ({totalItems} items)</h2>
      <p>Total: ${totalPrice}</p>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Use Custom Hooks**: Always use the custom hooks from `hooks.ts` instead of directly accessing stores
2. **Persistent State**: Use persist middleware for data that should survive page refreshes
3. **Notifications**: Use the notification system for user feedback
4. **Type Safety**: All stores are fully typed with TypeScript
5. **Performance**: Zustand automatically optimizes re-renders

## Files Structure
```
src/store/
├── index.ts          # Main exports
├── authStore.ts      # Authentication store
├── cartStore.ts      # Shopping cart store
├── productStore.ts   # Products and filtering store
├── uiStore.ts        # UI state store
├── wishlistStore.ts  # Wishlist store
├── hooks.ts          # Custom hooks
└── README.md         # This documentation
``` 