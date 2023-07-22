'use client';

import { Store, Users, Globe, Shield, Truck, Headphones } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Vendors', value: '10,000+' },
    { label: 'Products', value: '500,000+' },
    { label: 'Customers', value: '1M+' },
    { label: 'Countries', value: '50+' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'We verify all vendors and ensure secure transactions for every purchase.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a marketplace where buyers and sellers thrive together.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Partnered with top logistics providers for quick and reliable shipping.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our dedicated team is always here to help you with any questions.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MarketHub</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Your trusted multi-vendor marketplace connecting buyers with verified sellers worldwide.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600">
            At MarketHub, we believe in creating a marketplace that empowers small businesses 
            while providing customers with an unparalleled shopping experience. Our platform 
            bridges the gap between quality vendors and discerning buyers, fostering a community 
            built on trust, transparency, and mutual success.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              MarketHub was founded in 2024 with a simple vision: to create a marketplace where 
              anyone can start a business and reach customers worldwide. What began as a small 
              startup has grown into a thriving platform serving millions of customers and 
              thousands of vendors.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and improve, always putting our community first. 
              Whether you&apos;re a small business owner looking to expand or a shopper searching 
              for unique products, MarketHub is here for you.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
            <Globe className="h-32 w-32 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
