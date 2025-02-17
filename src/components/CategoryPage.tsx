'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'electronics' },
  { id: 2, name: 'Fashion', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'fashion' },
  { id: 3, name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'home-kitchen' },
  { id: 4, name: 'Beauty', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'beauty' },
  { id: 5, name: 'Sports', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'sports' },
  { id: 6, name: 'Electronics', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'electronics' },
  { id: 7, name: 'Fashion', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'fashion' },
  { id: 8, name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'home-kitchen' },
  { id: 9, name: 'Beauty', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'beauty' },
  { id: 10, name: 'Sports', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'sports' },
]

export default function CategoryPage() {
  return (
    <div className="mt-12 relative ">
      {/* Header with See All link */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Shop by Category</h2>
        <Link 
          href="/categories" 
          className="text-myColor hover:text-myColorDark transition-colors duration-200 font-medium underline-offset-4 hover:underline"
        >
          See All Categories
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`} 
            className="group w-full flex flex-col gap-4"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Content Container */}
            <div className="flex flex-col gap-2">
              <span className="font-medium text-lg">{category.name}</span>
              <button className="rounded-full text-myColor ring-1 ring-myColor py-2 px-6 text-sm hover:bg-myColor hover:text-white transition-colors duration-200 w-max">
                View Products
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}