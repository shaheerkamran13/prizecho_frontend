'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CartModel from './CartModel';
import { useAuth } from '@/lib/context/UserAuthContext';

export default function NavIcons() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { logout, isAuthenticated } = useAuth(); // Get isAuthenticated from auth context
    const router = useRouter();

    const handleProfile = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        setIsProfileOpen((prev) => !prev);
    };

    const handleCart = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        setIsCartOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='flex items-center gap-4 xl:gap-6 relative'>
            {isAuthenticated && (
                <>
                    {/* PROFILE */}
                    <Image 
                        src={'/profile.png'} 
                        alt='profile' 
                        width={22} 
                        height={22}     
                        className='cursor-pointer'
                        onClick={handleProfile}
                    />

                    {isProfileOpen && (
                        <div className='absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white'>
                            <Link 
                                href="/profile" 
                                className="block hover:text-myColor"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                Profile
                            </Link>
                            <div 
                                className='mt-2 cursor-pointer hover:text-myColor'
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                    
                    {/* NOTIFICATION */}
                    <Image 
                        src={'/notification.png'} 
                        alt='notification' 
                        width={22} 
                        height={22} 
                        className='cursor-pointer'
                        onClick={() => router.push('/notifications')}
                    />
                </>
            )}

            {/* CART */}
            <div 
                className='relative cursor-pointer'
                onClick={handleCart}
            >
                <Image 
                    src={'/cart.png'} 
                    alt='cart' 
                    width={22} 
                    height={22} 
                    className='cursor-pointer'
                />
                {isAuthenticated && (
                    <div className='absolute -top-4 -right-4 w-6 h-6 bg-myColor text-sm rounded-full text-white flex items-center justify-center'>
                        2
                    </div>
                )}
            </div>
            {isCartOpen && isAuthenticated && <CartModel/>}     
        </div>
    );
}