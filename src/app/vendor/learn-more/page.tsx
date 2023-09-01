'use client';

import Link from 'next/link';
import { Store, DollarSign, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function VendorLearnMorePage() {
  const benefits = [
    {
      icon: Users,
      title: 'Reach Millions',
      description: 'Access our global customer base of over 1 million active shoppers.',
    },
    {
      icon: DollarSign,
      title: 'Low Fees',
      description: 'Competitive commission rates starting at just 10% per sale.',
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Powerful analytics and tools to help you scale your store.',
    },
    {
      icon: Store,
      title: 'Your Own Storefront',
      description: 'Customizable store page to showcase your brand and products.',
    },
  ];

  const features = [
    'Easy product management',
    'Secure payment processing',
    'Shipping integration',
    'Customer reviews and ratings',
    'Promotional tools',
    '24/7 vendor support',
    'Detailed sales analytics',
    'AI-powered product descriptions',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sell on MarketHub
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Join thousands of successful vendors and reach millions of customers worldwide.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/vendor/register" className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100">
              Start Selling
            </Link>
            <Link href="/vendor/terms" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10">
              View Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Sell on MarketHub?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <TrendingUp className="h-32 w-32 text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Join our community of successful vendors and start growing your business today.
          </p>
          <Link
            href="/vendor/register"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100"
          >
            Create Your Store
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
