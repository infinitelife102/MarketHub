'use client';

import { RotateCcw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

export default function ReturnsPage() {
  const steps = [
    {
      icon: Package,
      title: 'Initiate Return',
      description: 'Log into your account and select the order you want to return.',
    },
    {
      icon: CheckCircle,
      title: 'Get Approval',
      description: 'Our team will review your return request within 24 hours.',
    },
    {
      icon: RotateCcw,
      title: 'Ship Item Back',
      description: 'Print the return label and ship the item back to us.',
    },
    {
      icon: Clock,
      title: 'Receive Refund',
      description: 'Once received, your refund will be processed within 5-7 business days.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <RotateCcw className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Returns & Refunds</h1>
          <p className="text-gray-500 mt-2">Easy returns within 30 days</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Policy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Return Policy</h2>
          <p className="text-gray-600 mb-6">
            We want you to be completely satisfied with your purchase. If you&apos;re not happy 
            with your order, you can return most items within 30 days of delivery for a full 
            refund or exchange.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center font-medium text-green-600 mb-3">
                <CheckCircle className="h-5 w-5 mr-2" />
                Items That Can Be Returned
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Unworn clothing with tags attached</li>
                <li>Unopened electronics</li>
                <li>Unused home goods</li>
                <li>Defective or damaged items</li>
                <li>Incorrect items received</li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center font-medium text-red-600 mb-3">
                <XCircle className="h-5 w-5 mr-2" />
                Non-Returnable Items
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Personalized or custom items</li>
                <li>Intimate apparel</li>
                <li>Perishable goods</li>
                <li>Digital downloads</li>
                <li>Gift cards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How to Return</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-sm font-medium text-primary-600 mb-1">Step {index + 1}</div>
                <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Methods</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Original payment method (5-7 business days)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Store credit (immediate)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Exchange for another item</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Shipping</h3>
            <p className="text-gray-600 mb-3">
              <strong className="text-green-600">Free returns</strong> for defective or incorrect items.
            </p>
            <p className="text-gray-600">
              For other returns, a $5.99 shipping fee will be deducted from your refund, 
              or you can use your own shipping method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
