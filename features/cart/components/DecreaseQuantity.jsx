'use client'
import { Button } from "@/components/ui/button"
import { decreaseCartItemQuantity } from "@/features/cart/server/actions"

function DecreaseQuantity({ cartItemId }) {
    return (
        <Button onClick={async () => decreaseCartItemQuantity(cartItemId)}>-</Button>
    )
}

export default DecreaseQuantity