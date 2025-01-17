// src/components/ProductImages.tsx
'use client'
import Image from 'next/image'
import React, { useState } from 'react'

interface ProductImage {
  id: number;
  image: string;  // Changed from url to image
  order?: number;
}

interface ProductImagesProps {
  images: ProductImage[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className='h-[500px] relative'>
        <Image 
          src="/images/placeholder-product.jpg"
          alt="Product placeholder" 
          fill 
          sizes='30vw' 
          className='object-cover rounded-md'
        />
      </div>
    );
  }

  return (
    <div className=''>
      <div className='h-[500px] relative'>
        <Image 
          src={images[selectedIndex].image}
          alt="" 
          fill 
          sizes='30vw' 
          className='object-cover rounded-md'
        />             
      </div>

      <div className='flex justify-between gap-4 mt-8'>
        {images.map((img, i) => (
          <div 
            className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer'
            key={img.id}
            onClick={() => setSelectedIndex(i)}
          >
            <Image 
              src={img.image}
              alt="" 
              fill 
              sizes='30vw' 
              className={`object-cover rounded-md ${
                selectedIndex === i ? 'ring-2 ring-myColor' : ''
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}