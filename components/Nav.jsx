"use client";
import Image from 'next/image'
import logo from '../public/logo.png'
import { useState } from 'react'
import Menu from './Menu'

export default function Nav() {
    const[menuVisible,setMenuVisible]=useState(false);
    const toggleMenu = () => {
        setMenuVisible(prevMenuVisible => !prevMenuVisible);
    };
    return (
        <div className="bg-zinc-800 w-full flex flex-col items-center justify-center sm:justify-between sm:flex-row py-4 mb-10">
            <div className='flex items-center'>
                <Image 
                    src={logo}
                    width={150} 
                    height={150} 
                    alt='logo'
                    priority
                />
                <h1 className='hidden lg:block text-teal-50 text-xl font-bold'>NEXTCHATJS</h1>
            </div>
            <span onClick={toggleMenu} className='sm:hidden text-white flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </span>
            {menuVisible && (
                <div className='scale-75 sm:hidden'>
                    <Menu/>
                </div>
                
            )}
            <div className='sm:scale-50 md:scale-100 hidden sm:block'>
            <Menu/>
            </div>
            
        </div>
    )
}
