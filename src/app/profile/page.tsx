'use client'

import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  ChevronRight
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/api/placeholder/150/150",
    joinDate: "January 2023",
    orders: 12
  };

  const recentOrders = [
    { id: "#12345", date: "Dec 15, 2024", status: "Delivered", amount: "$156.00" },
    { id: "#12344", date: "Dec 10, 2024", status: "In Transit", amount: "$89.99" },
    { id: "#12343", date: "Dec 05, 2024", status: "Processing", amount: "$234.50" }
  ];

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Personal Info' },
    { id: 'orders', icon: <Package size={20} />, label: 'Orders' },
    { id: 'wishlist', icon: <Heart size={20} />, label: 'Wishlist' },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Addresses' },
    { id: 'payments', icon: <CreditCard size={20} />, label: 'Payment Methods' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { id: 'security', icon: <Lock size={20} />, label: 'Security' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-myColor p-1.5 rounded-full text-white hover:bg-pink-500 transition-colors">
                  <Edit size={14} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {user.joinDate}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-4">Personal Information</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <button className="bg-myColor text-white px-4 py-2 rounded-md hover:bg-myColor transition-colors">
                    Save Changes
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-4">Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive order updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-myColor"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Receive offers and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-myColor"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-myColor hover:text-white">
                        <button className="font-medium">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Section under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors
                      ${activeTab === item.id ? 
                        'bg-blue-50 text-myColor' : 
                        'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <ChevronRight 
                      size={16} 
                      className={`ml-auto transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;