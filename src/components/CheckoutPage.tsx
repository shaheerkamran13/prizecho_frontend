'use client'
import React, { useState } from "react";
import { CreditCard, Truck } from 'lucide-react';
import { FaStripe } from "react-icons/fa6";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  available: boolean;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// Set app element for react-modal
if (typeof window !== "undefined") {
  // For Next.js, the root element is often '#__next'
  Modal.setAppElement("#__next");
}

// Define custom styles for Modal
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    width: '400px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Product Name 1",
      price: 4900, // in cents
      quantity: 2,
      image:
        "https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      available: true,
    },
    {
      id: 2,
      name: "Product Name 2",
      price: 7900, // in cents
      quantity: 1,
      image:
        "https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      available: true,
    },
  ]);

  const [isCashOnDeliveryModalOpen, setIsCashOnDeliveryModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  // State to hold the selected payment method: "card", "stripe", or "cod"
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const calculateSubtotal = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) /
      100
    ); // Convert cents to dollars
  };

  const handleCheckout = async () => {
    const stripe = (await stripePromise) as Stripe;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during Stripe checkout:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const handleCashOnDelivery = () => {
    setIsCashOnDeliveryModalOpen(true);
  };

  const confirmCashOnDelivery = () => {
    setIsCashOnDeliveryModalOpen(false);
    toast.success("Order placed successfully! Payment will be collected on delivery.");
  };

  const handleCardPayment = () => {
    setIsCardModalOpen(true);
  };

  const confirmCardPayment = () => {
    setIsCardModalOpen(false);
    toast.success("Card payment processed successfully!");
  };

  // New function to handle order placement based on selected payment method
  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === "card") {
      handleCardPayment();
    } else if (selectedPaymentMethod === "stripe") {
      handleCheckout();
    } else if (selectedPaymentMethod === "cod") {
      handleCashOnDelivery();
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 50; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8" id="__next">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-semibold">PKR {item.price * item.quantity}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between mb-3">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">PKR {subtotal}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold">PKR {shipping}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Total</p>
                  <p className="text-xl font-semibold text-myColor">PKR {total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Methods */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>

              {/* Radio button group for payment method selection */}
              <div className="space-y-4">
                {/* Credit/Debit Card Option */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-myColor transition-colors">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPaymentMethod === "card"}
                    onChange={() => setSelectedPaymentMethod("card")}
                  />
                  <CreditCard className="w-6 h-6 text-gray-500" />
                  <label htmlFor="card" className="cursor-pointer">
                    <span className="font-medium">Credit/Debit Card</span>
                    <br />
                    <span className="text-sm text-gray-500">Pay with your card</span>
                  </label>
                </div>

                {/* Stripe Option */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-myColor transition-colors">
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    checked={selectedPaymentMethod === "stripe"}
                    onChange={() => setSelectedPaymentMethod("stripe")}
                  />
                  <FaStripe className="w-6 h-6 text-gray-500" />
                  <label htmlFor="stripe" className="cursor-pointer">
                    <span className="font-medium">Stripe</span>
                    <br />
                    <span className="text-sm text-gray-500">Pay using Stripe</span>
                  </label>
                </div>

                {/* Cash on Delivery Option */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-myColor transition-colors">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedPaymentMethod === "cod"}
                    onChange={() => setSelectedPaymentMethod("cod")}
                  />
                  <Truck className="w-6 h-6 text-gray-500" />
                  <label htmlFor="cod" className="cursor-pointer">
                    <span className="font-medium">Cash on Delivery</span>
                    <br />
                    <span className="text-sm text-gray-500">Pay when you receive</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                className="w-full bg-myColor text-white px-6 py-3 rounded-md mt-6 hover:bg-pink-600 transition-colors"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cash on Delivery Modal */}
      <Modal
        isOpen={isCashOnDeliveryModalOpen}
        onRequestClose={() => setIsCashOnDeliveryModalOpen(false)}
        style={customModalStyles}
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Cash on Delivery</h2>
        <p className="mb-6">Are you sure you want to proceed with Cash on Delivery?</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => setIsCashOnDeliveryModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-myColor text-white px-4 py-2 rounded-md"
            onClick={confirmCashOnDelivery}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Credit/Debit Card Modal */}
      <Modal
        isOpen={isCardModalOpen}
        onRequestClose={() => setIsCardModalOpen(false)}
        style={customModalStyles}
      >
        <h2 className="text-xl font-semibold mb-4">Enter Card Details</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Expiry Date"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setIsCardModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-myColor text-white px-4 py-2 rounded-md"
              onClick={confirmCardPayment}
            >
              Pay Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
