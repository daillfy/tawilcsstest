'use client'

import { useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { UploadFile } from '@/components/upload/type'

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
      url: 'https://backend.withcontext.ai/backend/upload/2023/06/928bbbdb-32e6-40f6-a886-cd478f9bb5cc.pdf',
      name: '3.pdf',
      uid: '111111111111',
      status: 'error',
    },
  ],
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>files</FormLabel>
                <FormControl>
                  <Upload
                    // @ts-ignore
                    fileList={field?.value || []}
                    onRemove={handleRemove}
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
