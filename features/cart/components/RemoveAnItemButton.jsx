'use client'
import { removeFromCart } from '@/features/cart/server/actions'

function RemoveAnItemButton({ itemId, userID }) {
    return (
        <button onClick={async () => removeFromCart(itemId, userID)} className="absolute top-0 right-0 -translate-y-3 z-50 p-0">x</button>
    )
}

export default RemoveAnItemButton