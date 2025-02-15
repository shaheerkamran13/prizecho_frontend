'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SeeAllProductsProps {
  title: string;
  children: React.ReactNode;
  initialItemCount?: number;
}

const SeeAllProducts = ({ title, children, initialItemCount = 4 }: SeeAllProductsProps) => {
  const [showAll, setShowAll] = useState(false);

  // Determine how many items to display based on the "showAll" state
  const items = React.Children.toArray(children);
  const visibleItems = showAll ? items : items.slice(0, initialItemCount);

  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {items.length > initialItemCount && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-2 text-myColor hover:text-pink-600 transition-colors"
          >
            <span>{showAll ? 'Show Less' : 'See All'}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {/* Render the visible items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleItems.map((item, index) => (
          <div key={index} className="w-full">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeAllProducts;