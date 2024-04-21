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
            <button className={style.navbar_loading}>
               <Loader />
            </button>
         )}
         {!isAuthenticated && !isLoading && (
            <div className={style.navbar_login}>
               <SignInButton mode='modal'>
                  <button>Sign in</button>
               </SignInButton>
            </div>
         )}

         {isAuthenticated && !isLoading && (
            <div className={style.navbar_enter}>
               <button className={style.navbar_enter_button}>Enter Tion</button>
               <UserButton afterSignOutUrl='/document' />
            </div>
         )}
      </div>
   )
}

export default Navbar
