'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product, Vendor } from '@/types';
import {
  Store,
  Star,
  Package,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

export default function VendorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchVendorData();
    }
  }, [slug]);

  const fetchVendorData = async () => {
    setIsLoading(true);

    // Get vendor info
    const { data: vendorData } = await supabase
      .from('vendors')
      .select('*')
      .eq('store_slug', slug)
      .single();

    if (vendorData) {
      setVendor(vendorData as Vendor);

      // Get vendor products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsData) {
        setProducts(productsData as Product[]);
      }
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner border-primary-600 h-12 w-12" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Store not found</h2>
          <p className="text-gray-500 mb-4">The vendor you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/vendors" className="btn-primary">
            Browse Vendors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary-600 to-primary-800">
          {vendor.store_banner && (
            <img
              src={vendor.store_banner}
              alt={`${vendor.store_name} banner`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Store Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 md:-mt-20 pb-8">
            <div className="flex flex-col md:flex-row md:items-end">
              {/* Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
                {vendor.store_logo ? (
                  <img
                    src={vendor.store_logo}
                    alt={vendor.store_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="h-16 w-16 text-primary-600" />
                )}
              </div>

              {/* Info */}
              <div className="mt-4 md:mt-0 md:ml-6 md:pb-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {vendor.store_name}
                  </h1>
                  {vendor.is_verified && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    4.5 rating
                  </span>
                  <span className="flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    {vendor.total_sales} sales
                  </span>
                  <span className="flex items-center">
                    <Store className="h-4 w-4 mr-1" />
                    {products.length} products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About Store</h2>
              <p className="text-gray-600 text-sm mb-6">
                {vendor.store_description || 'No description available'}
              </p>

              <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm">
                {vendor.business_email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {vendor.business_email}
                  </div>
                )}
                {vendor.business_phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {vendor.business_phone}
                  </div>
                )}
                {vendor.business_address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {vendor.business_address.city}, {vendor.business_address.country}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Commission Rate</span>
                  <span className="font-medium">{vendor.commission_rate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">
                    {new Date(vendor.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Products ({products.length})
            </h2>

            {products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products available from this vendor</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.featured_image || product.images?.[0] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating.toFixed(1)} ({product.review_count})
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
