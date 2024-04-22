"use client"
import Loader from '@/components/loader'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import Navigation from './_components/navigation'
import SearchCommand from '@/components/SearchCommand'

const MainLayout = ({ children }: { children: ReactNode }) => {

   const { isAuthenticated, isLoading } = useConvexAuth()

   if (isLoading) {
      return (
         <div style={{ height: '100%', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
         </div>
      )
   }
   if (!isAuthenticated) {
      return redirect('/')
   }
   return (
      <div style={{ display: "flex", height: "100%" }}>
         <Navigation />
         <SearchCommand />
         {children}
      </div >
   )
}

export default MainLayout
