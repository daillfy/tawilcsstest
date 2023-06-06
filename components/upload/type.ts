import type {
  RcFile as OriRcFile,
  UploadRequestOption as RcCustomRequestOptions,
  UploadProps as RcUploadProps,
} from 'rc-upload/lib/interface'

// @mui

// ----------------------------------------------------------------------
export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'done'
  | 'uploading'
  | 'removed'

export interface CustomFile extends File {
  progress?: number
  path?: string
  preview?: string
  lastModifiedDate?: Date
  indexStatus?: number
}

export interface UploadedFile {
  name: string
  url: string
  process?: number
}

export function isUploadedFile(obj: any): obj is UploadedFile {
  return obj !== null && 'name' in obj && 'url' in obj
}
export interface RcFile extends OriRcFile {
  readonly lastModifiedDate: Date
}

export interface UploadFile<T = any> {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
  originFileObj?: File
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
}
// export type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'>

export interface UploadChangeParam<T = UploadFile> {
  // https://github.com/ant-design/ant-design/issues/14420
  file: T
  fileList: T[]
  event?: { percent: number }
}

export interface UploadProps<T = any> extends Pick<RcUploadProps, 'capture'> {
  name?: string
  defaultFileList?: Array<UploadFile<T>>
  fileList?: Array<UploadFile<T>>
  action?:
    | string
    | ((file: RcFile) => string)
    | ((file: RcFile) => PromiseLike<string>)
  directory?: boolean
  data?:
    | Record<string, unknown>
    | ((
        file: UploadFile<T>
      ) => Record<string, unknown> | Promise<Record<string, unknown>>)
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'
  // headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface
  multiple?: boolean
  accept?: string
  // beforeUpload?: (
  //   file: RcFile,
  //   FileList: RcFile[]
  // ) => BeforeUploadValueType | Promise<BeforeUploadValueType>
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void
  className?: string
  onPreview?: (file: UploadFile<T>) => void
  onDownload?: (file: UploadFile<T>) => void
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>
  // customRequest?: (options: RcCustomRequestOptions) => void;
  withCredentials?: boolean
  openFileDialogOnClick?: boolean
  locale?: UploadLocale
  id?: string
  progress?: any
  maxCount?: number
  children?: React.ReactNode
}

export interface ShowUploadListInterface<T = any> {
  showRemoveIcon?: boolean
  showPreviewIcon?: boolean
  showDownloadIcon?: boolean
  removeIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode)
  downloadIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode)
  previewIcon?: React.ReactNode | ((file: UploadFile<T>) => React.ReactNode)
}

export interface UploadLocale {
  uploading?: string
  removeFile?: string
  downloadFile?: string
  uploadError?: string
  previewFile?: string
}

export interface UploadState<T = any> {
  fileList: UploadFile<T>[]
  dragState: string
}
export interface UploadListProps<T = any> {
  onPreview?: (file: UploadFile<T>) => void
  onDownload?: (file: UploadFile<T>) => void
  onRemove?: (file: UploadFile<T>) => void | boolean
  items?: Array<UploadFile<T>>
  progress?: any
  className?: string
  showRemoveIcon?: boolean
  showDownloadIcon?: boolean
  showPreviewIcon?: boolean
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  locale: UploadLocale
}
