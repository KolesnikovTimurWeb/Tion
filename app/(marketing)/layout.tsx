import React from 'react'
import Navbar from './_components/navbar'

const MarkitingLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <Navbar />
         {children}
      </div>
   )
}

export default MarkitingLayout
