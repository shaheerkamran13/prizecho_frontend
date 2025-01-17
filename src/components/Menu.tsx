'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '@/lib/api/config'

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchAPI('/categories/');
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        if (open) {
            fetchCategories();
        }
    }, [open]);

    return (
        <div className=''>
            <Image 
                src={'/menu.png'}
                alt='menu'
                width={28}
                height={28}
                className='cursor-pointer'
                onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
                <div className='absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10'>
                    <div className="relative">
                        <button 
                            onClick={() => setShowCategories(!showCategories)}
                            className="text-white"
                        >
                            Categories
                        </button>
                        {showCategories && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-black py-2 rounded-md mt-2 w-48">
                                {categories.map((category) => (
                                    <Link 
                                        key={category.id}
                                        href={`/categories/${category.slug}`}
                                        className="block px-4 py-2 hover:bg-gray-100 text-base"
                                        onClick={() => {
                                            setShowCategories(false);
                                            setOpen(false);
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href={'/aboutUs'}>About</Link>
                    <Link href={'/'}>Contact</Link>
                    <Link href={'/'}>Deals</Link>
                    <Link href={'/'}>Shop</Link>
                    <Link href={'/'}>Logout</Link>
                    <Link href={'/'}>Cart(1)</Link>
                </div>
            )}
        </div>
    );
}