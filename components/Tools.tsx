'use client';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Emoji } from 'emoji-picker-react';
import React, { ElementRef, useRef, useState } from 'react'
import { IconPicker } from './IconPicker';
import { Textarea } from '@nextui-org/input';
import { Doc } from '@/convex/_generated/dataModel';
import TextareaAutosize from 'react-textarea-autosize'
import style from '@/styles/Tools.module.scss'
interface ToolbarProps {
   initialData: Doc<'documents'>;
   preview?: boolean;
}
const Tools = ({ initialData, preview }: ToolbarProps) => {
   const inputRef = useRef<ElementRef<'textarea'>>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [value, setValue] = useState(initialData.title);
   const [hover, setHover] = useState(false);

   const update = useMutation(api.documents.update);

   const enableEditing = () => {
      if (preview) return;

      setIsEditing(true);
      console.log(isEditing)
      setTimeout(() => {
         inputRef.current?.focus();
      }, 0);
   };

   const disableEditing = () => setIsEditing(false);

   const onInput = (value: string) => {
      setValue(value);
      update({
         id: initialData._id,
         title: value || 'Untitled',
      });
   };

   const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         disableEditing();
      }
   };

   const onIconSelect = (icon: string) => {
      update({
         id: initialData._id,
         icon,
      });
   };




   return (
      <div className={style.toolsbar}>
         {!!initialData.icon && !preview && (
            <div >
               <IconPicker onChange={onIconSelect}>
                  <p>
                     <Emoji
                        unified={initialData.icon}
                        size={64}
                     />

                  </p>
               </IconPicker>

            </div>
         )}

         {!!initialData.icon && preview && (
            <p >
               <Emoji
                  unified={initialData.icon}
                  size={64}
               />
            </p>
         )}

         {isEditing && !preview ? (
            <TextareaAutosize

               ref={inputRef}
               onBlur={disableEditing}
               onKeyDown={onKeyDown}
               value={value}
               onChange={(e) => onInput(e.target.value)}

            />
         ) : (
            <div
               onMouseEnter={() => setHover(true)}
               onMouseLeave={() => setHover(false)}
               onClick={enableEditing}
               className={style.toolsbar_h2}
            >
               {hover && (
                  <div className={style.toolsbar_menu}>
                     <IconPicker
                        onChange={onIconSelect}>
                        Add icon
                     </IconPicker>
                  </div>
               )}

               <h2>
                  {initialData.title}
               </h2>

            </div>
         )}
      </div>
   );
}

export default Tools
