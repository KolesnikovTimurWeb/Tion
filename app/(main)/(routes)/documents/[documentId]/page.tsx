
"use client"
import Navbar from '@/app/(main)/_components/Navbar';
import Tools from '@/components/Tools';
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel';
import { Skeleton } from '@nextui-org/react';
import { useMutation, useQuery } from 'convex/react'
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import skelton from '@/styles/Skeleton.module.scss'

interface DocumentIdPageProps {
   params: {
      documentId: Id<'documents'>;
   };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
   const document = useQuery(api.documents.getById, { documentId: params.documentId });
   const update = useMutation(api.documents.update);
   const Editor = useMemo(() => dynamic(() => import('@/components/Editor'), { ssr: false }), []);

   const onChange = (content: string) => {
      update({ id: params.documentId, content });
   };

   if (document === undefined) {
      return (
         <div className={skelton.div}>
            <div >
               <div>
                  <Skeleton className={skelton.skeleton_h2} />
                  <Skeleton className={skelton.skeleton} />
                  <Skeleton className={skelton.skeleton} />
                  <Skeleton className={skelton.skeleton} />
               </div>
            </div>
         </div>
      );
   }

   if (document === null) {
      return null
   }


   return (
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>

         <div>
            <Tools initialData={document} />
         </div>
         <div>
            <Editor initialContent={document.content} onChange={onChange} />
         </div>
      </div>
   )
}

export default DocumentIdPage
