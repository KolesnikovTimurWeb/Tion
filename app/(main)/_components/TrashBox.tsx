"use client"

import Loader from '@/components/loader'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import style from "@/styles/Item.module.scss"
import trash from "@/public/trash.svg"
import returnIcon from "@/public/return.svg"
import { toast } from 'sonner'
import { Input } from '@nextui-org/input'
import Image from 'next/image'
import ConfirmModel from '@/components/models/confirmModel'

const TrashBox = () => {
   const router = useRouter()
   const params = useParams()
   const documents = useQuery(api.documents.getTrash)
   const restore = useMutation(api.documents.restore)
   const remove = useMutation(api.documents.remove)

   const [search, setSearch] = useState('')

   const filteredDocuments = documents?.filter((document) => {
      return document.title.toLowerCase().includes(search.toLowerCase())
   })
   const onClick = (documentId: string) => {
      // router.push(`/documents/${documentId}`)
   }

   const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<'documents'>) => {
      event.stopPropagation();

      const promise = restore({ id: documentId });

      toast.promise(promise, {
         loading: 'Restoring...',
         success: 'Document restored!',
         error: 'Failed to restore',
      });
   };

   const onRemove = (documentId: Id<'documents'>) => {

      const promise = remove({ id: documentId });

      toast.promise(promise, {
         loading: 'Removing...',
         success: 'Document removed!',
         error: 'Failed to remove',
      });

      if (params.documentId === documentId) {
         router.push('/documents');
      }
   };
   if (documents === undefined) {
      return (
         <div className="h-full flex items-center justify-center p-4">
            <Loader size="default" />
         </div>
      );
   }
   return (
      <div className={style.trash}>

         <Input
            placeholder="Filter by title...." value={search} onChange={(e) => setSearch(e.target.value)} />
         <div className={style.trash_items}>
            {filteredDocuments?.map(document => (
               <div key={document._id} role='button' className={style.trash_item} onClick={() => onClick(document._id)}>
                  <p>{document.title}</p>

                  <div style={{ display: 'flex' }}>
                     <Image width={24} height={22} alt='Icon' onClick={(e) => onRestore(e, document._id)} src={returnIcon} />

                     <ConfirmModel onConfirm={() => onRemove(document._id)}>
                        <Image width={24} height={22} alt='Icon' src={trash} />
                     </ConfirmModel>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default TrashBox
