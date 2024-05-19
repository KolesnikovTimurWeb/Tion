"use client"
import React from 'react'
import style from '@/styles/Heading.module.scss'
import { useConvexAuth } from 'convex/react'
import Loader from '@/components/loader'
import { SignIn, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import document from '@/public/documents.png'

const Heading = () => {
   const { isAuthenticated, isLoading } = useConvexAuth()
   const router = useRouter()
    const onRedirect = () => {
      router.push(`/documents}`);
   };

   return (
      <div className={style.heading}>
         <h1>Your Ideas, Documents & Plans. Welcome to <span>Tion</span> </h1>
         <h2>Tion is connected workspace where better, faster work happens </h2>
         {isAuthenticated && !isLoading && (
            <button onClick={() => onRedirect(document)} >Enter Tion <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> </button>

         )}
         {!isAuthenticated && !isLoading && (
            <SignInButton mode='modal'>
               <button>Sign In  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> </button>
            </SignInButton>
         )}
         {isLoading && (
            <Loader />
         )}
         <Image width={400} height={300} alt='Image' src={document} />

      </div>
   )
}

export default Heading
