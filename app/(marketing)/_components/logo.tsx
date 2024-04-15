import React from 'react'
import { Poppins } from 'next/font/google';

import Link from 'next/link';
import { cn } from '@udecode/cn';

const font = Poppins({
   subsets: ['latin'],
   weight: ['400', '600'],
});

const Logo = () => {
   return (
      <div>
         <h2 className={cn('font-semibold', font.className)}>Tion 222</h2>
      </div>
   )
}

export default Logo
