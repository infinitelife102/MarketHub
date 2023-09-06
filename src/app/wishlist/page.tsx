'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/components/providers';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();
  const [addingItems, setAddingItems] = useState<Set<string>>(new Set());

  const handleAddToCart = async (product: any) => {
    setAddingItems((prev) => new Set(prev).add(product.id));
    await addToCart(product, 1);
    setAddingItems((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to view your wishlist
          </h2>
          <p className="text-gray-500 mb-6">
            Save your favorite items and access them from any device
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/login" className="btn-primary">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner border-primary-600 h-12 w-12" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Save items you love to your wishlist and review them anytime
          </p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1">
            {items.length} item(s) saved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.featured_image || product.images?.[0] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${product.price.toFixed(2)}
                </p>
                {product.compare_at_price && (
                  <p className="text-sm text-gray-500 line-through">
                    ${product.compare_at_price.toFixed(2)}
                  </p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingItems.has(product.id)}
                    className="flex-1 btn-primary py-2 text-sm flex items-center justify-center disabled:opacity-50"
                  >
                    {addingItems.has(product.id) ? (
                      <span className="spinner border-white h-4 w-4" />
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-3 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
