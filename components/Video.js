import Image from "next/image"
import React from "react"
import Link from "next/link"

import timeago from "lib/timeago"

export default function Video({ video }) {
  return (
    <div className="px-5 pb-5">
      {video.thumbnail && (
        <Link href={`/video/${video.id}`}>
          <div>
            <Image
              className="mb-2 cursor-pointer"
              src={video.thumbnail}
              width="800"
              height="450"
              priority
            />
          </div>
        </Link>
      )}
      <p className="text-white float-right relative -mt-11 mr-1 bg-black p-1 ">
        {Math.floor(video.length / 60)
          .toString()
          .padStart(2, "0")}
        :{(video.length % 60).toString().padStart(2, "0")}
      </p>

      <div className="flex ">
        {video.author.image && (
          <Link href={`/channel/${video.author.username}`}>
            <div className="mt-2 ">
              <Image
                className="rounded-full cursor-pointer"
                width={50}
                height={50}
                src={video.author.image}
              />
            </div>
          </Link>
        )}

        <div className="flex flex-col ml-4">
          <Link href={`/video/${video.id}`}>
            <p className="text-lg font-bold cursor-pointer">{video.title}</p>
          </Link>
          <div className="flex flex-col text-gray-400">
            <Link href={`/channel/${video.author.username}`}>
              <span className="cursor-pointer text-sm hover:font-extrabold">
                {video.author.name}
              </span>
            </Link>{" "}
            {video.views} views · {timeago.format(new Date(video.createdAt))}
          </div>
        </div>
      </div>
    </div>
  )
}
