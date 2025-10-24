'use client';

/**
 * Shopping Cart Context
 * Provides cart state management and actions throughout the application
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product, ProductVariant, CartContextType } from '../types/ecommerce';

// Cart Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; variant?: ProductVariant } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial cart state
const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  currency: 'USD'
};

// Cart reducer
function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variant } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: variant ? product.price + variant.priceModifier : product.price,
          quantity,
          image: product.images[0] || '',
          variant
        };
        newItems = [...state.items, newItem];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      return calculateTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = state.items.filter(item => item.id !== itemId);
        return calculateTotals({ ...state, items: newItems });
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART':
      return initialCart;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

// Calculate cart totals
function calculateTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return {
    ...cart,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100
  };
}

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Props
interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider Component
export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isLoading, setIsLoading] = React.useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const addItem = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    setIsLoading(true);
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variant } });
    setIsLoading(false);
  };

  const removeItem = (itemId: string) => {
    setIsLoading(true);
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    setIsLoading(false);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setIsLoading(true);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    setIsLoading(false);
  };

  const clearCart = () => {
    setIsLoading(true);
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
    setIsLoading(false);
  };

  const getItemCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const contextValue: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    isLoading
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart persistence utilities
export const cartStorage = {
  save: (cart: Cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  load: (): Cart | null => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  }
};

// Cart validation utilities
export const cartValidation = {
  validateItem: (item: CartItem): boolean => {
    return !!(
      item.id &&
      item.productId &&
      item.name &&
      item.price >= 0 &&
      item.quantity > 0
    );
  },

  validateCart: (cart: Cart): boolean => {
    return cart.items.every(item => cartValidation.validateItem(item));
  },

  sanitizeCart: (cart: Cart): Cart => {
    const validItems = cart.items.filter(item => cartValidation.validateItem(item));
    return calculateTotals({ ...cart, items: validItems });
  }
};