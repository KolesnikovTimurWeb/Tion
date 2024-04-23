"use client"
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react'
import style from '@/styles/Navbar.module.scss'
import skeleton from '@/styles/Skeleton.module.scss'
import menu from '@/public/menu.svg'
import { Title } from './Title';
import { Banner } from './Banner';
import Image from 'next/image';
import { Skeleton } from '@nextui-org/react';


const Navbar = () => {
   const params = useParams()

   const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<'documents'> });
   if (document === undefined) {
      return (
         <div>
            <Skeleton className={skeleton.skeleton_button} />
         </div>
      )
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
