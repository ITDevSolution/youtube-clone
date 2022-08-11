import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const media = new Audio(reader.result)
      media.onloadedmetadata = () => resolve(media.duration)
    }
    reader.readAsDataURL(file)
    reader.onerror = (error) => reject(error)
  })
}

export default function Upload() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [duration, setDuration] = useState(null)

  if (!session || !session.user) return null
  if (loading) return null

  const handlerPostNewVideo = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("image", image)
    body.append("title", title)
    body.append("video", video)
    body.append("duration", duration)

    await fetch("/api/upload", {
      body,
      method: "POST",
    })

    router.push(`/channel/${session.user.username}`)
  }

  return (
    <>
      <form onSubmit={handlerPostNewVideo}>
        <div className="flex-1">
          <p className="text-xl">Title</p>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="text-sm text-gray-600">
          <label className="relative font-medium cursor-pointer my-3 block">
            <p className="">Video thumbnail {image && "✅"}</p> (800 x 450
            suggested)
            <input
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              required
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  if (e.target.files[0].size > 3072000) {
                    alert("Maximun size allowed is 3MB")
                    return false
                  }
                  setImage(e.target.files[0])
                }
              }}
            />
          </label>
        </div>

        <div className="text-sm text-gray-600">
          <label className="relative font-medium cursor-pointer my-3 block">
            <p>Video file {video && "✅"}</p>
            <input
              type="file"
              name="image"
              accept="video/*"
              className="hidden"
              required
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  if (e.target.files[0].size > 20971520) {
                    alert("Maximum size allowed is 20MB")
                    return false
                  }

                  const duration = await getVideoDuration(e.target.files[0])
                  setDuration(parseInt(duration))
                  setVideo(e.target.files[0])
                }
              }}
            />
          </label>
        </div>
        <button
          disabled={title && video && image ? false : true}
          className={`border px-8 py-2 mt-0 font-bold rounded-full ${
            title && video && image
              ? ""
              : "cursor-not-allowed text-gray-800 border-gray-800"
          }`}
        ></button>
      </form>
    </>
  )
}
