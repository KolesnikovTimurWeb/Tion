'use client';

import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import ConfirmModel from '@/components/models/confirmModel';

interface BannerProps {
   documentId: Id<'documents'>;
}

export const Banner = ({ documentId }: BannerProps) => {
   const router = useRouter();

   const remove = useMutation(api.documents.remove);
   const restore = useMutation(api.documents.restore);
   const document = useQuery(api.documents.getById, { documentId: documentId });


   const onRemove = () => {


      const promise = remove({ id: documentId });

      toast.promise(promise, {
         loading: 'Deleting document...',
         success: 'Document deleted!',
         error: 'Failed to delete document',
      });

      router.push('/documents');
   };

   const onRestore = () => {
      const promise = restore({ id: documentId });

      toast.promise(promise, {
         loading: 'Restored document...',
         success: 'Document restored!',
         error: 'Failed to restore document',
      });
   };

   return (
      <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
         <p>This page has been archived.</p>
         <button
            onClick={onRestore}>
            Restore page
         </button>
         <ConfirmModel onConfirm={onRemove}>
            <button>
               Delete page
            </button>
         </ConfirmModel>
      </div>
   );
};