import {
  MenuIcon,
  SearchIcon,
  MicrophoneIcon,
  ViewGridIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline"
import Image from "next/image"

import { signIn, signOut, useSession } from "next-auth/react"
import { Discovery } from "aws-sdk"
import Link from "next/link"

function Header() {
  const { data: session, status } = useSession()
  console.log(session)

  const loading = status === "loading"

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <header className="dark:bg-gray-800 divide-y  sticky top-0 z-40 inset-x-0">
      <div className="flex justify-between items-center w-full h-10 px-6 py-8  ">
        <div className="flex cursor-pointer">
          <Link href={`/`}>
            <h1 className="text-xl font-bold">Youtube Clone</h1>
          </Link>
        </div>

        <div className="flex items-center">
          <form className="flex w-[600px] items-center bg-[#313131]">
            <input
              className="bg-black flex-1 h-10 outline-none"
              type="text"
              placeholder=" Search..."
            />
            <button className="h-10 w-16 flex items-center justify-center">
              <SearchIcon className="h-5" />
            </button>
          </form>
          <button className="bg-black h-10 w-10 ml-4 rounded-full flex justify-center items-center">
            <MicrophoneIcon className="h-5" />
          </button>
        </div>

        {session ? (
          <div className="hidden lg:flex items-center space-x-2 border border-white p-2 ">
            <div className="flex justify-between w-32 ">
              <Link href={`/channel/${session.user.username}`}>
                <a className="flex">
                  <img src={session.user.image} className="h-8 rounded-full" />
                  <p className="ml-2">{session.user.name}</p>
                </a>
              </Link>
              <div onClick={() => signOut()} className="cursor-pointer">
                logout
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="hidden lg:flex items-center space-x-2  p-2 cursor-pointer"
          >
            <div className="flex justify-between w-32 ">
              <ViewGridIcon className="h-6 cursor-pointer" />
              <DotsVerticalIcon className="h-6 cursor-pointer" />
              {/* <Image
                src={`https://res.cloudinary.com/joeloff-dev/image/upload/v1654199326/NskTwAI5_400x400_i4xss6.jpg`}
                alt=""
                width={50}
                height={30}
                objectFit="contain"
                className="cursor-pointer"
              /> */}
              login
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
