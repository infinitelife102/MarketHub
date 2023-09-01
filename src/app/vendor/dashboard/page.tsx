'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/providers';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Store,
  Star,
  Users,
  ArrowRight,
  Edit,
  Eye,
} from 'lucide-react';

interface VendorStats {
  totalSales: number;
  totalRevenue: number;
  totalProducts: number;
  totalOrders: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inventory_quantity: number;
  total_sales: number;
  rating: number;
  is_active: boolean;
  featured_image: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function VendorDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [vendor, setVendor] = useState<any>(null);
  const [stats, setStats] = useState<VendorStats>({
    totalSales: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'vendor' && user.role !== 'admin') {
      router.push('/');
      return;
    }
    if (user) {
      fetchVendorData();
    }
  }, [user]);

  const fetchVendorData = async () => {
    setIsLoading(true);

    // Get vendor info
    const { data: vendorData } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (vendorData) {
      setVendor(vendorData);

      // Get stats
      setStats({
        totalSales: vendorData.total_sales || 0,
        totalRevenue: vendorData.total_revenue || 0,
        totalProducts: 0,
        totalOrders: 0,
      });

      // Get products
      const { data: productsData } = await supabase
        .from('products')
        .select('id, name, price, inventory_quantity, total_sales, rating, is_active, featured_image')
        .eq('vendor_id', vendorData.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (productsData) {
        setProducts(productsData);
        setStats((prev) => ({ ...prev, totalProducts: productsData.length }));
      }

      // Get recent orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, total_amount, status, created_at')
        .eq('vendor_id', vendorData.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (ordersData) {
        setRecentOrders(ordersData);
        setStats((prev) => ({ ...prev, totalOrders: ordersData.length }));
      }

      // Generate chart data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      setChartData(
        days.map((day) => ({
          name: day,
          sales: Math.floor(Math.random() * 20),
          revenue: Math.floor(Math.random() * 1000),
        }))
      );
    }

    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vendor Account Required
          </h2>
          <p className="text-gray-500 mb-6">
            You need to register as a vendor to access this page
          </p>
          <Link href="/vendor/register" className="btn-primary">
            Become a Vendor
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-500 mt-1">{vendor.store_name}</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/vendors/${vendor.store_slug}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Store
              </Link>
              <Link
                href="/vendor/products/new"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products & Orders */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
              <Link
                href="/vendor/products"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No products yet. Add your first product!
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.featured_image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          ${product.price} • Stock: {product.inventory_quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <Link
                        href={`/vendor/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link
                href="/vendor/orders"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No orders yet
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{order.order_number}</p>
                      <p className="text-sm text-gray-500">
                        {order.customer_name || 'Guest'} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total_amount.toFixed(2)}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
