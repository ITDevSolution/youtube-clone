import React from "react"

export default function Utils() {
  const handlerData = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "generate_content",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  }

  const cleanDatabase = async () => {
    await fetch("/api/utils", {
      body: JSON.stringify({
        task: "clean_database",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  }
  return (
    <div className="m-15 flex flex-col items-center">
      <h2 className="m-8 text-3xl font-semibold ">Utils</h2>

      <div className="flex-1 m-2">
        <button
          onClick={handlerData}
          className="border px-8 py-2 mt-5 mr-8 font-bold"
        >
          Generate Content
        </button>
      </div>
      <div className="flex-1 m-2">
        <button
          onClick={cleanDatabase}
          className="border px-8 py-2 mt-5 mr-8 font-bold"
        >
          Clean Database
        </button>
      </div>
    </div>
  )
}
