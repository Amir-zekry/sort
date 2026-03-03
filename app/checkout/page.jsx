import React, { Suspense } from 'react'
import ProductData from '@/features/checkout/components/ProductData'
import FormChecker from '@/features/checkout/components/FormChecker'
import ProductsDataSkeleton from '@/features/checkout/skeletons/productsDataSkeleton'
import { CheckoutFormSkeleton } from '@/features/checkout/skeletons/checkoutFormSkeleton'

async function page() {
    return (
        <div className='flex flex-col md:flex-row-reverse min-h-screen h-auto md:justify-center md:items-start gap-y-4 md:p-0 p-5 relative'>
            <Suspense fallback={<ProductsDataSkeleton />}>
                <ProductData />
            </Suspense>
            <Suspense fallback={<CheckoutFormSkeleton />}>
                <FormChecker />
            </Suspense>
        </div>
    )
}

export default page