'use client'
import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Address {
    id: number;
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    default: boolean;
  }

export const AddressesSection: React.FC = () => {
    const addresses: Address[] = [
      {
        id: 1,
        type: "Home",
        name: "Sarah Johnson",
        address: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        phone: "(555) 123-4567",
        default: true
      },
      {
        id: 2,
        type: "Work",
        name: "Sarah Johnson",
        address: "456 Business Ave",
        city: "New York",
        state: "NY",
        zip: "10002",
        phone: "(555) 987-6543",
        default: false
      }
    ];
  
    const handleAddAddress = () => {
      console.log('Add new address');
    };
  
    const handleEditAddress = (id: number) => {
      console.log('Edit address:', id);
    };
  
    const handleDeleteAddress = (id: number) => {
      console.log('Delete address:', id);
    };
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">My Addresses</h3>
          <button 
            onClick={handleAddAddress}
            className="flex items-center space-x-2 bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Address</span>
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4 relative">
              {address.default && (
                <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Default
                </span>
              )}
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">{address.type}</h4>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditAddress(address.id)}
                    className="text-gray-500 hover:text-myColor"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{address.name}</p>
                <p>{address.address}</p>
                <p>{`${address.city}, ${address.state} ${address.zip}`}</p>
                <p>{address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  