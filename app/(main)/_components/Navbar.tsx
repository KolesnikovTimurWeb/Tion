"use client"
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react'
import style from '@/styles/Navbar.module.scss'
import { Title } from './Title';
interface NavbarProps {
   isCollapsed: boolean;
   onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
   const params = useParams()

   const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<'documents'> });
   if (document === undefined) {
      return <p>Loading</p>
   }
   if (document === null) {
      return <div>Document not found</div>;
   }
   return (
      <nav className={style.navbar_landing}>
         {isCollapsed && (
            <p>SMTG</p>
         )}

         <div>
            <Title initialData={document} />
         </div>


         {document.isArchived && (
            <div></div>
         )}
      </nav>
   )
}

export default Navbar
