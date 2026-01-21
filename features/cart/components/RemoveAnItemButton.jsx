'use client'
import { removeFromCart } from '@/features/cart/server/actions'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

function RemoveAnItemButton({ itemId, userID }) {
    const initialState = {}
    const [state, action, pending] = useActionState(removeFromCart, initialState)
    // useEffect(() => {
    //     if (state.success === true) {
    //         toast.success(state.message)
    //     } else if (state.success === false) {
    //         toast.error(state.message)
    //     }
    // }, [state])
    return (
        <form action={action}>
            <input type='hidden' name='userId' value={userID} />
            <input type='hidden' name='itemId' value={itemId} />
            <button disabled={pending} type='submit' className="absolute top-0 right-0 -translate-y-3 z-50 p-0">x</button>
        </form>
    )
}

export default RemoveAnItemButton