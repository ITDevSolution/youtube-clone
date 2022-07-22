import prisma from "lib/prisma"
import { getUser, getVideos } from "lib/data"

import Videos from "components/Videos"
import Link from "next/link"
import Image from "next/image"

export default function Channel({ user, videos }) {
  if (!user)
    return <p className="text-center font-bold">Channel does not exist</p>
  return (
    <div className="flex justify-between">
      <div className="flex flex-col  m-5">
        <div className="flex mb-5">
          {user.image && (
            <Image
              className="rounded-full"
              width={50}
              height={50}
              src={user.image}
            />
          )}
          <div className="mt-2 ml-4">
            <p className="text-lg font-bold text-white">{user.name}</p>
          </div>
        </div>

        <div className="">
          <Videos videos={videos} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  //we have the username in context.params.username
  let user = await getUser(context.params.username, prisma)
  user = JSON.parse(JSON.stringify(user))

  let videos = await getVideos({ author: user.id }, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      videos,
      user,
    },
  }
}
