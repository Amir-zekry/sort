"use client"

import { buyNow } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useTransition } from "react"
export default function RealBuyNow({ itemId }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await buyNow(itemId)
        })
      }}
      disabled={pending}
      type='submit'
      className={`${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
    >
      {pending ? <Loader size={16} className="animate-spin" /> : 'اشتري دلوقتي'}
    </Button>
  )
}
