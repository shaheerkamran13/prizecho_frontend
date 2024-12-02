'use client'
import React from 'react'
import Image from 'next/image';
export default function CartModel() {
    const cartItems = false;

  return (
    <div className='absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20'>
        {!cartItems ? (
            <div className=''>Cart is empty</div>
        ):(
            <div className=''>
                <Image src='' alt='cart' width={72} height={96} className='object-cover rounded-md'/>

            </div>
        )}
    </div>
  )
}
