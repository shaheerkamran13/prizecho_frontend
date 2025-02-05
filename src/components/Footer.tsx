import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-gray-100 mt-24 text-sm'>
      {/* TOP */}
      <div className='flex flex-col justify-between md:flex-row gap-24'>
        {/* LEFT - COMPANY INFO */}
        <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
          <Link href={'/'}><div className='text-2xl tracking-wide'>PRIZECHO</div></Link>
          
          <p>3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United States</p>
          <span className="flex font-semibold">support@prizecho.com</span>
          <span className="flex font-semibold">+92 334 1818294</span>
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
          {/* ABOUT */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">ABOUT</h1>
            <div className="flex flex-col gap-6">
              <Link href="/aboutUs" className="hover:text-myColor">About Us</Link>
              <Link href="/how-prizecho-works" className="hover:text-myColor">How Prizecho Works</Link>
              <Link href="/contact-us" className="hover:text-myColor">Contact Us</Link>
              <Link href="" className="hover:text-myColor">Careers</Link>
              <Link href="/blog" className="hover:text-myColor">Blog</Link>
              <Link href="/terms-and-policies/privacy" className="hover:text-myColor">Privacy</Link>
            </div>
          </div>

          {/* SHOP */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="" className="hover:text-myColor">New Arrivals</Link>
              <Link href="/categories/Accessories" className="hover:text-myColor">Accessories</Link>
              <Link href="" className="hover:text-myColor">Men</Link>
              <Link href="" className="hover:text-myColor">Women</Link>
              <Link href="" className="hover:text-myColor">All Products</Link>
            </div>
          </div>

          {/* HELP */}
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/quick-guide" className="hover:text-myColor">Quick Guide</Link>
              <Link href="/terms-and-policies" className="hover:text-myColor">Terms & Policies</Link>
              <Link href="/terms-and-policies/shipping" className="hover:text-myColor">Shipping Info</Link>
              <Link href="/terms-and-policies/returns" className="hover:text-myColor">Returns</Link>
              <Link href="/terms-and-policies/payment" className="hover:text-myColor">Payment</Link>
              <Link href="/faq" className="hover:text-myColor">FAQs</Link>
            </div>
          </div>
        </div>

        {/* RIGHT - NEWSLETTER */}
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
      <div className='mt-16 pt-8 border-t border-gray-200'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
          <div className='flex flex-wrap justify-center md:justify-start gap-4 text-gray-500'>
            <Link href="/terms-and-policies/terms" className="hover:text-myColor">Terms of Service</Link>
            <span>•</span>
            <Link href="/terms-and-policies/cookies" className="hover:text-myColor">Cookie Policy</Link>
            <span>•</span>
            <Link href="/terms-and-policies/dispute-resolution" className="hover:text-myColor">Dispute Resolution</Link>
          </div>

          <div className='flex flex-col gap-8 md:flex-row'>
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
        
        <div className='text-center mt-8 text-gray-500'>
          © 2025 PRIZECHO. All rights reserved.
        </div>
      </div>
    </div>
  )
}