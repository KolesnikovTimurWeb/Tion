"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import React from 'react'
import style from '@/styles/ConfirmModal.module.scss'

interface ConfirmModal {
   children: React.ReactNode,
   onConfirm: () => void,
}

const ConfirmModel = ({ children, onConfirm }: ConfirmModal) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   return (
      <div>
         <button onClick={onOpen}>{children}</button>

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
      </div>

   )
}

export default ConfirmModel
