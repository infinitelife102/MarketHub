'use client';

import { Truck, Clock, Package, Globe } from 'lucide-react';

export default function ShippingPage() {
  const methods = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: 'Free on orders over $50',
      icon: Package,
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$15.00',
      icon: Truck,
    },
    {
      name: 'Next Day Delivery',
      time: '1 business day',
      cost: '$25.00',
      icon: Clock,
    },
    {
      name: 'International',
      time: '7-14 business days',
      cost: 'Calculated at checkout',
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Truck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Shipping Information</h1>
          <p className="text-gray-500 mt-2">Everything you need to know about shipping</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Shipping Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {methods.map((method) => (
              <div key={method.name} className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <method.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.time}</p>
                  <p className="text-sm text-primary-600">{method.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
            <p className="text-gray-600">
              Orders are typically processed within 1-2 business days. During peak seasons 
              or sales events, processing may take up to 3 business days.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking</h3>
            <p className="text-gray-600">
              Once your order ships, you&apos;ll receive an email with a tracking number. 
              You can also track your order in the &quot;My Orders&quot; section of your account.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">International Shipping</h3>
            <p className="text-gray-600">
              We ship to over 50 countries worldwide. International orders may be subject 
              to customs fees and import duties, which are the responsibility of the recipient.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Issues</h3>
            <p className="text-gray-600">
              If your package is lost or damaged during shipping, please contact our support 
              team within 7 days of the expected delivery date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
