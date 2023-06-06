import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Typography from '../components/ui/typography'
import Container from './test/container'
import Header from './test/header'

const HeadAction = () => (
  <div className="flex flex-row justify-between w-full">
    <Typography variant="h3">Models</Typography>
    <Button className="text-white	">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-plus"
      >
        <line x1="12" x2="12" y1="5" y2="19"></line>
        <line x1="5" x2="19" y1="12" y2="12"></line>
      </svg>
      <Typography style="color-[#fff] ml-1">Create</Typography>
    </Button>
  </div>
)

export default function Home() {
  return (
    <>
      <Header action={<HeadAction />} />
      <Container className="mt-0">
        <Link href="/test/form">to customePage</Link>
        {/* 断点设计 */}
        <div className="w-full inline-grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-1 gap-4 mt-6 ">
          <div className=" h-64 pt-4  border rounded-lg relative cursor-pointer">
            <div>
              <Image
                src="https://backend.withcontext.ai/backend/upload/2023/04/7ae3135d-588e-4b46-b97b-afcd53170013.jpeg"
                alt="model card page"
                width={100}
                height={100}
                className="pl-4 relative z-10"
              />
              <div className="border-b-[1px] h-1 border-[#808080] w-full absolute top-14 z-1 opacity-50"></div>
            </div>
            <div className="gap-1 flex flex-col px-4 mt-2">
              <Typography variant="body2">@withContex ai</Typography>
              <Typography variant="h5">emplay ai model</Typography>
              <Typography style="line-clamp-3 text-secondary" variant="body2">
                This is an employee handbook AI Bot. You can consult Context on
                company vacation, benefits, corporate cultures, etc.
              </Typography>
            </div>
          </div>
          <Card className=" h-[256px] cursor-pointer">
            <div className="pt-4 px-0 relative pb-2">
              <Image
                src="https://backend.withcontext.ai/backend/upload/2023/04/7ae3135d-588e-4b46-b97b-afcd53170013.jpeg"
                alt="model card page"
                width={100}
                height={100}
                className="pl-4 relative z-10"
              />
              <div className="border-b-[1px] h-1 border-[#808080] w-full absolute top-14 z-1 opacity-50"></div>
            </div>
            <CardContent className="px-4 grid gap-2">
              <CardDescription>@withContex ai</CardDescription>
              <CardTitle>emplay ai model</CardTitle>
              <CardDescription className="line-clamp-3">
                This is an employee handbook AI Bot. You can consult Context on
                company vacation, benefits, corporate cultures, etc.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className=" h-[256px] cursor-pointer">
            <div className="pt-4 px-0 relative pb-2">
              <Image
                src="https://backend.withcontext.ai/backend/upload/2023/04/7ae3135d-588e-4b46-b97b-afcd53170013.jpeg"
                alt="model card page"
                width={100}
                height={100}
                className="pl-4 relative z-10"
              />
              <div className="border-b-[1px] h-1 border-[#808080] w-full absolute top-14 z-1 opacity-50"></div>
            </div>
            <CardContent className="px-4 grid gap-2">
              <CardDescription>@withContex ai</CardDescription>
              <CardTitle>emplay ai model</CardTitle>
              <CardDescription className="line-clamp-3">
                This is an employee handbook AI Bot. You can consult Context on
                company vacation, benefits, corporate cultures, etc.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className=" h-[256px] cursor-pointer">
            <div className="pt-4 px-0 relative pb-2">
              <Image
                src="https://backend.withcontext.ai/backend/upload/2023/04/7ae3135d-588e-4b46-b97b-afcd53170013.jpeg"
                alt="model card page"
                width={100}
                height={100}
                className="pl-4 relative z-10"
              />
              <div className="border-b-[1px] h-1 border-[#808080] w-full absolute top-14 z-1 opacity-50"></div>
            </div>
            <CardContent className="px-4 grid gap-2">
              <CardDescription>@withContex ai</CardDescription>
              <CardTitle>emplay ai model</CardTitle>
              <CardDescription className="line-clamp-3">
                This is an employee handbook AI Bot. You can consult Context on
                company vacation, benefits, corporate cultures, etc.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}
