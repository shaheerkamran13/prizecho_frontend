'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Menu() {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <div className='relative'>
            <Image 
                src={'/menu.png'}
                alt='menu'
                width={28}
                height={28}
                className='cursor-pointer'
                onClick={() => setOpen((prev) => !prev)}
            />
            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black z-10'
                        onClick={() => setOpen(false)}
                    ></motion.div>
                )}
            </AnimatePresence>
            {/* Menu Content */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        className='fixed left-0 top-20 w-full h-[calc(100vh-80px)] bg-black text-white flex flex-col items-center justify-center gap-8 text-xl z-20'
                    >
                        <Link href={'/'} onClick={handleLinkClick}>Homepage</Link>          
                        <Link href={'/aboutUs'} onClick={handleLinkClick}>About</Link>
                        <Link href={'/'} onClick={handleLinkClick}>Contact</Link>
                        <Link href={'/'} onClick={handleLinkClick}>Logout</Link>
                        <Link href={'/'} onClick={handleLinkClick}>Cart</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}