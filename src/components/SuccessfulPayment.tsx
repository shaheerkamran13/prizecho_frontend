'use client'

import React from 'react';
import { CheckCircle, ShoppingBag, ArrowLeft, Package, Calendar, CreditCard, Box } from 'lucide-react';
import Link from 'next/link';

const SuccessfulPaymentPage = () => {
  // Example order details (replace with actual data from your backend)
  const orderDetails = {
    orderId: '123456',
    date: '2024-01-10',
    totalAmount: 1500,
    items: [
      { name: 'Product A', quantity: 1, price: 500 },
      { name: 'Product B', quantity: 2, price: 500 },
    ],
    paymentMethod: 'Credit Card',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-semibold mt-6">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been successfully processed.
          </p>

          {/* Enhanced Order Details */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg text-left space-y-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Package className="w-6 h-6 text-myColor" />
              <span>Order Details</span>
            </h2>

            {/* Order ID and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Box className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Order ID:</span>
                </div>
                <p className="text-gray-700 mt-1">{orderDetails.orderId}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Order Date:</span>
                </div>
                <p className="text-gray-700 mt-1">{orderDetails.date}</p>
              </div>
            </div>

            {/* Payment Method and Total Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Payment Method:</span>
                </div>
                <p className="text-gray-700 mt-1">{orderDetails.paymentMethod}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Total Amount:</span>
                </div>
                <p className="text-gray-700 mt-1">₹{orderDetails.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium mb-3">Items Purchased</h3>
              <ul className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Box className="w-4 h-4 text-gray-500" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-gray-700">
                      {item.quantity} x ₹{item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="bg-myColor text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>
            <Link
              href="/profile/orders"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>View Order History</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPaymentPage;