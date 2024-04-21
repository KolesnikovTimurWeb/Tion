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

const Navigation = () => {
   const pathname = usePathname()
   const params = useParams();
   const isResizingRef = useRef(false);
   const isMobile = useMediaQuery('(max-width: 768px)');
   const create = useMutation(api.documents.create)
   const sidebarRef = useRef<ElementRef<'aside'>>(null);
   const navigationRef = useRef<ElementRef<'div'>>(null);
   const [isResetting, setIsResetting] = useState(false);
   const [isCollapsed, setIsCollapsed] = useState(isMobile);


   useEffect(() => {
      if (isMobile) {
         collapse();
      } else {
         resetWidth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isMobile]);



   useEffect(() => {
      if (isMobile) {
         collapse();
      } else {
         resetWidth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname]);



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

      if (sidebarRef.current && navigationRef.current) {
         sidebarRef.current.style.width = `${newWidth}px`;
      }
   };

   const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
   };
   const resetWidth = () => {
      if (sidebarRef.current && navigationRef.current) {
         setIsCollapsed(false);
         setIsResetting(true);

         sidebarRef.current.style.width = isMobile ? '100%' : '320px';
         sidebarRef.current.style.setProperty('left', '0');
         navigationRef.current.style.setProperty('width', isMobile ? '0' : '320px)');
         navigationRef.current.style.setProperty('left', isMobile ? '50%' : '320px');

         setTimeout(() => {
            setIsResetting(false);
         }, 300);
      }
   };

   const collapse = () => {
      if (sidebarRef.current && navigationRef.current) {
         setIsCollapsed(true);
         setIsResetting(true);

         sidebarRef.current.style.width = '0';
         sidebarRef.current.style.setProperty('left', '-100px');
         setTimeout(() => {
            setIsResetting(false);
         }, 300);
      }
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
         <aside ref={sidebarRef} className={cn(style.navigation, isResetting && style.navigation)}>
            <div
               onClick={collapse}
               role="button"
               className={cn(style.navigation_left)}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg>

            </div>
            <div>
               <UserItem />
               <Item onClick={handleCreate} icon={settingsIcon} label={"Setting"} />
               <Item onClick={handleCreate} isSearch icon={searchIcon} label={"Search"} />
               <Item onClick={handleCreate} icon={plusIcon} label={"New page"} />
            </div>

            <div>
               <DocumentList />
            </div>

            <div>
               <Item onClick={handleCreate} icon={plus} label={"Add page"} />
            </div>
            <Popover placement="right">
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
               onClick={resetWidth}
               className={style.navigation_resize}
            >

            </div>
         </aside>
         <div
            ref={navigationRef}
            className={cn(style.navigation_menu)}>
            {!!params.documentId ? (
               <Navbar
                  isCollapsed={isCollapsed}
                  onResetWidth={resetWidth}
               />
            ) : (
               <nav >
                  {isCollapsed && (
                     <div
                        onClick={resetWidth}
                        role="button"
                     >
                        <Image width={24} height={24} alt='icon' src={menu} />
                     </div>
                  )}
               </nav>
            )}
         </div>

      </>
   )
}

export default Navigation
