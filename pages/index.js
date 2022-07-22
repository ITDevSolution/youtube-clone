import Head from "next/head"
import Image from "next/image"
import Videos from "components/Videos"

import { getVideos } from "lib/data"
import prisma from "lib/prisma"
import Navbar from "components/Navbar"

export default function Home({ videos }) {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex ml-24 h-screen ">
        {videos.length === 0 && (
          <div className="flex-auto bg-slate-900 pt-20">
            <p className="p-4 text-xl font-semibold">No videos found!</p>
          </div>
        )}
      </main>
      <Videos videos={videos} />
    </div>
  )
}

export async function getServerSideProps() {
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      videos,
    },
  }
}
