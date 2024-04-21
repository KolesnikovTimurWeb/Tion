"use client"

import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';


import { Popover, PopoverContent, PopoverProvider, PopoverTrigger } from '@nextui-org/popover';

interface IconPickerProps {
   onChange: (icon: string) => void;
   children: React.ReactNode;
   preview?: boolean;
}

export const IconPicker = ({
   onChange,
   children,
   preview
}: IconPickerProps) => {

   const onClick = (data: EmojiClickData) => {
      onChange(data.unified);
   }



   return (
      <Popover>
         <PopoverTrigger>
            {children}
         </PopoverTrigger>
         <PopoverContent
            className='p-5 md:p-0 w-full border-none shadow-none'
         >
            <EmojiPicker
               height={350}
               onEmojiClick={onClick}
               emojiStyle={EmojiStyle.APPLE}
            />
         </PopoverContent>
      </Popover>
   )

}