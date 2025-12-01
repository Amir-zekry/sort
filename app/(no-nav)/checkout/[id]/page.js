import React from 'react'
import CheckoutForm from './CheckoutForm'
import { getProductById } from '@/app/data'

async function page({ params }) {
    const { id } = await params
    const item = await getProductById(id)
    const price = item.price
    const image = item.image
    const name = item.name
    const note = item.note
    return (
        <CheckoutForm price={price} id={id} image={image} name={name} note={note} />
    )
}

export default page