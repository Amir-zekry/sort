"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
export default function RealBuyNow({ itemId }) {
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
      <Button
        disabled={pending}
        type='submit'
        className={`w-full ${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
      >
        {pending ? <Loader size={16} className="animate-spin" /> : 'اشتري دلوقتي'}
      </Button>
    </form>
  )
}
