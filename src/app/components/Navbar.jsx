"use client"

import React from 'react'
import Link from 'next/link'
import NextLogo from '../../../public/next.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function Navbar({ session }) {
  return (
    <nav className='flex items-center justify-between p-5 shadow-md'>
        <div>
            <Link href="/">
                <Image src={NextLogo} width={100} height={100} alt='nextjs logo' /> 
            </Link>
        </div>
        <ul className='flex space-x-4'>
            {!session ? (
                <>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                </>
            ) : (
                <>
                    <li><Link href="/welcome" className='px-3 py-2 my-2 text-lg text-white bg-gray-500 border rounded-md'>Profile</Link></li>
                    <li><a onClick={() => signOut()} className='px-3 py-2 my-2 text-lg text-white bg-red-500 border rounded-md'>Logout</a></li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
