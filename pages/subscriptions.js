import Videos from "components/Videos"
import { useState } from "react"

import { useRouter } from "next/router"
import { getSession, useSession } from "next-auth/react"

import { getVideos } from "lib/data"
import prisma from "lib/prisma"
import { amount } from "lib/config"

import Navbar from "components/Navbar"
import LoadMore from "components/LoadMore"

export default function Home({ initialVideos }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [videos, setVideos] = useState(initialVideos)
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

  const loading = status === "loading"

  if (loading) {
    return null
  }

  if (session && !session.user.name) {
    router.push("/setup")
  }

  return (
    <div className="flex ">
      <Navbar />
      <main className="flex ml-24 h-screen ">
        {videos.length === 0 && (
          <div className="flex-auto bg-slate-900 pt-20">
            <p className="p-4 text-xl font-semibold">No videos found!</p>
          </div>
        )}
      </main>
      <div className="flex flex-col flex-wrap pt-20 pl-10 bg-slate-900">
        <Videos videos={videos} />

        {!reachedEnd && (
          <LoadMore
            videos={videos}
            setVideos={setVideos}
            setReachedEnd={setReachedEnd}
            subscriptions={session.user.id}
          />
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  let videos = await getVideos({ subscriptions: session.user.id }, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      initialVideos: videos,
    },
  }
}
