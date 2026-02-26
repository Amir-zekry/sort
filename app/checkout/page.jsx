import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getCartItems } from '@/features/cart/server/data'
import Link from 'next/link'
import ProductData from '@/features/checkout/components/ProductData'
import { Separator } from '@/components/ui/separator'
import { getShippingInfo } from '@/features/checkout/server/data'
import CheckoutFormForNoShippingInfo from '@/features/checkout/components/checkoutFormForNoShippingInfo'
import { auth } from '@/features/authentications/utils/auth'
import { redirect } from 'next/navigation'

async function page() {
    const session = await auth()
    const cartItems = await getCartItems()
    const shippingInfo = await getShippingInfo()

    if (!session) redirect('/')

    if (cartItems.length === 0) {
        return (
            <div className='h-screen flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-bold mb-4'>سلة التسوق فارغة</h2>
                <p className='text-gray-600'>يرجى إضافة منتجات إلى سلة التسوق قبل المتابعة إلى الدفع.</p>
                <Link href="/" className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
                    تصفح المنتجات
                </Link>
            </div>
        )
    }

    return (
        <div className='flex flex-col md:flex-row-reverse min-h-screen h-auto md:justify-center md:items-start gap-y-4 md:p-0 p-5 relative'>
            <ProductData cartItems={cartItems} />
            {shippingInfo.length > 0 ? (
                <CheckoutForm shippingInfo={shippingInfo} />
            ) : (
                <CheckoutFormForNoShippingInfo />
            )}

        </div>
    )
}

export default page