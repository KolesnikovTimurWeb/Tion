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
                     <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                     <ModalBody className={style.modal_body}>
                        <h2>Are your sure?</h2>
                        <div>
                           <button onClick={onConfirm}>Yes,I am</button>
                           <button onClick={onClose}>No,I made mistake</button>
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
