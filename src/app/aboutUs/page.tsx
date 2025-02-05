import React from 'react';
import { Users, Gift, Award, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutUs = () => {
  const stats = [
    { icon: <Users size={24} />, value: "10k+", label: "Active Users", description: "Growing community" },
    { icon: <Gift size={24} />, value: "1k+", label: "Winners", description: "Happy customers" },
    { icon: <Award size={24} />, value: "100%", label: "Transparency", description: "Fair selection process" },
    { icon: <Globe size={24} />, value: "24/7", label: "Support", description: "Always here to help" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-myColor/5 to-myColor/10 opacity-40" />
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 sm:py-24 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Revolutionizing Shopping</span>
              <span className="block text-myColor mt-2">One Prize at a Time</span>
            </h1>
            <p className="mt-6 mx-auto text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg sm:max-w-2xl px-4">
              At Prizecho, we're transforming the traditional shopping experience into an exciting journey 
              where every purchase could lead to winning amazing products.
            </p>
          </div>
        </div>
      </div>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
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
              We believe everyone deserves a chance to own premium products. Our mission is to create 
              a fair and exciting platform where users can participate in winning high-quality items 
              through our innovative prize-based shopping model.
            </p>
            <Link href="/how-prizecho-works" className="group inline-flex items-center text-myColor font-semibold text-base sm:text-lg">
              Learn how Prizecho works
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Fair Chance", desc: "Equal opportunity for everyone" },
              { title: "Transparency", desc: "Clear and honest process" },
              { title: "Accessibility", desc: "Premium products for all" },
              { title: "Community", desc: "Building trust and excitement" }
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
              These principles guide our commitment to revolutionizing the online shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Fair Selection Process",
                description: "Our automated system ensures every participant has an equal chance of winning, maintaining complete transparency and fairness."
              },
              {
                title: "User Trust",
                description: "We prioritize building trust through secure transactions, reliable customer support, and a transparent winning process."
              },
              {
                title: "Community Engagement",
                description: "We foster a vibrant community where users can share experiences, participate in events, and celebrate winners."
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