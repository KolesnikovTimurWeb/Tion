import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation } from "convex/react";
import { Emoji } from "emoji-picker-react";
import { useRef, useState } from "react";

interface TitleProps {
   initialData: Doc<'documents'>;
}

export const Title = ({ initialData }: TitleProps) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const update = useMutation(api.documents.update);

   const [title, setTitle] = useState(initialData.title || 'Untitled');
   const [isEditing, setIsEditing] = useState(false);

   const enableEditing = () => {
      setTitle(initialData.title);
      setIsEditing(true);
      setTimeout(() => {
         inputRef.current?.focus();
         inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
      }, 0);
   };

   const disableEditing = () => {
      setIsEditing(false);
   };

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
      update({
         id: initialData._id,
         title: event.target.value || 'Untitled',
      });
   };

   const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         disableEditing();
      }
   };

   return (
      <div className="flex items-center gap-x-1">
         {!!initialData.title && (
            <Emoji
               unified={initialData.icon!}
               size={20}
            />
         )}
         {isEditing ? (
            <Input
               ref={inputRef}
               onClick={enableEditing}
               onBlur={disableEditing}
               onChange={onChange}
               onKeyDown={onKeyDown}
               value={title}
               className="h-7 px-2 focus-visible:ring-transparent"
            />
         ) : (
            <button
               onClick={enableEditing}
               className="font-normal h-auto px-2 py-1 focus-visible:ring-transparent">
               <span className="truncate">{initialData?.title}</span>
            </button>
         )}
      </div>
   );
};

Title.Skeleton = function TitleSkeleton() {
   return <Skeleton className="h-6 w-20 rounded-md" />;
};