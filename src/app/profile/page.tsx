'use client'

import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  Lock,
  ChevronRight,
  WalletIcon
} from 'lucide-react';

import OrdersSection from '@/components/Profile/OrdersSection';
import { AddressesSection } from '@/components/Profile/AddressesSection';
import { PaymentMethodsSection } from '@/components/Profile/PaymentMethodsSection';
import { ProfileSection } from '@/components/Profile/ProfileSection';
import { NotificationsSection } from '@/components/Profile/NotificationSection';
import SecuritySection from '@/components/Profile/SecuritySection';
import WalletSection from '@/components/Profile/WalletSection';
import DeleteAccount from '@/components/Profile/DeleteAccount';
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

 

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Personal Info' },
    { id: 'orders', icon: <Package size={20} />, label: 'Orders' },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Addresses' },
    { id: 'wallet', icon: <WalletIcon size={20} />, label: 'Wallet' },
    { id: 'payments', icon: <CreditCard size={20} />, label: 'Payment Methods' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { id: 'security', icon: <Lock size={20} />, label: 'Security' },
    { id: 'deleteAccount', icon: <Lock size={20} />, label: 'Delete Account' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection/>
        );

      case 'orders':
        return (
          <OrdersSection/>
        );

      case 'addresses':
        return (
          <AddressesSection/>
        );

      case 'wallet':
        return (
          <WalletSection/>
        );
        
      case 'payments':
        return (
          <PaymentMethodsSection/>
        );
        
      case 'notifications':
        return (
          <NotificationsSection/>
        );
        
      case 'security':
        return (
          <SecuritySection/>
        );

        case 'deleteAccount':
          return (
            <DeleteAccount/>
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