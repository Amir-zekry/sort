'use client'
import { Button } from "@/components/ui/button"
import { increaseCartItemQuantity } from "@/features/cart/server/actions"
import { useTransition } from "react"
import { Loader, Plus } from "lucide-react"
function IncreaseQuantity({ cartItemId, userId }) {
    const [pending, startTransition] = useTransition()
    return (
        <Button
            className={`${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
            disabled={pending}
            onClick={() => startTransition(() => {
                increaseCartItemQuantity(cartItemId, userId)
            })
            }
        >
            {pending ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
        </Button>
    )
}

export default IncreaseQuantity