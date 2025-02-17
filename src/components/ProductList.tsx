'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useCart } from '@/context/cartContext'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductList() {
  const { addToCart } = useCart()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Limited to maximum 10 products
  const products = [
    {
      id: 2,
      name: 'Product Name 1',
      price: 4900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 3,
      slug: 'product-2'
    },
    {
      id: 3,
      name: 'Product Name 2',
      price: 5900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 5,
      slug: 'product-3'
    },
    {
      id: 4,
      name: 'Product Name 3',
      price: 6900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 2,
      slug: 'product-4'
    },
    {
      id: 5,
      name: 'Product Name 4',
      price: 7900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 1,
      slug: 'product-5'
    },

    {
      id: 6,
      name: 'Product Name 5',
      price: 8900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 4,
      slug: 'product-6'
    },


    {
      id: 7,
      name: 'Product Name 1',
      price: 4900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 3,
      slug: 'product-7'
    },
    {
      id: 8,
      name: 'Product Name 2',
      price: 5900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 5,
      slug: 'product-8'
    },
    {
      id: 9,
      name: 'Product Name 3',
      price: 6900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 2,
      slug: 'product-9'
    },
    {
      id: 10,
      name: 'Product Name 4',
      price: 7900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 1,
      slug: 'product-10'
    },
    
    {
      id: 11,
      name: 'Product Name 5',
      price: 8900,
      image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      available: true,
      quantity: 4,
      slug: 'product-11'
    },
    // Add products 6-10 following the same pattern
  ].slice(0, 10) // Ensure maximum 10 products

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

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      available: product.available,
      quantity: 1,
      selectedOptions: {}
    })

    toast.success(
      <div>
        Added <span className="font-semibold">{product.name}</span> (ID: {product.id}) to cart!
      </div>,
      { position: 'bottom-right', duration: 3000 }
    )
  }

  return (
    <div className="mt-12 relative">
      {/* Header with See All link */}
      <div className="mb-8 flex justify-between items-center">
  <h2 className="text-2xl font-semibold">Our Products</h2>
  <Link 
    href="/products" 
    className="text-myColor hover:text-myColorDark transition-colors duration-200 font-medium underline-offset-4 hover:underline"
  >
    See All Products
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

        {/* Products Slider */}
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
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.slug}`} 
              className="min-w-[300px] flex flex-col gap-4 group"
            >
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="300px"
                  className="object-cover rounded-md transition-opacity duration-300 hover:opacity-50"
                />
                <Image
                  src={product.alternateImage}
                  alt={product.name}
                  fill
                  sizes="300px"
                  className="object-cover rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">PKR {product.price / 100}</span>
              </div>
              
              <div className="text-sm text-gray-500">My Description</div>
              
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max transition-colors duration-200"
              >
                Add to Cart
              </button>
            </Link>
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  )
}