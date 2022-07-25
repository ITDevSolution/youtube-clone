import { amount } from "lib/config"

export default function LoadMore({ videos, setVideos, setReachedEnd, author }) {
  const handlerLoadMore = async () => {
    const url = `/api/videos?skip=${videos.length}`
    if (author) {
      url += `&author=${author.id}`
    }
    const res = await fetch(url)
    const data = await res.json()
    if (data.length < amount) {
      setReachedEnd(true)
    }
    setVideos([...videos, ...data])
    // console.log(data.length)
  }
  return (
    <div className="flex justify-center">
      <button
        onClick={handlerLoadMore}
        className="border  px-8 py-2 my-10 mr-2 font-bold rounded-full"
      >
        Load mode...
      </button>
    </div>
  )
}
