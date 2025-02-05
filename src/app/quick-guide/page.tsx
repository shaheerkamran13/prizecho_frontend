'use client'
import React from 'react'
import { FaSearch, FaShoppingCart, FaCreditCard, FaTruck, FaExchangeAlt, FaWallet, FaBoxOpen, FaHeadset } from 'react-icons/fa'
import { MdProductionQuantityLimits, MdPayment } from 'react-icons/md'
import Link from 'next/link'

export default function PrizeGuide() {
  const guideSteps = [
    {
        title: "Browsing Products",
        icon: <FaSearch className="w-6 h-6" />,
        points: [
          <>Explore Categories: Navigate through our <Link href="/categories" className="text-myColor hover:underline">product categories</Link> to find what you're looking for. We have a wide range of products to choose from.</>,
          "Search Bar: Use the search bar at the top of the page to quickly find specific items by entering keywords or product names."
        ]
    },
    {
      title: "Product Details",
      icon: <MdProductionQuantityLimits className="w-6 h-6" />,
      points: [
        "Product Information: Click on a product to view detailed information, including descriptions, specifications, pricing, and availability.",
        "Customer Reviews: Read customer reviews and ratings to make an informed decision before purchasing."
      ]
    },
    {
      title: "Adding to Cart",
      icon: <FaShoppingCart className="w-6 h-6" />,
      points: [
        "Select Quantity: Choose the quantity of the product you wish to purchase.",
        "Add to Cart: Click the 'Add to Cart' button to add the selected items to your shopping cart.",
        "The more units of the same product you purchase, the higher your chances of winning that item!"
      ]
    },
    {
      title: "Shopping Cart",
      icon: <FaBoxOpen className="w-6 h-6" />,
      points: [
        "View Cart: Click on the cart icon at the top right corner of the page to view the items in your shopping cart.",
        "Edit Cart: Adjust quantities, remove items, or save items for later."
      ]
    },
    {
      title: "Checkout Process",
      icon: <MdPayment className="w-6 h-6" />,
      points: [
        "Proceed to Checkout: Once you're ready to purchase, click the 'Proceed to Checkout' button.",
        "Enter Shipping Information: Provide your shipping address (Profile> Addresses) and contact details.",
        "Select Payment Method: Choose your preferred payment method (credit/debit card, wallet, etc.).",
        "Review Order: Review your order details and make any necessary changes.",
        "Place Order: Click 'Place Order' to complete your application for the item."
      ]
    },
    {
      title: "Payment and Wallet",
      icon: <FaWallet className="w-6 h-6" />,
      points: [
        "Add Funds to Wallet: You can add funds to your wallet using various payment methods. The minimum amount for wallet recharging is 100 Pakistani Rupees.",
        "Use Wallet Funds: You can use wallet funds to make purchases on our website.",
        "Withdraw Funds: Funds in your wallet cannot be withdrawn to any bank account or other payment methods. Once added, wallet funds can only be used for purchases on Prizecho."
      ]
    },
    {
      title: "Order Tracking and Delivery",
      icon: <FaTruck className="w-6 h-6" />,
      points: [
        "Order Confirmation: You will receive an order confirmation email with your order details.",
        "Track Order: Once you win the product, you will receive a confirmation email with a tracking number. Use this tracking number to monitor the status of your shipment.",
        "Delivery: Your order will be delivered to the provided shipping address within the estimated delivery timeframe."
      ]
    },
    {
        title: "Returns and Exchanges",
        icon: <FaExchangeAlt className="w-6 h-6" />,
        points: [
          <>Return/Exchange Policy: <Link href="/terms-and-policies/returns" className="text-myColor hover:underline">Review our Return and Exchange Policy</Link> for details on how to return or exchange products.</>,
          "Initiate Return/Exchange: Contact our customer service team to initiate a return or exchange. Provide your order number and details of the item(s) you wish to return or exchange.",
          "Receive Authorization: Follow the instructions provided by our customer service team to return the item(s)."
        ]
      },
      {
        title: "Refunds",
        icon: <FaCreditCard className="w-6 h-6" />,
        points: [
          <>Refund Conditions: <Link href="/terms-and-policies/payment" className="text-myColor hover:underline">Review our Refund Policy</Link> for conditions and eligibility.</>,
          "Automated System: If no winner applicant is chosen by our automated systems, money will be refunded to all applicants.",
          "Non-Refundable: There is no refund once you pay or apply for a product."
        ]
       },
    {
      title: "Customer Support",
      icon: <FaHeadset className="w-6 h-6" />,
      points: [
        "Contact Us: If you have any questions or need assistance, our customer support team is here to help. Contact us at support@prizecho.com or +92 334 1818294."
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Prize Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to Prizecho! Here's a step-by-step guide on how our website operates and how you can make the most of it.
        </p>
      </div>

      {/* Guide Steps */}
      <div className="space-y-12">
        {guideSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-myColor/10 rounded-full text-myColor">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-semibold">
                    {index + 1}. {step.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-gray-600">
                      <span className="text-myColor mt-1.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 text-center bg-myColor/5 rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-6">
          Our customer support team is available 24/7 to assist you with any questions or concerns.
        </p>
        <a 
          href="mailto:support@prizecho.com"
          className="inline-block bg-myColor text-white px-8 py-3 rounded-full hover:bg-myColor/90 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}