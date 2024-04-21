import { api } from '@/convex/_generated/api';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchCommand = () => {
   const { user } = useUser();
   const router = useRouter();
   const documents = useQuery(api.documents.getSearch);
   const [isMounted, setIsMounted] = useState(false);


   const toggle = useSearch((store) => store.toggle)
   const isOpen = useSearch((store) => store.isOpen)
   const onClose = useSearch((store) => store.onClose)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) {
      return null
   }
   return (
      <div>

      </div>
   )
}

export default SearchCommand
