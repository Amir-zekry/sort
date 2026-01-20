import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getProductById } from '@/app/server/data'
import { redirect } from 'next/navigation'

async function page({ params }) {
    const { id } = await params
    const item = await getProductById(id)
    return (
        <CheckoutForm
            mode='single'
            items={[
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                }
            ]}
        />
    )
}

export default page