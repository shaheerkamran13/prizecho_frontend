'use client'
import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface PaymentMethod {
    id: number;
    type: "Visa" | "Mastercard";
    last4: string;
    expiry: string;
    default: boolean;
  }

export const PaymentMethodsSection: React.FC = () => {
    const paymentMethods: PaymentMethod[] = [
      { id: 1, type: "Visa", last4: "4242", expiry: "12/25", default: true },
      { id: 2, type: "Mastercard", last4: "8888", expiry: "09/24", default: false }
    ];
  
    const handleAddCard = () => {
      console.log('Add new card');
    };
  
    const handleEditCard = (id: number) => {
      console.log('Edit card:', id);
    };
  
    const handleDeleteCard = (id: number) => {
      console.log('Delete card:', id);
    };
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Payment Methods</h3>
          <button 
            onClick={handleAddCard}
            className="flex items-center space-x-2 bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Card</span>
          </button>
        </div>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  {method.type === "Visa" ? "Visa" : "MC"}
                </div>
                <div>
                  <p className="font-medium">
                    {method.type} ending in {method.last4}
                    {method.default && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditCard(method.id)}
                  className="text-gray-500 hover:text-myColor"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteCard(method.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  