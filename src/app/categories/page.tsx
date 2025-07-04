// app/page.tsx
import React from 'react'
import Image from 'next/image'
import Filter from '@/components/Filter'
import CategoryList from '@/components/CategoryList'
import { FilterProvider } from '@/context/filterContext'
import CategoryPage from '@/components/CategoryPage'

export default function page() {
  return (
    <FilterProvider>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
        {/* CAMPAIGN */}
        <div className='hidden p-4 bg-pink-50 sm:flex justify-between h-64'>
          <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
            <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
              Grab up to 50% off on
              <br /> Selected Products
            </h1>
            <button className='ring-1 ring-myColor bg-myColor text-white rounded-3xl w-max text-sm py-2 px-4 hover:bg-pink-700'>
              Buy Now
            </button>
          </div>
          <div className='relative w-1/3'>
            <Image src={'/woman.png'} alt='' fill className='object-contain'/>
          </div>
        </div>

        {/* FILTER */}
        <Filter/>

        {/* CATEGORY LIST */}
        <CategoryPage/>
      </div>
    </FilterProvider>
  )
}