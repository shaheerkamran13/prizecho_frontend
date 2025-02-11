'use client'
import React from 'react';
import {Edit} from 'lucide-react';

const user = {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/api/placeholder/150/150",
    joinDate: "January 2023",
    orders: 12
  };
  
  export const ProfileSection: React.FC = () =>{
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
    )
  }
  

