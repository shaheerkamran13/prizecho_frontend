'use client'
import React from 'react'
import Image from 'next/image'
import { Check, Users, Award, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutUs() {
  // Framer Motion variants for animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Discover the story behind Prizechoo and our commitment to excellence.
        </motion.p>
      </div>

      {/* Our Story Section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
      >
        <motion.div variants={fadeInUp} className="lg:order-2">
          <Image
            src="/about-us-hero.jpg" // Replace with your image
            alt="Our Story"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:order-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-6">
            At Prizechoo, we believe in delivering more than just products - we deliver experiences. Founded in 2023, our mission has been to provide high-quality fashion that empowers individuals to express their unique style.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="w-6 h-6 text-myColor flex-shrink-0" />
              <span className="ml-3 text-gray-600">100% Premium Quality Products</span>
            </li>
            <li className="flex items-start">
              <Check className="w-6 h-6 text-myColor flex-shrink-0" />
              <span className="ml-3 text-gray-600">Sustainable and Ethical Practices</span>
            </li>
            <li className="flex items-start">
              <Check className="w-6 h-6 text-myColor flex-shrink-0" />
              <span className="ml-3 text-gray-600">Global Shipping and Support</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-myColor to-pink-600 py-16 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold">10K+</h3>
            <p className="text-lg">Happy Customers</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white"
          >
            <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold">50K+</h3>
            <p className="text-lg">Products Sold</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white"
          >
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold">15+</h3>
            <p className="text-lg">Awards Won</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white"
          >
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="text-lg">Team Members</p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:order-1"
        >
          <Image
            src="/mission-image.jpg" // Replace with your image
            alt="Our Mission"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:order-2"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to redefine fashion by offering sustainable, high-quality products that inspire confidence and individuality. We strive to create a positive impact on our community and the environment.
          </p>
          <button className="bg-myColor text-white py-3 px-6 rounded-md hover:bg-pink-600 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  )
}