"use client"
import React from 'react'
import style from '@/styles/Document.module.scss'
import Image from 'next/image'
import document from '@/public/documents.png'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'



const DocumentPage = () => {
   const { user } = useUser()

   const create = useMutation(api.documents.create)


   const onCreate = () => {
      const promise = create({ title: 'Untitled' })

      toast.promise(promise, {
         loading: 'Creating new note...',
         success: 'New note created!',
         error: 'Failed tot create new note'
      })
   }

   return (
      <div className={style.document}>
         <Image src={document} width={400} height={300} alt='Document' />
         <h2>Welcome to {user?.firstName}&apos;s Tion </h2>
         <button onClick={() => onCreate()}>+ Create a note</button>

      </div>
   )
}

export default DocumentPage
