"use client"
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react'
import style from '@/styles/Navbar.module.scss'
import menu from '@/public/menu.svg'
import { Title } from './Title';
import { Banner } from './Banner';
import Image from 'next/image';
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


         <div>
            <Title initialData={document} />
         </div>


         {document.isArchived && (
            <Banner documentId={document._id} />
         )}
      </nav>
   )
}

export default Navbar
