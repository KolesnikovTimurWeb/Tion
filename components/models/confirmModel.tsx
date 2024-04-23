"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import React, { useState } from 'react'
import style from '@/styles/ConfirmModal.module.scss'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";

interface ConfirmModal {
   isSearch?: boolean,
   children: React.ReactNode,
   onConfirm?: () => void,
}

const ConfirmModel = ({ children, onConfirm, isSearch }: ConfirmModal) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const documents = useQuery(api.documents.getSearch);
   const router = useRouter()
   const onSelect = (id: string) => {
      router.push(`/documents/${id}`);

   }
   const [search, setSearch] = useState('')

   const filteredDocuments = documents?.filter((document) => {
      return document.title.toLowerCase().includes(search.toLowerCase())
   })
   return (
      <>
         <button className={style.button} onClick={onOpen}>{children}</button>
         {isSearch ? (

            <Modal isOpen={isOpen} className={style.model_search} onOpenChange={onOpenChange}>
               <ModalContent>
                  {(onClose) => (
                     <>
                        <ModalBody >
                           <div className={style.model_search_body}>
                              <h2>Are ?</h2>
                              <Input
                                 placeholder="Filter by title...." value={search} onChange={(e) => setSearch(e.target.value)} />

                              <div className={style.model_items}>
                                 {filteredDocuments?.map((item) =>
                                    <div key={item._id} onClick={() => {
                                       onSelect(item._id),
                                          onClose()
                                    }
                                    }>

                                       <p>{item?.title}</p>
                                    </div>
                                 )}
                              </div>

                              <div style={{ display: 'flex', gap: '10px', flexDirection: "column" }}>
                                 <button onClick={onClose}>Cancel</button>
                              </div>
                           </div>

                        </ModalBody>

                     </>
                  )}
               </ModalContent>
            </Modal>
         ) : (
            <Modal isOpen={isOpen} className={style.model} onOpenChange={onOpenChange}>
               <ModalContent>
                  {(onClose) => (
                     <>
                        <ModalBody >
                           <div className={style.model_body}>
                              <h2>Are your sure?</h2>
                              <p>This action cannot be undone.</p>
                              <div style={{ display: 'flex', gap: '10px', flexDirection: "column" }}>
                                 <button className={style.model_body_active} onClick={onConfirm}>Yes,I am sure</button>
                                 <button onClick={onClose}>Cancel</button>
                              </div>
                           </div>

                        </ModalBody>

                     </>
                  )}
               </ModalContent>
            </Modal>
         )
         }
      </ >

   )
}

export default ConfirmModel
