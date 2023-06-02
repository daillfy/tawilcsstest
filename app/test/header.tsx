import { ReactNode } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export type headerType = {
  children?: ReactNode
  action?: ReactNode
}

export default function Header(props: headerType) {
  return (
    <div className="w-full">
      <div className="flex p-8 flex-row justify-between">
        <Link className="cursor-pointer	" href="/">
          <img
            src="https://webcdn.withcontext.ai/web/assets/zfWIJQomqNWvX2ZbV4SpN.svg"
            alt="long image"
            width={197}
            height={40}
          />
        </Link>
        <div>
          <Button variant="ghost" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="MuiBox-root css-1t9pz9x iconify iconify--material-symbols"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between px-8 py-0">
        {' '}
        {props?.action}
      </div>
    </div>
  )
}
