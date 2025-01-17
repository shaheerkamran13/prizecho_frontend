'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

interface UserData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

interface APIError {
  message: string;
  code: string;
}

const API_BASE_URL = 'http://localhost:8000';

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const getAuthToken = () => {
    const accessToken = localStorage.getItem('access_token');
    return accessToken;
  };

  const handleAuthError = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  const fetchUserData = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const data: UserData = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData(prev => prev ? {
        ...prev,
        [name]: value
      } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const token = getAuthToken();
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/update-profile/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          field: 'username',
          value: userData.username
        }),
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

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
    if (loading) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No user data available</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img 
                  src="/api/placeholder/150/150"
                  alt={userData.username} 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-myColor p-1.5 rounded-full text-white hover:bg-pink-500 transition-colors">
                  <Edit size={14} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900">{userData.username}</h3>
                <p className="text-gray-500">{userData.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(userData.date_joined).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-4">Personal Information</h4>
                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={userData.email}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
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