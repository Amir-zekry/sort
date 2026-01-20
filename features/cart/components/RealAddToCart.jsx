"use client"

import { addToCart } from "@/features/cart/server/actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function RealAddToCart({ session, itemId }) {
  const userId = session.user?.id

  async function handleAddToCart() {
    if (!userId) {
      toast.error("يجب تسجيل الدخول لإضافة المنتجات إلى السلة")
      return
    }

    const result = await addToCart(userId, itemId)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="cursor-pointer px-6 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95"
    >
      اضافه الي العربه
    </Button>
  )
}
