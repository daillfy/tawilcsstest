'use client'

import { useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import axios from '@/lib/axios'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Upload from '@/components/upload'
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from '@/components/upload/type'
import { getBase64 } from '@/components/upload/utils'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  files: z.array(z.object({ url: z.string(), uid: z.string() })).optional(),
})

const defaultValues = {
  name: 'lalalal',
  files: [
    {
      url: 'https://backend.withcontext.ai/backend/upload/2023/06/4c4118f6-3891-497c-92c0-e00bdf9db803.webp',
      name: '1.wap',
      uid: '111111111111',
      status: 'uploading',
    },
    {
      url: 'https://backend.withcontext.ai/backend/upload/2023/06/928bbbdb-32e6-40f6-a886-cd478f9bb5cc.pdf',
      name: '3.pdf',
      uid: '1111111111112',
      status: 'uploading',
    },
    {
      url: 'https://backend.withcontext.ai/backend/upload/2023/06/928bbbdb-32e6-40f6-a886-cd478f9bb5cc.pdf',
      name: '3.pdf',
      uid: '1111111111112',
      status: 'success',
    },
  ],
}

const handleChange: UploadProps['onChange'] = (
  info: UploadChangeParam<UploadFile>
) => {
  console.log(info, '-----------info')
  if (info.file.status === 'uploading') {
    // setLoading(true);
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      // setLoading(false);
      // setImageUrl(url);
    })
  }
}

const UploadApi = (file: File) => {
  const formData = new FormData()
  // @ts-ignore
  formData.append('file', file)
  return axios.post(`/v1/chat/file/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJ4Q2pQSnFGNDZKUzNWX01rMGxoNCJ9.eyJnaXZlbl9uYW1lIjoiZGFpbGx5IiwiZmFtaWx5X25hbWUiOiJsdWNreSIsIm5pY2tuYW1lIjoiZGFpbHlsdWNreTg4IiwibmFtZSI6ImRhaWxseSBsdWNreSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRlbFRmX2VjN3ZWMENYTlI1aXM1U2s2SExGMHR6bkFVNnJiS180aT1zOTYtYyIsImxvY2FsZSI6InpoLUNOIiwidXBkYXRlZF9hdCI6IjIwMjMtMDYtMDVUMDc6MjI6MDkuNjEzWiIsImVtYWlsIjoiZGFpbHlsdWNreTg4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgud2l0aGNvbnRleHQuYWkvIiwiYXVkIjoiTlh3c01Fb3pwWElzWVI3Z3hvWUZtUlNYVnU2bXpLREkiLCJpYXQiOjE2ODYwMzk0MDIsImV4cCI6MTY4OTYzOTQwMiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDA5MTU4MjQwNTI2OTk4NTAzNjAiLCJzaWQiOiJUTU1xSnhZQm82ZFVMempGbWEzTFI5X1VHSjdMOFBadSIsIm5vbmNlIjoiTFRGMk1tUmtPRnBEVWkxT0xYQXlVRU4wWW1weWJHbGZaVlZLVG5SR2FHaHNOVzR5UzNKdE9XcERXUT09In0.tiKOyHgr2YXuzKxLlaB6DVOXUtbTQq69aTLoIsi9FzGarx4t_-tFYtOlb_Gq4-6SWQFVUjjH9ySZAhLp9MGgLcKQwDPD2ok6ZECYRWlZGeIozwKpTWDLyr81dvoxi2cdwWH1aGEiTn4ZIZXiQGhOBukwUnbjia6NnoImGBEnnw5DpUKofwaHE03MJg0FmdHGCwuXsZQwJR_Sua1S9vKf8JHqp36xnevgIxFTPYuDzmOiGZOs1SxQStnbBYJA2ds_pcMIrYrnTC23pluJBuLrkMpwFpHTEA5EVKDbGpLx_Rc8On4UNQRnyR-N9KXqTbRkJwd9syqelFmsMlXeOFjcvg',
    },
  })
}

const onChange = async (file: File, fileList: File[]) => {
  console.log(file, '----------file')
  // await UploadApi(file).then((res) => {
  //   console.log(res, '------------res')
  // })
}

function InputReactHookForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, '----data')
  }

  const { setValue, reset, watch } = form
  const values = watch()
  const handleRemove = useCallback(
    (file: UploadFile) => {
      setValue(
        'files',
        values?.files?.filter((item) => item?.uid !== file?.uid)
      )
    },
    [setValue, values?.files]
  )
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>files</FormLabel>
                <FormControl>
                  <Upload
                    action="https://chat-api.withcontext.ai/v1/chat/file/upload"
                    headers={{
                      Referer: 'https://beta.withcontext.ai/',
                      referrerPolicy: 'no-referrer',
                      Authorization:
                        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJ4Q2pQSnFGNDZKUzNWX01rMGxoNCJ9.eyJnaXZlbl9uYW1lIjoiZGFpbGx5IiwiZmFtaWx5X25hbWUiOiJsdWNreSIsIm5pY2tuYW1lIjoiZGFpbHlsdWNreTg4IiwibmFtZSI6ImRhaWxseSBsdWNreSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRlbFRmX2VjN3ZWMENYTlI1aXM1U2s2SExGMHR6bkFVNnJiS180aT1zOTYtYyIsImxvY2FsZSI6InpoLUNOIiwidXBkYXRlZF9hdCI6IjIwMjMtMDYtMDVUMDc6MjI6MDkuNjEzWiIsImVtYWlsIjoiZGFpbHlsdWNreTg4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgud2l0aGNvbnRleHQuYWkvIiwiYXVkIjoiTlh3c01Fb3pwWElzWVI3Z3hvWUZtUlNYVnU2bXpLREkiLCJpYXQiOjE2ODYwMzk0MDIsImV4cCI6MTY4OTYzOTQwMiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDA5MTU4MjQwNTI2OTk4NTAzNjAiLCJzaWQiOiJUTU1xSnhZQm82ZFVMempGbWEzTFI5X1VHSjdMOFBadSIsIm5vbmNlIjoiTFRGMk1tUmtPRnBEVWkxT0xYQXlVRU4wWW1weWJHbGZaVlZLVG5SR2FHaHNOVzR5UzNKdE9XcERXUT09In0.tiKOyHgr2YXuzKxLlaB6DVOXUtbTQq69aTLoIsi9FzGarx4t_-tFYtOlb_Gq4-6SWQFVUjjH9ySZAhLp9MGgLcKQwDPD2ok6ZECYRWlZGeIozwKpTWDLyr81dvoxi2cdwWH1aGEiTn4ZIZXiQGhOBukwUnbjia6NnoImGBEnnw5DpUKofwaHE03MJg0FmdHGCwuXsZQwJR_Sua1S9vKf8JHqp36xnevgIxFTPYuDzmOiGZOs1SxQStnbBYJA2ds_pcMIrYrnTC23pluJBuLrkMpwFpHTEA5EVKDbGpLx_Rc8On4UNQRnyR-N9KXqTbRkJwd9syqelFmsMlXeOFjcvg',
                    }}
                    // @ts-ignore
                    fileList={field?.value || []}
                    onRemove={handleRemove}
                    withCredentials
                    locale={{
                      uploading: <div className="text-xs">uploading</div>,
                    }}
                    listType="image"
                    // @ts-ignore
                    onChange={handleChange}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default InputReactHookForm
