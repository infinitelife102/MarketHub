'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/providers';
import {
  Search,
  CheckCircle,
  XCircle,
  Store,
  DollarSign,
  ShoppingBag,
  Eye,
  Edit,
} from 'lucide-react';

interface Vendor {
  id: string;
  store_name: string;
  store_slug: string;
  business_email: string;
  is_verified: boolean;
  is_active: boolean;
  commission_rate: number;
  total_sales: number;
  total_revenue: number;
  created_at: string;
}

export default function AdminVendorsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchVendors();
  }, [user]);

  const fetchVendors = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setVendors(data as Vendor[]);
    }
    setIsLoading(false);
  };

  const toggleVerification = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('vendors')
      .update({ is_verified: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchVendors();
    }
  };

  const updateCommission = async (id: string, rate: number) => {
    const { error } = await supabase
      .from('vendors')
      .update({ commission_rate: rate })
      .eq('id', id);

    if (!error) {
      fetchVendors();
    }
  };

  const filteredVendors = vendors.filter((v) =>
    v.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner border-primary-600 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Vendors</h1>
          <p className="text-gray-500 mt-1">View and manage all vendors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vendors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Store className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{vendor.store_name}</p>
                          <p className="text-sm text-gray-500">{vendor.store_slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{vendor.business_email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vendor.total_sales}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${vendor.total_revenue.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={vendor.commission_rate}
                        onChange={(e) => updateCommission(vendor.id, parseFloat(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="ml-1 text-sm text-gray-500">%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleVerification(vendor.id, vendor.is_verified)}
                          className={`flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            vendor.is_verified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {vendor.is_verified ? (
                            <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
                          ) : (
                            <><XCircle className="h-3 w-3 mr-1" /> Unverified</>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/vendors/${vendor.store_slug}`}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
