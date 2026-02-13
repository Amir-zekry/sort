"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
export default function RealBuyNow({ session, itemId }) {
  const initialState = {}
  const [state, action, pending] = useActionState(addToCart, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success === true) {
      router.push('/checkout')
    } else if (state.success === false) {
      router.push('/checkout')
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
        {pending ? <Loader size={16} className="animate-spin" /> : 'اشتري دلوقتي'}
      </Button>
    </form>
  )
}
