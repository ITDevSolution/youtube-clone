import React from "react"
import Video from "./Video"

export default function Videos({ videos }) {
  console.log(videos)
  return (
    <div className="flex flex-wrap pt-20 pl-10 bg-slate-900 ">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, index) => (
          <div className="w-full flex  " key={index}>
            <Video video={video} />
          </div>
        ))}
      </div>
    </div>
  )
}
