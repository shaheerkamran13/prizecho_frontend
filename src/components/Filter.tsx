'use client'
import React from 'react'
import { useFilter } from '@/context/filterContext'
import { X, Sliders } from 'lucide-react'

export default function Filter() {
  const { filters, updateFilters, resetFilters } = useFilter()

  return (
    <div className="mt-12">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Filters</h3>
        {(filters.type || filters.minPrice || filters.maxPrice || filters.sort) && (
          <button
            onClick={resetFilters}
            className="ml-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
           
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* Category Filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              id="type"
              name="type"
              className="py-2 px-4 rounded-lg text-sm bg-[#EBEDED] w-full md:w-48 focus:ring-2 focus:ring-myColor focus:outline-none"
              onChange={(e) => updateFilters({ type: e.target.value })}
              value={filters.type}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-kitchen">Home & Kitchen</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="min" className="text-sm font-medium text-gray-600">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  id="min"
                  name="min"
                  placeholder="0"
                  className="pl-8 pr-3 py-2 rounded-lg text-sm w-full md:w-36 ring-1 ring-gray-300 focus:ring-2 focus:ring-myColor focus:outline-none"
                  onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
                  value={filters.minPrice || ''}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="max" className="text-sm font-medium text-gray-600">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  id="max"
                  name="max"
                  placeholder="1000"
                  className="pl-8 pr-3 py-2 rounded-lg text-sm w-full md:w-36 ring-1 ring-gray-300 focus:ring-2 focus:ring-myColor focus:outline-none"
                  onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
                  value={filters.maxPrice || ''}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            className="py-2 px-4 rounded-lg text-sm bg-white ring-1 ring-gray-300 w-full md:w-48 focus:ring-2 focus:ring-myColor focus:outline-none"
            onChange={(e) => updateFilters({ sort: e.target.value })}
            value={filters.sort}
          >
            <option value="">Default</option>
            <option value="asc price">Price: Low to High</option>
            <option value="desc price">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}