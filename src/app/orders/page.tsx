'use client'

import React from 'react';
import { Package, Calendar, CreditCard, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  totalAmount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const OrderHistoryPage = () => {
  // Example order history data (replace with actual data from your backend)
  const orders: Order[] = [
    {
      id: '123456',
      date: '2024-01-10',
      totalAmount: 1500,
      status: 'Delivered',
      items: [
        { name: 'Product A', quantity: 1, price: 500 },
        { name: 'Product B', quantity: 2, price: 500 },
      ],
    },
    {
      id: '789012',
      date: '2024-01-05',
      totalAmount: 2000,
      status: 'Pending',
      items: [
        { name: 'Product C', quantity: 1, price: 1000 },
        { name: 'Product D', quantity: 2, price: 500 },
      ],
    },
    {
      id: '345678',
      date: '2024-01-02',
      totalAmount: 800,
      status: 'Cancelled',
      items: [
        { name: 'Product E', quantity: 1, price: 800 },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Pending':
        return <CheckCircle className="w-5 h-5 text-yellow-500" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Package className="w-6 h-6 text-myColor" />
            <span>Order History</span>
          </h1>

          {/* Order List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {/* Order ID */}
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                  </div>

                  {/* Order Date */}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium">PKR {order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{order.status}</p>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="flex justify-end">
                  <Link
                    href={`/profile/orders/${order.id}`} // Link to order details page
                    className="flex items-center space-x-2 text-myColor hover:text-pink-600 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;