'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { useAuth } from '@/components/providers';
import { Product } from '@/types';

interface WishlistContextType {
  items: Product[];
  itemCount: number;
  isLoading: boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  itemCount: 0,
  isLoading: false,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
  refreshWishlist: async () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemCount = items.length;

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      const guestWishlist = localStorage.getItem('guestWishlist');
      if (guestWishlist) {
        setItems(JSON.parse(guestWishlist));
      }
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('wishlists')
      .select('product:products(*)')
      .eq('user_id', user.id);

    if (data) {
      const products = data.map((item: any) => item.product);
      setItems(products);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (product: Product) => {
    if (!user) {
      const guestWishlist = localStorage.getItem('guestWishlist');
      const items = guestWishlist ? JSON.parse(guestWishlist) : [];
      if (!items.find((p: Product) => p.id === product.id)) {
        items.push(product);
        localStorage.setItem('guestWishlist', JSON.stringify(items));
        setItems(items);
      }
      return;
    }

    const { error } = await supabase.from('wishlists').insert({
      user_id: user.id,
      product_id: product.id,
    });

    if (!error) {
      setItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) {
      const guestWishlist = localStorage.getItem('guestWishlist');
      if (guestWishlist) {
        const items = JSON.parse(guestWishlist).filter((p: Product) => p.id !== productId);
        localStorage.setItem('guestWishlist', JSON.stringify(items));
        setItems(items);
      }
      return;
    }

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (!error) {
      setItems((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((p) => p.id === productId);
  };

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
