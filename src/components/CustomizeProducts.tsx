import React from 'react';

interface CustomizeProductsProps {
  options: {
    sizes: string[];
    colors: string[];
  };
  onSelect: (selectedOptions: { size: string; color: string }) => void;
}

export default function CustomizeProducts({ options, onSelect }: CustomizeProductsProps) {
    const handleSelect = (type: 'size' | 'color', value: string) => {
        onSelect({ [type]: value } as { size: string; color: string });
      };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a color</h4>
      <ul className="flex items-center gap-3">
        {options.colors.map((color, index) => (
          <li
            key={index}
            className={`w-8 h-8 rounded-full ring-1 ring-gray-300 relative cursor-pointer bg-${color}`}
            onClick={() => handleSelect('color', color)}
          >
            {color === 'red' && (
              <div className="absolute w-10 h-10 ring-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </li>
        ))}
      </ul>
      <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        {options.sizes.map((size, index) => (
          <li
            key={index}
            className={`ring-1 ring-myColor text-myColor rounded-md py-1 px-4 text-sm cursor-pointer ${
              size === 'Medium' ? 'bg-myColor text-white' : ''
            }`}
            onClick={() => handleSelect('size', size)}
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  );
}