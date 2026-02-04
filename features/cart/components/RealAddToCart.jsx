"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { Loader } from "lucide-react"

export default function RealAddToCart({ session, itemId }) {
  const initialState = {}
  const [state, action, pending] = useActionState(addToCart, initialState)

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
        {pending ? <Loader size={16} className="animate-spin" /> : 'اضافه الي العربه'}
      </Button>
    </form>
  )
}
