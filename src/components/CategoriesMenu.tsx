'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { fetchAPI } from '@/lib/api/config'

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoriesMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchAPI('/categories/')
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-myColor"
      >
        Categories
      </button>

      {isOpen && (
        <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}