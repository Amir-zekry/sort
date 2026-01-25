'use client'
import { Button } from "@/components/ui/button"
import { decreaseCartItemQuantity } from "@/features/cart/server/actions"
import { useTransition } from "react"
import { Loader, Minus } from "lucide-react"
function DecreaseQuantity({ cartItemId, userId, quantity }) {
    const [pending, startTransition] = useTransition()
    return (
        <Button disabled={pending || quantity == 1} onClick={() => startTransition(() => {
            decreaseCartItemQuantity(cartItemId, userId)
        })
        }
        >
            {pending ? <Loader size={16} className="animate-spin" /> : <Minus size={16} />}
        </Button>)
}

export default DecreaseQuantity