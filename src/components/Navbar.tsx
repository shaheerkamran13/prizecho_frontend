'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Menu from './Menu';
import Image from 'next/image';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';
import { ScrollHandler } from './ScrollHandler';

export default function Navbar() {
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  // Example categories data
  const categories = [
    { name: 'Electronics', href: '/categories/electronics' },
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Home & Kitchen', href: '/categories/home-kitchen' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Sports', href: '/categories/sports' },
  ];

  return (
    <ScrollHandler>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE SCREENS */}
        <div className="h-full flex items-center justify-between md:hidden">
          {/* Menu on the left for mobile view */}
          <Menu />

          {/* Logo in the center for mobile view */}
          <Link href={'/'}>
            <div className="text-2xl tracking-wide">PRIZECHO</div>
          </Link>

          {/* NavIcons on the right for mobile view with equal spacing */}
          <div className="flex items-center gap-4">
            <NavIcons />
          </div>
        </div>

        {/* BIGGER SCREENS */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* LEFT */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href={'/'} className="flex items-center gap-3">
              <Image src="/logo.png" alt={'logo'} width={24} height={24} />
              <div className="text-2xl tracking-wide">PRIZECHO</div>
            </Link>

            <div className="hidden xl:flex gap-4">
              <Link href={'/'} className="hover:text-myColor transition-colors">
                Homepage
              </Link>
              {/* Categories Link with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesHovered(true)}
                onMouseLeave={() => setIsCategoriesHovered(false)}
              >
                <Link href={'/categories'}  className="hover:text-myColor transition-colors">
                  Categories
                  
                </Link>
                {/* Dropdown Menu */}
                {isCategoriesHovered && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
            <SearchBar />
            <NavIcons />
          </div>
        </div>
      </div>
    </ScrollHandler>
  );
}