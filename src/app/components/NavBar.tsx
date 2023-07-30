'use client'
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdHome } from "react-icons/md";


const NavBar = () => {

   
    const linkStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        };
    const router = useRouter();


    return (

        <nav style={{ width: '100%', height: '50px', position: 'absolute', display: 'flex', flexDirection: 'row', bottom: '0', textAlign:'center',justifyContent:'center'}} className="fixed m-0 bottom-0 flex justify-around text-gray-600 bg-white">
            <Link href="/"
                as='/'
                style={linkStyles}
                className='hover:bg-gray-200 rounded-xl focus:bg-gray-100 '>
                 <MdHome /> &nbsp;&nbsp;Home
            </Link>
            <Link href="/appointments"
                as='/appointments'
                style={linkStyles}
                className='hover:bg-gray-200 rounded-xl focus:bg-gray-100'>
                Appoinment
            </Link>
            <Link href="/about"
                as='/about'
                style={linkStyles}
                className='hover:bg-gray-200 rounded-xl focus:bg-gray-100'>
                About
            </Link>
        </nav>
    );

}

export default NavBar;