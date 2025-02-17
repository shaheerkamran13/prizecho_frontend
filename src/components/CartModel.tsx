'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/cartContext'

export default function CartModel() {
  const { cartItems, removeFromCart, calculateSubtotal } = useCart()

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white right-0 flex flex-col gap-6 max-h-[80vh]">
      {!cartItems.length ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>

          {/* Scrollable List */}
          <div className="flex flex-col gap-8 overflow-y-auto max-h-[50vh] pr-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />

                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">
                      PKR {(item.price / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.available ? 'Available' : 'Out of stock'}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-blue-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fixed Bottom Section */}
          <div className="mt-auto">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>PKR {calculateSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout
            </p>

            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 ring-1 ring-gray-300 px-4">
                <Link href="/cart">View Cart</Link>
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                <Link href="/checkout">Checkout</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}