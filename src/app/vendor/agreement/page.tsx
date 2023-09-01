'use client';

import Link from 'next/link';
import { FileSignature, ArrowLeft } from 'lucide-react';

export default function VendorAgreementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/vendor/register" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Registration
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileSignature className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Vendor Agreement</h1>
          <p className="text-gray-500 mt-2">Please review this agreement carefully</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendor Agreement</h2>
            <p className="text-gray-600 mb-4">
              This Vendor Agreement (&quot;Agreement&quot;) is entered into between you (&quot;Vendor&quot;) and 
              MarketHub (&quot;Platform&quot;). By registering as a vendor, you agree to the following terms:
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Platform Services</h3>
            <p className="text-gray-600">
              MarketHub provides an online marketplace platform that connects vendors with potential 
              buyers. We handle payment processing, provide seller tools, and facilitate transactions 
              between you and customers.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Vendor Obligations</h3>
            <p className="text-gray-600 mb-2">As a vendor, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Maintain accurate product listings and inventory</li>
              <li>Fulfill orders within specified timeframes</li>
              <li>Provide excellent customer service</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain appropriate business licenses and permits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Payment Terms</h3>
            <p className="text-gray-600">
              Payments for completed orders will be transferred to your designated account within 
              7-14 business days, minus applicable commission and processing fees. You are responsible 
              for all taxes related to your sales.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h3>
            <p className="text-gray-600">
              You retain all rights to your products and branding. By listing products on MarketHub, 
              you grant us a license to use your product images and descriptions for marketing and 
              promotional purposes.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Limitation of Liability</h3>
            <p className="text-gray-600">
              MarketHub is not liable for any disputes between you and customers, product defects, 
              or shipping issues. You agree to indemnify and hold MarketHub harmless from any claims 
              arising from your products or actions.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By completing your vendor registration, you acknowledge that you have read, understood, 
              and agree to be bound by this Agreement and our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
