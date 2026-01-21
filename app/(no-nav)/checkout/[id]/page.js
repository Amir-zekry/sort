import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import getItemById from '@/features/checkout/server/data'

async function page({ params }) {
    const { id } = await params
    const item = await getItemById(id)
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