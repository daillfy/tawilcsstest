import React, { ReactNode, useState } from 'react'
import { Download, Eye, Upload as UploadIcon, X } from 'lucide-react'
import RcUpload from 'rc-upload'
import type { UploadProps as RcUploadProps } from 'rc-upload'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import { flushSync } from 'react-dom'

import { Progress } from '../ui/progress'
import { IconBox, PdfImage, PreviewPdf } from './component'
import {
  RcFile,
  UploadChangeParam,
  UploadedFile,
  UploadFile,
  UploadProps,
} from './type'
import {
  checkShowIcon,
  file2Obj,
  getFileItem,
  removeFileItem,
  updateFileList,
} from './utils'

const Upload = (props: UploadProps) => {
  const {
    fileList,
    defaultFileList,
    maxCount,
    onChange,
    onRemove,
    onDrop,
    accept,
    action,
    multiple = true,
    showUploadList = true,
    data,
  } = props
  const [mergedFileList, setMergedFileList] = useMergedState(
    defaultFileList || [],
    {
      value: fileList,
      postState: (list) => list ?? [],
    }
  )

  const [open, setOpen] = useState<boolean>(false)

  const [dragState, setDragState] = React.useState<string>('drop')
  const upload = React.useRef<RcUpload>(null)

  React.useMemo(() => {
    const timestamp = Date.now()

    ;(fileList || []).forEach((file: UploadFile, index: number) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`
      }
    })
  }, [fileList])

  const onInternalChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: { percent: number }
  ) => {
    let cloneList = [...changedFileList]

    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1)
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount)
    }

    // Prevent React18 auto batch since input[upload] trigger process at same time
    // which makes fileList closure problem
    flushSync(() => {
      setMergedFileList(cloneList)
    })

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList,
    }

    if (event) {
      changeInfo.event = event
    }

    flushSync(() => {
      onChange?.(changeInfo)
    })
  }

  const onBatchStart: RcUploadProps['onBatchStart'] = (batchFileInfoList) => {
    const objectFileList = batchFileInfoList.map((info) =>
      file2Obj(info.file as RcFile)
    )

    // Concat new files with prev files
    let newFileList = [...mergedFileList]

    objectFileList.forEach((fileObj) => {
      // Replace file if exist
      newFileList = updateFileList(fileObj, newFileList)
    })

    objectFileList.forEach((fileObj, index) => {
      // Repeat trigger `onChange` event for compatible
      let triggerFileObj: UploadFile = fileObj

      if (!batchFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        const { originFileObj } = fileObj
        let clone

        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type,
          }) as any as UploadFile
        } catch (e) {
          clone = new Blob([originFileObj], {
            type: originFileObj.type,
          }) as any as UploadFile
          clone.name = originFileObj.name
          clone.lastModifiedDate = new Date()
          clone.lastModified = new Date().getTime()
        }

        clone.uid = fileObj.uid
        triggerFileObj = clone
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading'
      }

      onInternalChange(triggerFileObj, newFileList)
    })
  }

  const onSuccess = (response: any, file: RcFile, xhr: any) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'done'
    targetItem.percent = 100
    targetItem.response = response
    targetItem.xhr = xhr

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList)
  }
  const onError = (error: Error, response: any, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList)
  }
  const onProgress = (e: { percent: number }, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'uploading'
    targetItem.percent = e.percent

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList, e)
  }

  const handleRemove = (file: UploadFile) => {
    let currentFile: UploadFile
    Promise.resolve(
      typeof onRemove === 'function' ? onRemove(file) : onRemove
    ).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return
      }

      const removedFileList = removeFileItem(file, mergedFileList)

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' }
        mergedFileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name'
          if (
            item[matchKey] === currentFile[matchKey] &&
            !Object.isFrozen(item)
          ) {
            item.status = 'removed'
          }
        })
        // upload.current?.abort(currentFile as RcFile);
        console.log('---remove---step2')
        onInternalChange(currentFile, removedFileList)
      }
    })
  }

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type)

    if (e.type === 'drop') {
      onDrop?.(e)
    }
  }

  const rcUploadProps = {
    onBatchStart,
    onError,
    onProgress,
    onSuccess,
    ...props,
    data,
    multiple,
    action,
    accept,
    onChange: undefined,
  } as RcUploadProps

  const donwload = (file: UploadFile) => {
    if (props?.onDownload) {
      props?.onDownload(file)
    } else {
      fetch(`${file?.url}`, {
        method: 'GET',
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const fileLink = document.createElement('a')
          fileLink.href = url
          fileLink.download = `${name}`
          document.body.appendChild(fileLink)
          fileLink.click()
          fileLink.remove()
        })
        .catch(console.error)
    }
  }

  const preview = (file: UploadFile) => {
    if (props?.onPreview) {
      props?.onPreview(file)
    } else {
      setOpen(true)
    }
  }

  const showIcon = checkShowIcon(showUploadList || false)
  return (
    <div className="upload-wraper p-8">
      <div
        className={`${
          onDrop
            ? 'bg-[#f4f6f8] borer-[#919eab] opcity-[0.32] p-10 rounded-md transition ease-in-out delay-150 hover:p-12 hover:bg-slate-50'
            : ''
        }`}
        onClick={onFileDrop}
      >
        <RcUpload {...rcUploadProps} ref={upload}>
          {props?.children ||
            (onDrop ? (
              <div>
                Upload Files
                <div>
                  Drag and drop your PDF here or <span>Browse.</span>
                </div>
              </div>
            ) : (
              <button className="bg-[#0F172A] text-white px-4 py-2 rounded-md flex flex-row text-sm mb-4 cursor-pointer">
                <UploadIcon size={16} color="#fff" strokeWidth={3} />
                <span className="pl-2">Upload File</span>
              </button>
            ))}
        </RcUpload>
        {mergedFileList?.map((file) => {
          return (
            <div className="relative" key={file?.uid}>
              <div
                className={`flex border ${
                  file?.status === 'uploading' ? 'p-0' : 'py-4 pl-6 pr-4'
                } w-full rounded-md relative z-10 ${
                  file?.status === 'error' ? 'border-[#ff4d4f]' : ''
                }`}
              >
                {file?.status === 'uploading' && (
                  <div className="absolute z-100 bg-slate-50 w-full h-full flex items-center top-0 flex-col">
                    {props?.locale?.uploading}
                    <Progress value={file?.percent} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center w-full">
                  <div className={`flex gap-2 items-center `}>
                    <PdfImage />
                    <div className="line-clamp-1">{file?.name}</div>
                  </div>
                  {showIcon?.show && (
                    <div className="flex gap-1">
                      {(file?.status === 'success' ||
                        file?.status === 'done') && (
                        <>
                          <IconBox onClick={() => donwload(file)}>
                            {/* @ts-ignore */}
                            {showIcon?.downloadIcon || (
                              <Download size={16} strokeWidth={3} />
                            )}
                          </IconBox>
                          <IconBox onClick={() => preview(file)}>
                            {/* @ts-ignore */}
                            {showIcon?.previewIcon || (
                              <Eye size={16} strokeWidth={3} />
                            )}
                          </IconBox>
                        </>
                      )}
                      <IconBox onClick={() => handleRemove(file)}>
                        {/* @ts-ignore */}
                        {showIcon?.removeIcon || (
                          <X size={16} strokeWidth={3} />
                        )}
                      </IconBox>
                    </div>
                  )}
                </div>
              </div>
              {file?.status === 'error' && (
                <div className="text-[#ff4d4f] line-clamp-1">
                  {file?.error?.message || props?.locale?.uploadError}
                </div>
              )}
              <PreviewPdf file={file} open={open} setOpen={setOpen} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Upload
