
"use client"
import Navbar from '@/app/(main)/_components/Navbar';
import Tools from '@/components/Tools';
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react'
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'

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
   console.log(document)
   if (document === undefined) {
      return <div>loading</div>
   }

   if (document === null) {
      return null
   }


   return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
         <div>
            <Tools initialData={document} />
         </div>
         <Editor initialContent={document.content} onChange={onChange} />
      </div>
   )
}

export default DocumentIdPage
