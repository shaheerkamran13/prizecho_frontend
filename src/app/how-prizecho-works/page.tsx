'use client'
import React from 'react'
import Link from 'next/link'

export default function HowPrizechoWorks() {
  const concepts = [
    {
      title: "Application-Based Purchasing",
      description: "Unlike traditional e-commerce platforms where you simply buy products outright, at Prizecho, you apply for the products you desire. This unique model democratizes access to a wide range of products, giving every user a fair shot at owning their favorite items."
    },
    {
      title: "Fair Selection Process",
      description: "Transparency and fairness are at the heart of our selection process. Our sophisticated automated system meticulously evaluates all applications and randomly selects a single winner for each product. This method ensures that every participant has an equal opportunity, fostering trust and integrity within our community."
    },
    {
      title: "Increased Chances with Multiple Entries",
      description: "We add an element of anticipation and excitement by allowing multiple entries for each product. The more times you apply, the higher your chances of being selected as the winner. This feature enhances your engagement and makes the shopping experience more thrilling."
    },
    {
      title: "Refund Assurance",
      description: "Your trust and satisfaction are paramount to us. If our system fails to select a winner for a product, rest assured that all applicants will receive a full refund. This guarantee protects your funds and ensures a risk-free experience, allowing you to participate with confidence."
    },
    {
      title: "Building a Community and Fun Environment",
      description: "Prizecho is more than just a shopping platform; it's a vibrant community. We encourage users to interact, share their experiences, and participate in various promotions and events. This sense of community makes shopping on Prizecho not only enjoyable but also socially engaging."
    },
    {
      title: "Enhancing Shopping Accessibility",
      description: "Our mission is to make shopping accessible and enjoyable for everyone. By providing an inclusive platform where users can apply for products and potentially win them, we ensure that everyone has the opportunity to access high-quality items. Our innovative approach breaks down barriers and brings a new level of excitement to online shopping."
    },
    {
      title: "Secure and User-Friendly Wallet System",
      description: "To make transactions seamless, we offer a secure wallet system where users can easily add funds, make purchases, and withdraw money. With a minimum recharge amount of just 100 Pakistani Rupees, our wallet system is designed for convenience and security, enhancing your overall shopping experience."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-6 text-center">The Unique Concept of Prizecho</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
          At Prizecho, we believe in revolutionizing the shopping experience by making it more exciting, fair, and inclusive. Here's a deeper look into how our unique concept works:
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {concepts.map((concept, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-4 text-myColor">{concept.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{concept.description}</p>
          </div>
        ))}
      </div>

      {/* Conclusion Section */}
      <div className="mt-16 bg-myColor/5 rounded-xl p-8 text-center">
        <p className="text-lg text-gray-600 leading-relaxed">
          At Prizecho, we are redefining the way you shop by combining fairness, excitement, and community engagement. Our innovative model ensures that every user has a chance to win their favorite products, making shopping a truly enjoyable and thrilling experience.
        </p>
        <div className="mt-8 space-x-4">
          <Link 
            href="/quick-guide" 
            className="inline-block bg-myColor text-white px-8 py-3 rounded-full hover:bg-myColor/90 transition-colors"
          >
            View Quick Guide
          </Link>
          <Link 
            href="/categories" 
            className="inline-block border border-myColor text-myColor px-8 py-3 rounded-full hover:bg-myColor/5 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}