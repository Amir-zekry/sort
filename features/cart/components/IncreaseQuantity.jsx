'use client'
import { Button } from "@/components/ui/button"
import { increaseCartItemQuantity } from "@/features/cart/server/actions"
function IncreaseQuantity({ cartItemId }) {
    return (
        <Button onClick={async () => increaseCartItemQuantity(cartItemId)} >+</Button>
    )
}

export default IncreaseQuantity