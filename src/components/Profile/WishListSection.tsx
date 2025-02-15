'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const WishlistSection: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { id: 1, name: "Wireless Headphones", price: "PKR 129.99", image: "/api/placeholder/80/80" },
    { id: 2, name: "Smart Watch", price: "PKR 199.99", image: "/api/placeholder/80/80" },
    { id: 3, name: "Laptop Backpack", price: "PKR 59.99", image: "/api/placeholder/80/80" }
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const newToast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
    }, 3000);
  };

  const handleAddToCart = (item: WishlistItem) => {
    showToast(`${item.name} has been added to your cart.`);
  };

  const handleRemoveFromWishlist = (itemId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
    showToast("Item has been removed from your wishlist.");
  };

  const removeToast = (toastId: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  return (
    <div className="relative space-y-6">
      {/* Toast Container with improved responsiveness */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-[90vw] sm:max-w-[400px]">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              flex items-center justify-between p-4 rounded-lg shadow-lg w-full
              ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
              text-white
              transform transition-all duration-500 ease-in-out
              animate-[slideIn_0.5s_ease-out]
              hover:translate-x-0
              opacity-90 hover:opacity-100
              backdrop-blur-sm
              border border-white/10
            `}
            style={{
              animation: `
                slideIn 0.5s ease-out,
                fadeIn 0.5s ease-out
              `,
            }}
          >
            <span className="text-sm sm:text-base pr-2">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Wishlist Content with improved responsiveness */}
      <h3 className="text-xl font-semibold">My Wishlist</h3>
      <div className="grid gap-4">
        {wishlistItems.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-4 sm:space-y-0"
          >
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-myColor">{item.price}</p>
              </div>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto justify-end">
              <button 
                onClick={() => handleAddToCart(item)}
                className="px-4 py-2 bg-myColor text-white rounded-md hover:bg-pink-600 transition-colors text-sm sm:text-base"
              >
                Add to Cart
              </button>
              <button
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => handleRemoveFromWishlist(item.id)}
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

export default WishlistSection;