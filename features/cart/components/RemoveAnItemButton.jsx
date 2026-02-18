'use client'
import { removeFromCart } from '@/features/cart/server/actions'
import { Loader, X } from 'lucide-react'
import { useActionState } from 'react'
function RemoveAnItemButton({ itemId, userId }) {
    const initialState = {}
    const [state, action, pending] = useActionState(removeFromCart, initialState)
    return (
        <form action={action}>
            <input type='hidden' name='userId' value={userId} />
            <input type='hidden' name='itemId' value={itemId} />
            <button
                disabled={pending}
                type='submit'
                className={`absolute top-0 right-0 -translate-y-3 z-50 p-0 ${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}>
                {pending ? <Loader size={16} className='animate-spin' /> : <X size={16} />}
            </button>
        </form>
    )
}

export default RemoveAnItemButton