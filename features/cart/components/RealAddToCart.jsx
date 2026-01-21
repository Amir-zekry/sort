"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

export default function RealAddToCart({ session, itemId }) {
  const initialState = {}
  const [state, action, pending] = useActionState(addToCart, initialState)
  useEffect(() => {
    if (pending) {
      let value = 20
      const toastId = toast.custom(
        () => (
          <Progress value={value} className="w-62" />
        ),
        { duration: Infinity }
      )
      const interval = setInterval(() => {
        value = Math.min(value + 15, 90)

        toast.custom(
          () => (
            <Progress value={value} className="w-62" />
          ),
          { id: toastId }
        )
      }, 500)

      return () => {
        clearInterval(interval)
        toast.dismiss(toastId)
      }
    }
  }, [pending])

  // useEffect(() => {
  //   let toastId
  //   if (pending) {
  //     toastId = toast.loading('يتم اضافة العنصر الي العربيه')
  //   } else toast.dismiss(toastId)
  // }, [pending])

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message)
    } else if (state.success === false) {
      toast.error(state.message)
    }
  }, [state])


  return (
    <form action={action}>
      <input type="hidden" value={itemId} name="itemId" />
      <input type="hidden" value={session.user?.id} name="userId" />
      <Button
        disabled={pending}
        type='submit'
        className="cursor-pointer px-6 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95"
      >
        اضافه الي العربه
      </Button>
    </form>
  )
}
