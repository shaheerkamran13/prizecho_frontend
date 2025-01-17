import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-gray-100 mt-24 text-sm'>
        {/* TOP */}
      <div className='flex flex-col justify-between md:flex-row gap-24'>
          {/* LEFT */}
        <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
          <Link href={'/'}><div className='text-2xl tracking-wide'>PRIZECHO</div>
          </Link>
          
          <p>3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United States</p>
          <span className ="flex font-semibold" >support@prizecho.com</span>
          <span className ="flex font-semibold" >+92 334 1818294</span>
          <div className='flex gap-6'>
           <a href="https://facebook.com/your.profile" target="_blank" rel="noopener noreferrer">
           <Image src="/facebook.png" alt="Facebook" width={16} height={16} className="hover:opacity-80" />
            </a>
            <a href="https://instagram.com/prizecho" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram.png" alt="Instagram" width={16} height={16} className="hover:opacity-80" />
            </a>
            <a href="https://youtube.com/@prizecho" target="_blank" rel="noopener noreferrer">
              <Image src="/youtube.png" alt="YouTube" width={16} height={16} className="hover:opacity-80" />
            </a>
            <a href="https://pinterest.com/your.profile" target="_blank" rel="noopener noreferrer">
              <Image src="/pinterest.png" alt="Pinterest" width={16} height={16} className="hover:opacity-80" />
            </a>
            <a href="https://twitter.com/prizecho" target="_blank" rel="noopener noreferrer">
              <Image src="/x.png" alt="X (Twitter)" width={16} height={16} className="hover:opacity-80" />
            </a>
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="/aboutUs">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="/blog">Blog</Link>
              <Link href="contact-us">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">New Arrivals</Link>
              <Link href="/categories/Accessories">Accessories</Link>
              <Link href="">Men</Link>
              <Link href="">Women</Link>
              <Link href="">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="/profile">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card</Link>
            </div>
          </div>
        </div>
          {/* RIGHT */}
        <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
          <h1 className='font-medium text-lg'>SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
            
            <div className='flex'>
              <input 
              type="text" 
              placeholder="Email Address" 
              className="p-4 w-3/4"
              />

              <button className='w-1/4 bg-myColor text-white'>JOIN</button>
            </div>
              
              <span className='font-semibold'>Secure Payments</span>

                <div className='flex justify-between'>
                  <Image src="/discover.png" alt="" width={40} height={20} />
                  <Image src="/skrill.png" alt="" width={40} height={20} />
                  <Image src="/paypal.png" alt="" width={40} height={20} />
                  <Image src="/mastercard.png" alt="" width={40} height={20} />
                  <Image src="/visa.png" alt="" width={40} height={20} />

                </div>
        </div>
      </div>

      {/* BOTTOM */}
    <div className='flex flex-col  md:flex-row justify-between items-center gap-8 mt-16'>
      <div className=''>© 2024 PRIZECHO</div>
      <div className='flex flex-col  gap-8 md:flex-row'>
        <div className=''>
          <span className='text-gray-500 mr-4'>Language</span>
          <span className='font-medium'>United States | English</span>
        </div>

        <div className=''>
          <span className='text-gray-500 mr-4'>Currency</span>
          <span className='font-medium'>$ USD</span>
        </div>
      </div>
      
    </div>
    </div>
  )
}
