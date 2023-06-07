import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { VariantProps } from 'class-variance-authority'
import { BoxIcon, Download, Eye, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Progress } from '../ui/progress'
import { Skeleton } from '../ui/skeleton'
import { Toggle } from '../ui/toggle'
import { FileItemProps, UploadFile } from './type'
import { checkShowIcon } from './utils'

interface IconBoxProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  tragClassName?: string
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
    <Toggle className={props?.tragClassName} size="sm">
      {props?.children}
    </Toggle>
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

export const PDFFile = (props: FileItemProps) => {
  const {
    file,
    showUploadList,
    fileNameStyle,
    onDownload,
    onPreview,
    onRemove,
  } = props
  const showIcon = checkShowIcon(showUploadList || false)
  const [open, setOpen] = useState<boolean>(false)
  const preview = (file: UploadFile) => {
    if (props?.onPreview) {
      props?.onPreview(file)
    } else {
      setOpen(true)
    }
  }
  return (
    <div
      className={`relative ${file?.status === 'uploading' ? 'bg-gray-50	' : ''}`}
      key={file?.uid}
    >
      <div
        className={`flex border py-4 pl-6 pr-4 w-full rounded-md relative z-10 h-full ${
          file?.status === 'error' ? 'border-[#ff4d4f]' : ''
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <div className={`flex gap-2 items-center flex-b w-[90%] `}>
            <PdfImage />
            <div className="flex flex-col gap-1 w-full">
              <div className={`line-clamp-1 ${fileNameStyle}`}>
                {file?.name}
              </div>
              {file?.status === 'uploading' && (
                <Progress value={file?.percent} className="h-1" />
              )}
            </div>
          </div>
          {showIcon?.show && (
            <div className="flex gap-1">
              {(file?.status === 'success' || file?.status === 'done') && (
                <>
                  <IconBox onClick={() => onDownload!(file)}>
                    {/* @ts-ignore */}
                    {showIcon?.downloadIcon || (
                      <Download size={16} strokeWidth={3} />
                    )}
                  </IconBox>
                  <IconBox onClick={() => preview(file)}>
                    {/* @ts-ignore */}
                    {showIcon?.previewIcon || <Eye size={16} strokeWidth={3} />}
                  </IconBox>
                </>
              )}
              <IconBox onClick={() => onRemove!(file)}>
                {/* @ts-ignore */}
                {showIcon?.removeIcon || <X size={16} strokeWidth={3} />}
              </IconBox>
            </div>
          )}
        </div>
      </div>
      {file?.status === 'error' && (
        <div className="text-[rgb(255,77,79)] line-clamp-1">
          {file?.error?.message || props?.locale?.uploadError}
        </div>
      )}
      <PreviewPdf file={file} open={open} setOpen={setOpen} />
    </div>
  )
}

export const ImageFile = (props: FileItemProps) => {
  const { className, file, showUploadList, onRemove } = props
  const showIcon = checkShowIcon(showUploadList || false)
  const [open, setOpen] = useState<boolean>(false)
  const previw = () => {
    console.log('--preview')
    if (props?.onPreview) {
      props?.onPreview(file)
    } else {
      setOpen(true)
    }
  }
  const showBoth = showIcon?.showRemoveIcon && showIcon?.removeIcon
  return (
    <>
      <div
        className={`${className} p-2 border w-[80px] rounded-lg relative h-[80px] ${
          file?.status === 'error' ? 'border-[#ff4d4f]' : ''
        } ${file?.status === 'uploading' ? 'bg-gray-50' : ''}`}
        key={file?.uid}
      >
        <div className={`w-full h-full relative z-10 flex items-center`}>
          {file?.status == 'uploading' ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
              {props?.locale?.uploading || 'uploading'}
              <Progress value={file?.percent} className="h-1" />
            </div>
          ) : (
            <Image
              src={file?.url || ''}
              width={72}
              height={72}
              alt={file?.name}
            />
          )}
        </div>
        {showUploadList !== false && (
          <Toggle
            onClick={() => onRemove!(file)}
            className={`border rounded-full w-6 h-6 z-20  p-1 ${
              file?.status === 'uploading' ? 'bg-white' : 'bg-sky-50'
            } absolute top-1 right-1`}
          >
            {/* @ts-ignore */}
            {showIcon?.removeIcon || <X size={18} strokeWidth={3} />}
          </Toggle>
        )}

        {showBoth && file?.status !== 'uploading' && (
          <div
            className={
              'flex items-center w-full h-full absolute z-20 gap-1 top-0'
            }
          >
            <Toggle
              onClick={() => onRemove!(file)}
              className={`border rounded-full z-20 p-1 bg-sky-50 w-5 h-5`}
            >
              {/* @ts-ignore */}
              {showIcon?.removeIcon || <X size={18} strokeWidth={3} />}
            </Toggle>

            <Toggle
              onClick={() => previw()}
              className="w-5 h-5 p-1 bg-sky-50 border rounded-full"
            >
              {/* @ts-ignore */}
              {showIcon?.previewIcon || <Eye size={18} strokeWidth={3} />}
            </Toggle>
          </div>
        )}
      </div>
      {file?.status === 'error' && (
        <div className="text-[rgb(255,77,79)] line-clamp-1">
          {file?.error?.message || props?.locale?.uploadError}
        </div>
      )}
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <Image
            src={file?.url}
            full
            sizes="(max-width: 500px)"
            width={500}
            height={500}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
