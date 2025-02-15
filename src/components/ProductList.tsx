import Link from "next/link";
import Image from "next/image";
import React from 'react'

export default function ProductList() {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {/* ITEM 1 */}
        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] ">  
            <div className="relative w-full h-80">
            <Image 
                src={"https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"/>

            <Image 
                src={"https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md  "/>

            </div>
            <div className="flex justify-between">
                <span className="font-medium">Product Name</span>
                <span className="font-semibold">PKR 49</span>
            </div>

            <div className="text-sm text-gray-500">My Description</div>
            <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max ">Add to Cart</button>
        </Link>

        {/* ITEM 2 */}

        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] ">  
            <div className="relative w-full h-80">
            <Image 
                src={"https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"/>

            <Image 
                src={"https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md  "/>

            </div>
            <div className="flex justify-between">
                <span className="font-medium">Product Name</span>
                <span className="font-semibold">PKR 49</span>
            </div>

            <div className="text-sm text-gray-500">My Description</div>
            <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max ">Add to Cart</button>
        </Link>

            {/* ITEM 3 */}
        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] ">  
            <div className="relative w-full h-80">
            <Image 
                src={"https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"/>

            <Image 
                src={"https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md  "/>

            </div>
            <div className="flex justify-between">
                <span className="font-medium">Product Name</span>
                <span className="font-semibold">PKR 49</span>
            </div>

            <div className="text-sm text-gray-500">My Description</div>
            <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max ">Add to Cart</button>
        </Link>

            {/* ITEM 4 */}
            
        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] ">  
            <div className="relative w-full h-80">
            <Image 
                src={"https://images.pexels.com/photos/29594648/pexels-photo-29594648/free-photo-of-elegant-portrait-of-man-in-outdoor-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"/>

            <Image 
                src={"https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                alt="" 
                fill 
                sizes="25vw"
                className="absolute object-cover rounded-md  "/>

            </div>
            <div className="flex justify-between">
                <span className="font-medium">Product Name</span>
                <span className="font-semibold">PKR49</span>
            </div>

            <div className="text-sm text-gray-500">My Description</div>
            <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max ">Add to Cart</button>
        </Link>
    </div> 
  )
}
