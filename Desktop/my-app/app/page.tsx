import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Typography from './test/text'
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className=" text-gray-800 font-semibold	">Hello</div>
        <Button>button</Button>
        {/* font text  */}
        <div className="text-md text-gray-800 font-normal	">
          this is tailwcss page
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-start gap-y-6">
        <Typography>this is grophy1</Typography>
        <Typography variant="h6">this is grophy2</Typography>
        <Typography style="normal-nums tracking-wide line-clamp-1 ">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor
          sit amet, consectetuum quas
        </Typography>
        <p className="line-clamp-3">
          Nulla dolor velit adipisicing duis excepteur esse in duis nostrud
          occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex
          occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu
          dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut
          cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure
          quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint
          voluptate sunt elit mollit officia ad enim sit consectetur enim.
        </p>
      </div>
    </main>
  )
}
