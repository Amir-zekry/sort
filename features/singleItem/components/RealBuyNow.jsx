"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
export default function RealBuyNow({ userId, itemId }) {
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
      <input type="hidden" value={userId} name="userId" />
      <Button
        disabled={pending}
        type='submit'
        className={`cursor-pointer rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95 w-full min-w-35 ${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
      >
        {pending ? <Loader size={16} className="animate-spin" /> : 'اشتري دلوقتي'}
      </Button>
    </form>
  )
}
