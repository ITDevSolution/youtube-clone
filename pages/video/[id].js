import prisma from "lib/prisma"
import { getVideo, getVideos } from "lib/data"
import Link from "next/link"
import timeago from "lib/timeago"
import Video from "components/Video"

import { useEffect } from "react"

import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export default function SingleVideo({ video, videos }) {
  if (!video) return <p className="text-center p-5">Video does not exist !</p>

  useEffect(() => {
    const incrementViews = async () => {
      await fetch("/api/view", {
        body: JSON.stringify({
          video: video.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
    }

    incrementViews()
  }, [])

  return (
    <div className="h-screen flex justify-center m-auto">
      <div className="flex w-full md:w-2/3 flex-col mb-4 ">
        <div className="relative pt-[60%]">
          <ReactPlayer
            className="react-player absolute top-0 left-0"
            url={video.url}
            width="100%"
            height="100%"
            controls={true}
            light={video.thumbnail}
          />
        </div>

        <div className="px-5 mt-5">
          <div className="">
            <p className="text-2xl font-bold">{video.title}</p>
            <div className="text-gray-400">
              {video.views + 1} views ·{" "}
              {timeago.format(new Date(video.createdAt))}
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-gray-500 mt-5 pt-5">
          <Link href={`/channel/${video.author.username}`}>
            <a className="flex">
              {video.author.image && (
                <img
                  src={video.author.image}
                  alt=""
                  className="w-16 h-16 mt-2 mr-2 rounded-full"
                />
              )}
              <span className="mt-6 ml-2 text-xl">{video.author.name}</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/6 ml-10">
        <div className="flex flex-wrap">
          {videos.map((video, index) => (
            <div className="w-full" key={video.id}>
              <Video video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma)
  video = JSON.parse(JSON.stringify(video))

  let videos = await getVideos({ take: 3 }, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      video,
      videos,
    },
  }
}
