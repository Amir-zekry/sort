import { auth } from '@/features/authentications/utils/auth'
import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getCartItems } from '@/features/cart/server/data'

async function page() {
    const session = await auth()
    const userId = session.user?.id
    const cartItems = await getCartItems(userId)
    return (
        <CheckoutForm cartItems={cartItems} userId={userId} />
    )
}

export default page