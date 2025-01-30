"use client";
import React, { useState } from "react";
import Image from "next/image";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useAuth } from '@/lib/context/UserAuthContext';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  available: boolean;
};

export default function CartModel() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Product Name 1",
      price: 4900,
      quantity: 2,
      image:
        "https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      available: true,
    },
    {
      id: 2,
      name: "Product Name 2",
      price: 7900,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      available: true,
    },
  ]);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100
    );
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Add cookie support
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error(result.error.message || "Checkout failed");
      }
    } catch (error) {
      console.error("Error during Stripe checkout:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems.length ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>

          <div className="flex flex-col gap-8">
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
                      ${(item.price / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.available ? "Available" : "Out of stock"}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-blue-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout
            </p>

            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 ring-1 ring-gray-300 px-4">
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="rounded-md py-3 px-4 bg-black text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}