import React, { useState } from 'react'
import style from '@/styles/Item.module.scss'
import Image from 'next/image'
import { Id } from '@/convex/_generated/dataModel'
import { Skeleton } from '@nextui-org/skeleton'
import arrow from '@/public/arrow.svg'
import dotsIcon from '@/public/dots.svg'
import plus from '@/public/plus.svg'
import trash from '@/public/trash.svg'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { archive } from '@/convex/documents'
import { useUser } from '@clerk/clerk-react'


interface ItemProps {
   id?: Id<"documents">,
   documentIcon?: string,
   active?: boolean,
   expanded?: boolean,
   isSearch?: boolean,
   level?: number,
   onExpend?: () => void,
   label: string,
   onClick?: () => void,
   icon: string,
}
const Item = ({ id, active, isSearch, level = 0, onExpend, expanded, documentIcon, onClick, label, icon }: ItemProps) => {
   const handleExpand = (event) => {
      event.stopPropagation()
      onExpend?.()
   }
   const [isShown, setIsShown] = useState(false);
   const router = useRouter();
   const { user } = useUser();
   const create = useMutation(api.documents.create);
   const archive = useMutation(api.documents.archive);
   const onArchive = (event) => {
      event.stopPropagation();
      if (!id) return;
      const promise = archive({ id }).then(() => router.push('/documents'));

      toast.promise(promise, {
         loading: 'Moving to trash...',
         success: 'Document move to trash!',
         error: 'Failed archiving document',
      });
   };

   const onCreate = (event) => {
      event.stopPropagation();
      if (!id) return;
      const promise = create({ title: 'Untitled', parentDocument: id }).then((documentId) => {
         if (!expanded) {
            onExpend?.();
         }
         // router.push(`/documents/${documentId}`);
      });

      toast.promise(promise, {
         loading: 'Creating document...',
         success: 'Document created!',
         error: 'Error creating document',
      });
   };
   let ChevronIcon = expanded ? arrow : arrow
   return (
      <div onClick={onClick}
         role='button'
         className={style.item}
         style={{
            paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
         }}
         onMouseEnter={() => setIsShown(true)}
         onMouseLeave={() => setIsShown(false)}
      >
         {!!id && (
            <div role='button' className={style.item_icon} onClick={handleExpand}>
               <Image src={ChevronIcon} alt='icon' width={14} height={14} />
            </div>
         )}

         {documentIcon ? (
            <div>
               {documentIcon}
            </div>
         ) : (
            <Image src={icon} alt='icon' width={16} height={16} />
         )}
         <span>{label}</span>
         {
            isSearch && (
               <kbd className=''>
                  <span> CTRL</span> K
               </kbd>
            )
         }
         {
            !!id && isShown === true && (
               <div className={style.item_icons}>
                  <Popover placement="bottom">
                     <PopoverTrigger>
                        <Image className={style.item_icon} src={dotsIcon} alt='icon' width={20} height={20} />
                     </PopoverTrigger>
                     <PopoverContent>
                        <div className={style.popup}>
                           <button onClick={onArchive}>
                              <Image className={style.item_icon} src={trash} alt='icon' width={20} height={20} />

                              Delete
                           </button>

                           <p>Last edited by: {user?.fullName}</p>
                        </div>
                     </PopoverContent>
                  </Popover>
                  <Image className={style.item_icon} src={plus} alt='icon' onClick={onCreate} width={20} height={20} />
               </div>
            )
         }
      </div >
   )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
   return (
      <div style={{
         paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
      }}>
         <Skeleton style={{ display: 'flex', height: '10px', width: '100%', background: '#000' }} />
      </div>
   )
}

export default Item
