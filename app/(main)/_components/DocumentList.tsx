"use client"
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import documentIcon from '@/public/document.svg';

import React, { useState } from 'react'
import Item from './Item';
interface DocumentListProps {
   parentDocumentId?: Id<"documents">;
   level?: number;
   data?: Doc<"documents">[];
}
const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
   const params = useParams()
   const router = useRouter()
   const [expanded, setExpanded] = useState<Record<string, boolean>>({})

   const onExpand = (documentId: string) => {
      setExpanded((prevExpanded) => ({
         ...prevExpanded,
         [documentId]: !prevExpanded[documentId],
      }));
   };
   const documents = useQuery(api.documents.getSidebar, {
      parentDocument: parentDocumentId,
   });
   const onRedirect = (documentId: string) => {
      router.push(`/documents/${documentId}`);
   };

   if (documents === undefined) {
      return (
         <>
            <Item.Skeleton level={level} />
            {level === 0 && (
               <div>
                  <Item.Skeleton level={level} />
                  <Item.Skeleton level={level} />
               </div>
            )}
         </>
      )
   }
   return (
      <>

         <p style={{
            paddingLeft: level ? `${(level * 12) + 20}px` : "12px",
            display: documents.length === 0 ? 'block' : 'none',
            color: 'hsl(0deg 0% 45.1% / 80%)',
            fontSize: '14px'
         }}>No pages inside</p>



         {documents.map((document) => (
            <div key={document._id}>
               <Item id={document._id} onClick={() => onRedirect(document._id)}
                  label={document.title}
                  icon={documentIcon}
                  documentIcon={document.icon}
                  active={params.documentId === document._id}
                  level={level}
                  onExpend={() => onExpand(document._id)}
                  expanded={expanded[document._id]}
               />

               {expanded[document._id] && (
                  <DocumentList parentDocumentId={document._id} level={level + 1} />
               )}
            </div>
         ))}
      </>
   )
}

export default DocumentList
