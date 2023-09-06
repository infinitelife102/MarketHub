'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { useAuth } from '@/components/providers';
import { Product } from '@/types';

interface CartItem {
  id: string;
  product_id: string;
  variant_id?: string | null;
  quantity: number;
  price: number;
  product: Product;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number, variantId?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  subtotal: 0,
  isLoading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fetchCart = useCallback(async () => {
    if (!user) {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        setItems(JSON.parse(guestCart));
      }
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', user.id)
      .single();

    if (data && data.items) {
      setItems(data.items as CartItem[]);
    } else {
      // Create cart if doesn't exist
      await supabase.from('carts').insert({
        user_id: user.id,
        items: [],
        subtotal: 0,
        total_amount: 0,
      });
      setItems([]);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const saveCart = async (newItems: CartItem[]) => {
    if (!user) {
      localStorage.setItem('guestCart', JSON.stringify(newItems));
      setItems(newItems);
      return;
    }

    const newSubtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    await supabase
      .from('carts')
      .update({
        items: newItems,
        subtotal: newSubtotal,
        total_amount: newSubtotal,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setItems(newItems);
  };

  const addToCart = async (product: Product, quantity = 1, variantId?: string) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.variant_id === variantId
    );

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      await saveCart(updatedItems);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${variantId || 'default'}-${Date.now()}`,
        product_id: product.id,
        variant_id: variantId || null,
        quantity,
        price: product.price,
        product,
      };
      await saveCart([...items, newItem]);
    }
  };

  const removeFromCart = async (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    await saveCart(updatedItems);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    await saveCart(updatedItems);
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
