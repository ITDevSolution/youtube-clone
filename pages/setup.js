import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function setup() {
  const router = useRouter()

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  if (!session || !session.user) return null
  if (loading) return null

  if (!loading && session.user.name) {
    router.push("/")
  }

  const handlerOnSubmit = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("image", image)
    body.append("name", name)
    body.append("username", username)

    await fetch("/api/setup", {
      body,
      method: "POST",
    })

    session.user.name = name
    session.user.username = username
    router.push("/")
  }

  const handlerInputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 307200) {
        alert("Maximun size allowed is 3MB")
        return false
      }
      setImage(event.target.files[0])
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <form
      onSubmit={handlerOnSubmit}
      className="flex flex-col items-center justify-center m-10"
    >
      {/* Name input */}
      <div className="flex-1">
        <div className="flex-1">Name</div>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="border p-1"
          required
        />
      </div>
      {/* Username Input */}
      <div className="flex-1">
        <div className="flex-1">username</div>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-1"
          required
        />
      </div>

      {/* Image input */}
      <div className="text-sm text-gray-600">
        <label className="relative font-medium cursor-pointer underline my-3 block">
          {!imageUrl && <p>Avatar</p>}
          <img src={imageUrl} className="w-20 h-20" />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            required
            onChange={handlerInputImage}
          />
        </label>
      </div>
      <button className=" flex border px-12 py-2 mt-0 mr-8 font-bold rounded-full">
        Save
      </button>
    </form>
  )
}
