import { useRouter } from "next/router"
import { useState } from "react"

export default function SubscribeButton({ user, subscribed }) {
  const router = useRouter()

  const [subscribedButtonText, setSubscribedButtonText] = useState("Subscribed")
  const [subscribedButtonColor, setSubscribedButtonColor] = useState("gray")

  const handlerUnSubscribe = async () => {
    await fetch(`/api/unsubscribe`, {
      body: JSON.stringify({
        unsubscribeTo: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    router.reload(window.location.pathname)
  }

  const handlerSubscribe = async () => {
    await fetch(`/api/subscribe`, {
      body: JSON.stringify({
        subscribeTo: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    router.reload(window.location.pathname)
  }

  return (
    <>
      {subscribed ? (
        <button
          onClick={handlerUnSubscribe}
          className={`bg-${subscribedButtonColor}-500 px-3 py-2 rounded-md`}
          onMouseOver={() => {
            setSubscribedButtonText("Unsubscribe")
            setSubscribedButtonColor("red")
          }}
          onMouseOut={() => {
            setSubscribedButtonText("Subscribed")
            setSubscribedButtonColor("gray")
          }}
        >
          {subscribedButtonText}
        </button>
      ) : (
        <button
          onClick={handlerSubscribe}
          className={`bg-red-500 px-3 py-2 rounded-md`}
          // onMouseOver={() => {
          //   setSubscribedButtonText("Subscribe")
          //   setSubscribedButtonColor("gray")
          // }}
          // onMouseOut={() => {
          //   setSubscribedButtonText("Subscribed")
          //   setSubscribedButtonColor("red")
          // }}
        >
          Subscribe
        </button>
      )}
    </>
  )
}
