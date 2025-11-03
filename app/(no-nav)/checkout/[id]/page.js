import React from 'react'
import CheckoutForm from './CheckoutForm'
import ProductData from './ProductData'
import { Separator } from '@/components/ui/separator'
import { getProductById } from '@/app/data'

async function page({ params }) {
    const { id } = await params
    const price = await getProductById(id).then(item => item.price)
    return (
        <div className="flex md:flex-row flex-col-reverse h-screen justify-center md:items-start items-center gap-y-5 px-5 md:space-x-10 py-10 bg-black">
            <CheckoutForm price={price} id={id} />
            <Separator orientation="vertical" className="hidden md:block" />
            <Separator orientation="horizontal" className="block md:hidden" />
            <ProductData id={id} />
        </div>
    )
}

export default page