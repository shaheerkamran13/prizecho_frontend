// context/CartContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  available: boolean
  selectedOptions: { size?: string; color?: string }
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  calculateSubtotal: () => number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      // If item already exists, update the quantity
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      // If item doesn't exist, add it to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, calculateSubtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}