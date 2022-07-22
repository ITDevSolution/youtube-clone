import {
  CloudIcon,
  CogIcon,
  GlobeIcon,
  HomeIcon,
  MenuIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline"
import React from "react"

export default function Navbar() {
  return (
    <div className="fixed  z-50">
      <div className="w-20  flex flex-col items-center ">
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <MenuIcon className="h-7" />
        </div>

        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <HomeIcon className="h-6" />
          <h4 className="text-xs">Home</h4>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <GlobeIcon className="h-6" />
          <h4 className="text-xs">Explore</h4>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <VideoCameraIcon className="h-6" />
          <h4 className="text-xs">Shorts</h4>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <PlayIcon className="h-6" />
          <h4 className="text-xs">Suscriptons</h4>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <CogIcon className="h-6" />
          <h4 className="text-xs">Library</h4>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-600 w-full h-20 mt-2">
          <CloudIcon className="h-6" />
          <h4 className="text-xs">Downloads</h4>
        </div>
      </div>
    </div>
  )
}
