import { ReactNode } from 'react'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Toggle } from '../ui/toggle'
import { UploadFile } from './type'

interface IconBoxProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface PreviewProps {
  className?: string
  file: UploadFile
  open: boolean
  setOpen: (s: boolean) => void
  size?: 'sm' | 'lg' | 'xl' | 'default' | 'full' | 'content'
}

export const IconBox = (props: IconBoxProps) => (
  <div
    className={`border-[#E2E8F0] border flex justify-center items-center w-8 h-8 rounded-md cursor-pointer ${cn(
      props?.className
    )}`}
    onClick={props?.onClick}
  >
    <Toggle size="sm">{props?.children}</Toggle>
  </div>
)

export const PreviewPdf = (props: PreviewProps) => {
  return (
    <div>
      <Sheet open={props?.open} onOpenChange={() => props?.setOpen(false)}>
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent className=" md:w-[960px] sm:w-full">
          <SheetHeader>
            <SheetTitle>Preview</SheetTitle>
          </SheetHeader>
          <iframe src={props?.file?.url} width="100%" height="100%" />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export const PdfImage = () => (
  <svg
    width="25"
    height="32"
    viewBox="0 0 25 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <rect width="24.2759" height="32" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#image0_61_1447" transform="scale(0.0227273 0.0172414)" />
      </pattern>
      <image
        id="image0_61_1447"
        width="44"
        height="58"
        href="data:image/png;base64,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"
      />
    </defs>
  </svg>
)
