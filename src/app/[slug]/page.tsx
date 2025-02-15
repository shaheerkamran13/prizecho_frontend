import Add from '@/components/Add'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductImages from '@/components/ProductImages'
import React from 'react'

export default function SinglePage() {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
      {/* Image */}
      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
        <ProductImages/>
      </div>
      {/* Text */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-4xl font-medium'>Product Name</h1>
        <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptates aspernatur delectus dolores vero impedit. Quidem sit rem unde dicta?</p>
        
        <div className='h-[2px] bg-gray-100'/>
          <div className='flex items-center gap-4'>
            <h3 className='text-xl line-through text-gray-500'>PKR59</h3>
            <h2 className='font-medium text-2xl'>PKR 49</h2>
          </div>
        <div className='h-[2px] bg-gray-100'/>
        <CustomizeProducts/>
        <Add/>
      <div className='h-[2px] bg-gray-100'/>
      <div className='text-sm'>
        <h4 className='font-medium mb-4'>Title</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Eligendi deserunt sequi velit nesciunt cupiditate soluta nam quam, 
          itaque quidem adipisci.
        </p>
      </div>

      <div className='text-sm'>
        <h4 className='font-medium mb-4'>Title</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Eligendi deserunt sequi velit nesciunt cupiditate soluta nam quam, 
          itaque quidem adipisci.
        </p>
      </div>

      <div className='text-sm'>
        <h4 className='font-medium mb-4'>Title</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Eligendi deserunt sequi velit nesciunt cupiditate soluta nam quam, 
          itaque quidem adipisci.
        </p>
      </div>
      
      </div>
    </div>
  )
}
