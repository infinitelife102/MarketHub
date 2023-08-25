'use client';

import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-500 mt-2">Last updated: March 3, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using MarketHub, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-gray-600">
              You must create an account to use certain features of MarketHub. You are responsible 
              for maintaining the confidentiality of your account credentials and for all activities 
              that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Marketplace Rules</h2>
            <p className="text-gray-600 mb-4">When using our marketplace, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Not engage in fraudulent or deceptive practices</li>
              <li>Respect intellectual property rights</li>
              <li>Not sell prohibited items</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Purchases and Payments</h2>
            <p className="text-gray-600">
              All purchases are subject to availability and confirmation of the order price. 
              Prices are set by individual vendors and may vary. Payment processing is handled 
              by secure third-party providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Returns and Refunds</h2>
            <p className="text-gray-600">
              Return policies are set by individual vendors. Please review each vendor&apos;s return 
              policy before making a purchase. MarketHub facilitates but does not guarantee refunds.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              MarketHub is not liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact</h2>
            <p className="text-gray-600">
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@markethub.com" className="text-primary-600 hover:underline">
                legal@markethub.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
