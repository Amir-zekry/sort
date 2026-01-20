import { auth } from '@/features/authentications/utils/auth'
import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getCartItems } from '@/features/cart/server/data'
import { redirect } from 'next/navigation'

async function page() {
    const session = await auth()
    const userId = session.user?.id
    const cartItems = await getCartItems(userId)
    const items = cartItems.map(ci => ({
        cartItemId: ci.id,
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        image: ci.item.image,
        quantity: ci.quantity,
    }))
    if (session) {
        return (
            <CheckoutForm mode='cart' items={items} userId={userId} />
        )
    } else redirect('/')
}

export default page