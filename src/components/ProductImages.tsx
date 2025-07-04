'use client'
import Image from 'next/image'
import React, { useState } from 'react'
interface ProductImagesProps {
  image: string[];
}




export default function ProductImages({ image }: ProductImagesProps) {

  const [index, setIndex] = useState(0)
const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
  },

  {
    id: 2,
    url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",  
  },

  {
    id: 3,
    url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"  
  },

  {
    id: 4,
    url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
  },
]
  return (
    <div className=''>
        <div className='h-[500px] relative'>
                <Image 
                  src = {images[index].url}
                  alt='' 
                  fill sizes='30vw' 
                  className='object-cover rounded-md'
                  />             
                </div>

            <div className='flex justify-between gap-4 mt-8'>
              {images.map((img, i)=>(
                <div 
                className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer'
                key={img.id}
                onClick={() => setIndex(i)}>
                  <Image 
                    src = {"https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"} 
                    alt='' 
                    fill sizes='30vw' 
                    className='object-cover rounded-md'/>
                </div>
                
              ))}
              
            </div>
    </div>
  )
}
