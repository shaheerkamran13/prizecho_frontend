// components/NavIcons.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CartModel from './CartModel'
import { useCart } from '@/context/cartContext'

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const router = useRouter()
  const { cartItems } = useCart()

  // TEMPORARY LOGIN ATTEMPT, AUTH WILL BE IMPLEMENTED LATER
  const isLoggedIn = false

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push('/login')
    }
    setIsProfileOpen((prev) => !prev)
  }

  // Example notification data
  // const notifications = [
  //   { id: 1, text: 'Your order has been shipped.', time: '2 hours ago' },
  //   { id: 2, text: 'New product available: Summer Collection.', time: '1 day ago' },
  //   { id: 3, text: 'Flash sale starts tomorrow!', time: '3 days ago' },
  // ]

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="flex items-center gap-6 xl:gap-8">
      {/* PROFILE COMPONENT */}
      <div
        className="relative"
        onMouseEnter={() => setIsProfileOpen(true)}
        onMouseLeave={() => setIsProfileOpen(false)}
      >
        <Image
          src={'/profile.png'}
          alt="profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
          aria-label="Profile"
        />

        {/* PROFILE DROPDOWN */}
        {isProfileOpen && (
          <div
            className="absolute p-4 rounded-md top-8 -left-4 bg-white shadow-lg z-50 min-w-[160px] animate-popup transition-opacity duration-500 delay-500"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
            role="menu"
            aria-labelledby="profile-menu"
          >
            <Link
              href={'/profile'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              href={'/orders'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              role="menuitem"
            >
              Orders
            </Link>
            <div className="mt-2 border-t pt-2">
              <button
                onClick={() => console.log('Logout')}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NOTIFICATION COMPONENT
      <div
        className="relative"
        onMouseEnter={() => setIsNotificationOpen(true)}
        onMouseLeave={() => setIsNotificationOpen(false)}
      >
        <Image
          src={'/notification.png'}
          alt="notification"
          width={22}
          height={22}
          className="cursor-pointer"
          aria-label="Notifications"
        />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-xs rounded-full text-white flex items-center justify-center">
          {notifications.length}
        </div> */}

        {/* NOTIFICATION DROPDOWN */}
        {/* {isNotificationOpen && (
          <div
            className="absolute p-4 rounded-md top-8 right-0 bg-white shadow-lg z-50 min-w-[300px] animate-popup transition-opacity duration-200 delay-200"
            onMouseEnter={() => setIsNotificationOpen(true)}
            onMouseLeave={() => setIsNotificationOpen(false)}
            role="menu"
            aria-labelledby="notification-menu"
          >
            <h3 className="text-sm font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="text-sm text-gray-700 hover:bg-gray-100 rounded-md p-2 cursor-pointer"
                  role="menuitem"
                >
                  <p>{notification.text}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <Link
                href={'/notifications'}
                className="text-sm text-myColor hover:text-pink-600"
                role="menuitem"
              >
                View All Notifications
              </Link>
            </div>
          </div>
        )}
      </div> */}

      {/* CART COMPONENT */}
      <div
        className="relative"
        onMouseEnter={() => setIsCartOpen(true)}
        onMouseLeave={() => setIsCartOpen(false)}
      >
        <div className="cursor-pointer">
          <Image
            src={'/cart.png'}
            alt="cart"
            width={22}
            height={22}
            className="cursor-pointer"
            aria-label="Cart"
          />
          {/* Dynamic Cart Item Count */}
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-myColor text-sm rounded-full text-white flex items-center justify-center">
            {totalItemsInCart}
          </div>
        </div>

        {/* CART DROPDOWN */}
        {isCartOpen && (
          <div
            className="absolute p-4 rounded-md right-0 bg-white shadow-lg min-w-[300px] animate-popup transition-opacity duration-500 delay-200"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
            role="menu"
            aria-labelledby="cart-menu"
          >
            <CartModel />
          </div>
        )}
      </div>
    </div>
  )
}