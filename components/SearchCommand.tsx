"use client"
import { api } from '@/convex/_generated/api';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/clerk-react';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import style from '@/styles/ConfirmModal.module.scss'

const SearchCommand = () => {
   const { user } = useUser();
   const router = useRouter();
   const documents = useQuery(api.documents.getSearch);
   const [isMounted, setIsMounted] = useState(false);
   const { isOpen, onOpen, onOpenChange } = useDisclosure();


   const toggle = useSearch((store) => store.toggle)
   const isOpen2 = useSearch((store) => store.isOpen)
   const onClose = useSearch((store) => store.onClose)
   console.log(isOpen)
   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) {
      return null
   }
   return (
      <div className={style.model_search}>
         <Modal isOpen={isOpen} >
            <ModalContent>
               {(onCloseFunc) => (
                  <>
                     <ModalBody>
                        <div >
                           <h2>Are your sure?</h2>
                           <p>This action cannot be undone.</p>
                           <div style={{ display: 'flex', gap: '10px', flexDirection: "column" }}>
                              <button onClick={onClose}>Cancel</button>
                           </div>
                        </div>

                     </ModalBody>

                  </>
               )}
            </ModalContent>
         </Modal>
      </div>
   )
}

export default SearchCommand
