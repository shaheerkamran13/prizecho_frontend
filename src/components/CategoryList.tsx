'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useFilter } from '@/context/filterContext'

const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'electronics', type: 'electronics', priceRange: [100, 1000] },
  { id: 2, name: 'Fashion', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'fashion', type: 'fashion', priceRange: [50, 500] },
  { id: 3, name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'home-kitchen', type: 'home-kitchen', priceRange: [80, 800] },
  { id: 4, name: 'Beauty', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'beauty', type: 'beauty', priceRange: [20, 200] },
  { id: 5, name: 'Sports', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'sports', type: 'sports', priceRange: [150, 1500] },
  { id: 6, name: 'Electronics', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'electronics', type: 'electronics', priceRange: [100, 1000] },
  { id: 7, name: 'Fashion', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'fashion', type: 'fashion', priceRange: [50, 500] },
  { id: 8, name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'home-kitchen', type: 'home-kitchen', priceRange: [80, 800] },
  { id: 9, name: 'Beauty', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'beauty', type: 'beauty', priceRange: [20, 200] },
  { id: 10, name: 'Sports', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', slug: 'sports', type: 'sports', priceRange: [150, 1500] },
]

export default function CategoryList() {
  const { filters } = useFilter()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const filteredCategories = categories.filter(category => {
    const matchesType = !filters.type || category.type === filters.type
    const matchesPrice = 
      category.priceRange[0] >= filters.minPrice &&
      category.priceRange[1] <= filters.maxPrice
    return matchesType && matchesPrice
  })

  const handleScroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current
    if (container) {
      const scrollAmount = 400 // Adjust this value based on your card width
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })

      // Update arrow visibility
      setShowLeftArrow(newScrollLeft > 0)
      setShowRightArrow(newScrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  return (
    <div className="mt-12 relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
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

      {/* Slider Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-myColor p-3 rounded-full shadow-lg transition-all duration-300"
          >
            ←
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-myColor p-3 rounded-full shadow-lg transition-all duration-300"
          >
            →
          </button>
        )}

        {/* Categories Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          onScroll={(e) => {
            const container = e.currentTarget
            setShowLeftArrow(container.scrollLeft > 0)
            setShowRightArrow(
              container.scrollLeft < container.scrollWidth - container.clientWidth
            )
          }}
        >
          {filteredCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`} 
              className="min-w-[300px] flex flex-col gap-4 group"
            >
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="300px"
                  className="object-cover rounded-md transition-opacity duration-300 hover:opacity-50"
                />
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">{category.name}</span>
              </div>
              
              <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max transition-colors duration-200">
                View Products
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}