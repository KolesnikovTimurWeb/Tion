"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import style from "@/styles/UserItem.module.scss";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/clerk-react";

const UserItem = () => {
   const { user } = useUser();
   return (
      <div>
         <Dropdown className={style.dropdown}>
            <DropdownTrigger className={style.dropdown_trigger}>
               <Button>
                  <Image alt="Avatar" width={24} height={24} src={user?.imageUrl || "null"} />
                  <p>{user?.firstName}&apos;s Nextion</p>
               </Button>
            </DropdownTrigger>
            <DropdownMenu className={style.dropdown_menu} >
               <DropdownItem isReadOnly key="profile">
                  <p>{user?.emailAddresses[0].emailAddress}</p>
               </DropdownItem>
               <DropdownItem isReadOnly key="avatar">
                  <Image alt="Avatar" width={24} height={24} src={user?.imageUrl || "null"} />
                  <h2>{user?.fullName}&apos;s Nextion</h2>
               </DropdownItem>
               <DropdownItem isReadOnly key="sign-out" >
                  <SignOutButton>
                     <button>
                        Sign out
                     </button>
                  </SignOutButton>


               </DropdownItem>
            </DropdownMenu>
         </Dropdown>
      </div >
   )
}

export default UserItem
