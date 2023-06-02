import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type Container = {
  className?: string
  children?: ReactNode
}

export default function Container(props: Container) {
  return (
    <div
      className={cn(
        `flex font flex-col sm:w-[960px] md:w-[960px] xs:w-fill overflow-hidden p-8 ${props?.className}`
      )}
    >
      {props?.children}
    </div>
  )
}
