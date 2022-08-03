import prisma from "lib/prisma"
import { getUser, getVideos, getSubscribersCount } from "lib/data"

import { useState } from "react"
import { amount } from "lib/config"

import Videos from "components/Videos"
import LoadMore from "components/LoadMore"

import Link from "next/link"
import Image from "next/image"

export default function Channel({ user, initialVideos, suscribers }) {
  console.log(suscribers)
  const [videos, setVideos] = useState(initialVideos)
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

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
            <div>
              <p className="text-gray-400">{suscribers} suscribers</p>
            </div>
          </div>
        </div>

        <div className="">
          <Videos videos={videos} />
          {!reachedEnd && (
            <LoadMore
              videos={videos}
              setVideos={setVideos}
              setReachedEnd={setReachedEnd}
              author={user}
            />
          )}
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

  const suscribers = await getSubscribersCount(context.params.username, prisma)

  return {
    props: {
      initialVideos: videos,
      user,
      suscribers,
    },
  }
}
