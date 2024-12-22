import React from 'react';
import { Users, ShoppingBag, Award, Globe, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: <Users size={24} />, value: "50k+", label: "Happy Customers", description: "Across 30+ countries" },
    { icon: <ShoppingBag size={24} />, value: "10k+", label: "Products", description: "Curated selection" },
    { icon: <Award size={24} />, value: "99%", label: "Satisfaction Rate", description: "From verified reviews" },
    { icon: <Globe size={24} />, value: "24/7", label: "Support", description: "Always here to help" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-40" />
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 sm:py-24 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Crafting Excellence</span>
              <span className="block text-myColor mt-2">in Every Detail</span>
            </h1>
            <p className="mt-6 mx-auto text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg sm:max-w-2xl px-4">
              Since 2015, we've been dedicated to bringing exceptional products to discerning customers worldwide,
              combining luxury with accessibility.
            </p>
          </div>
        </div>
      </div>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-4 sm:block">
                <div className="flex items-center justify-items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-myColor mb-0 sm:mb-4">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              We envision a world where quality meets accessibility. Our mission is to revolutionize 
              online shopping by providing meticulously curated products that exceed expectations,
              backed by unparalleled customer service.
            </p>
            <button className="group inline-flex items-center text-blue-600 font-semibold text-base sm:text-lg">
              Learn about our process
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Innovation", desc: "Pushing boundaries in e-commerce" },
              { title: "Quality", desc: "Uncompromising standards" },
              { title: "Sustainability", desc: "Eco-conscious practices" },
              { title: "Community", desc: "Building lasting relationships" }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              These principles guide every decision we make and every product we offer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Exceptional Quality",
                description: "Every product in our collection undergoes rigorous quality assessment to ensure it meets our exacting standards."
              },
              {
                title: "Customer Excellence",
                description: "We believe in building lasting relationships through outstanding service and genuine care for our customers' needs."
              },
              {
                title: "Sustainable Practice",
                description: "Our commitment to environmental responsibility drives us to implement eco-friendly practices across our operations."
              }
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;