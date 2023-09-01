'use client';

import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function VendorTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/vendor/learn-more" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Vendor Terms of Service</h1>
          <p className="text-gray-500 mt-2">Last updated: March 3, 2026</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Vendor Eligibility</h2>
            <p className="text-gray-600">
              To become a vendor on MarketHub, you must be at least 18 years old and have the legal 
              capacity to enter into contracts. You must provide accurate and complete information 
              during the registration process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Product Requirements</h2>
            <p className="text-gray-600 mb-4">All products listed must:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Be legal to sell in your jurisdiction</li>
              <li>Accurately described with clear images</li>
              <li>Priced competitively and fairly</li>
              <li>Be in stock and available for shipping</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Commission and Fees</h2>
            <p className="text-gray-600">
              MarketHub charges a commission on each sale, which varies based on your subscription 
              plan. Standard commission is 10% of the sale price. Payment processing fees are 
              additional and deducted automatically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Shipping and Returns</h2>
            <p className="text-gray-600">
              Vendors are responsible for shipping products within the timeframe specified. You must 
              have a clear return policy and handle return requests promptly. MarketHub reserves the 
              right to intervene in disputes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Account Termination</h2>
            <p className="text-gray-600">
              MarketHub reserves the right to suspend or terminate vendor accounts for violations 
              of these terms, fraudulent activity, or consistently poor customer feedback.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Contact</h2>
            <p className="text-gray-600">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:vendors@markethub.com" className="text-primary-600 hover:underline">
                vendors@markethub.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
