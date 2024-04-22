"use client"

import React, { ElementRef, useEffect, useRef, useState } from 'react'
import style from '@/styles/Navigation.module.scss'
import { useMediaQuery } from 'usehooks-ts';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@udecode/cn';
import UserItem from './userItem';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Item from './Item';
import plusIcon from '@/public/plusIcon.svg';
import trash from '@/public/trash.svg';
import plus from '@/public/plus.svg';
import searchIcon from '@/public/searchIcon.svg';
import settingsIcon from '@/public/settingsIcon.svg';
import menu from '@/public/menu.svg';
import { toast } from 'sonner';
import DocumentList from './DocumentList';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import TrashBox from './TrashBox';
import ConfirmModel from '@/components/models/confirmModel';
import Navbar from './Navbar';
import Image from 'next/image';
import { useSearch } from '@/hooks/use-search';

const Navigation = () => {
   const search = useSearch()
   const pathname = usePathname()
   const params = useParams();
   const isResizingRef = useRef(false);
   const isMobile = useMediaQuery('(max-width: 768px)');
   const create = useMutation(api.documents.create)
   const sidebarRef = useRef<ElementRef<'aside'>>(null);
   const navigationRef = useRef<ElementRef<'div'>>(null);
   const [isResetting, setIsResetting] = useState(false);
   const [isCollapsed, setIsCollapsed] = useState(isMobile);





   const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
   };

   const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = event.clientX;

      if (newWidth < 320) newWidth = 320;
      if (newWidth > 520) newWidth = 520;
      if (navigationRef.current) {
         navigationRef.current.style.setProperty('left', `${newWidth}px`);
      }
      if (sidebarRef.current && navigationRef.current) {
         sidebarRef.current.style.width = `${newWidth}px`;
      }
   };
   useEffect(() => {
      if (navigationRef.current) {
         navigationRef.current.style.setProperty('left', '320px');
      }
   }, [])

   const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
   };


   const handleCreate = () => {
      const promise = create({ title: 'Untitled' })

      toast.promise(promise, {
         loading: 'Creating new note...',
         success: 'New note created!',
         error: 'Failed tot create new note'
      })
   }

   return (
      <>
         <div>
            <aside ref={sidebarRef} className={cn(style.navigation, isResetting && style.navigation)}>

               <div>
                  <UserItem />
                  <button onClick={search.onOpen}>
                     CLICK
                  </button>
                  <Item
                     label="Search"
                     icon={searchIcon}
                     isSearch
                     onClick={search.onOpen}
                  />
                  <Item onClick={handleCreate} icon={plusIcon} label={"New page"} />
               </div>

               <div>
                  <DocumentList />
               </div>

               <div>
                  <Item onClick={handleCreate} icon={plus} label={"Add page"} />
               </div>
               <Popover placement="bottom">
                  <PopoverTrigger>
                     <button className={style.navigation_popup_button}>
                        <Item icon={trash} label={"Trash"} />
                     </button>
                  </PopoverTrigger>
                  <PopoverContent>
                     <div className={style.navigation_popup}>
                        <TrashBox />
                     </div>
                  </PopoverContent>
               </Popover>
               <div
                  onMouseDown={handleMouseDown}

                  className={style.navigation_resize}
               >

               </div>
            </aside>
            <div
               ref={navigationRef}
               className={cn(style.navigation_menu)}>
               {!!params.documentId ? (
                  <Navbar
                  />
               ) : (
                  <nav >
                     {isCollapsed && (
                        <div
                           role="button"
                        >
                           <Image width={24} height={24} alt='icon' src={menu} />
                        </div>
                     )}
                  </nav>
               )}
            </div>
         </div>


      </>
   )
}

export default Navigation
