import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import style from '@/styles/Navbar.module.scss'
import Image from 'next/image'
import svg from '@/public/spinner.svg'
import { cn } from '@udecode/cn'



const loaderVariants = cva(
   style.loader,
   {
      variants: {
         size: {
            default: style.loader_default,
            small: style.loader_small
         }
      }
   }
)

interface SpinnerProps extends VariantProps<typeof loaderVariants> { }


const Loader = ({ size }: SpinnerProps) => {
   return (
      <div className={cn(loaderVariants({ size }))} >
         <Image alt='Loader' width={24} height={24} src={svg} />
      </div>
   )
}

export default Loader
