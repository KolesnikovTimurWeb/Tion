"use client"
import { cn } from '@udecode/cn'
import React from 'react'
import style from '@/styles/Navbar.module.scss'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import Logo from './logo'
import Loader from '@/components/loader'

const Navbar = () => {
   const { isAuthenticated, isLoading } = useConvexAuth()
   return (
      <div className={cn(style.navbar)}>
         <Logo />

         {isLoading && (
            <Loader />
         )}
         {!isAuthenticated && !isLoading && (
            <div className={style.navbar_login}>
               <SignInButton mode='modal'>
                  <button>Log in</button>
               </SignInButton>
            </div>
         )}

         {isAuthenticated && !isLoading && (
            <div className={style.navbar_enter}>
               <button>Enter</button>
               <UserButton afterSignOutUrl='/' />
            </div>
         )}
      </div>
   )
}

export default Navbar
