'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useCart } from '@/context/cartContext'
import toast, { Toaster } from 'react-hot-toast'


export default function page() {
    const { addToCart } = useCart()

    const products = [
        {
          id: 1,
          name: 'Product Name 1',
          price: 4900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 3,
          slug: 'product-1'
        },
        {
          id: 12,
          name: 'Product Name 2',
          price: 5900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 5,
          slug: 'product-12'
        },
        {
          id: 13,
          name: 'Product Name 3',
          price: 6900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 2,
          slug: 'product-13'
        },
        {
          id: 14,
          name: 'Product Name 4',
          price: 7900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 1,
          slug: 'product-14'
        },

        {
          id: 111,
          name: 'Product Name 1',
          price: 4900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 3,
          slug: 'product-111'
        },
        {
          id: 1211,
          name: 'Product Name 2',
          price: 5900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 5,
          slug: 'product-1211'
        },
        {
          id: 1311,
          name: 'Product Name 3',
          price: 6900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 2,
          slug: 'product-1311'
        },
        {
          id: 1411,
          name: 'Product Name 4',
          price: 7900,
          image: 'https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          alternateImage: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
          available: true,
          quantity: 1,
          slug: 'product-1411'
        },
    
        
      ]

      const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
        e.preventDefault() // Prevent link navigation
        e.stopPropagation()
    
        // Add product to cart
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          available: product.available,
          quantity: 1, // Default quantity when adding to cart
          selectedOptions: {} // Empty selected options for now
        })
    
        // Show success toast
        toast.success(
          <div>
            Added <span className="font-semibold">{product.name}</span> (ID: {product.id}) to cart!
          </div>,
          { position: 'bottom-right', duration: 3000 }
        )
      }
    

  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl">New Products</h1>

        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Toaster />

      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/products/${product.slug}`} 
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] group"
        >
          <div className="relative w-full h-80 overflow-hidden">
            {/* Primary Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="25vw"
              className="object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
            />
            
            {/* Alternate Image */}
            <Image
              src={product.alternateImage}
              alt={product.name}
              fill
              sizes="25vw"
              className="object-cover rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
)}


