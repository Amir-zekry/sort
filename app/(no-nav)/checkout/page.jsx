import { auth } from '@/features/authentications/utils/auth'
import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getCartItems } from '@/features/cart/server/data'
import Link from 'next/link'
import ProductData from '@/features/checkout/components/ProductData'
import { Separator } from '@/components/ui/separator'
import { getShippingInfo } from '@/features/checkout/server/data'
import CheckoutFormForNoShippingInfo from '@/features/checkout/components/checkoutFormForNoShippingInfo'

async function page() {
    const session = await auth()
    const userId = session.user?.id
    const cartItems = await getCartItems(userId)
    const shippingInfo = await getShippingInfo(userId)

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
        <div className="flex md:flex-row flex-col-reverse min-h-screen justify-center md:items-start items-center gap-y-5 px-5 md:gap-x-10 py-10">
            <div className='flex flex-col gap-y-8 md:min-w-[40vw] md:max-w-[40vw] w-full md:items-end'>
                {shippingInfo.length > 0 ? (
                    <CheckoutForm userId={userId} shippingInfo={shippingInfo} />
                ) : (
                    <CheckoutFormForNoShippingInfo userId={userId} />
                )}
            </div>
            <Separator
                orientation="vertical"
                className="hidden md:block min-h-150"
            />
            <Separator orientation="horizontal" className="block md:hidden" />
            <ProductData cartItems={cartItems} userId={userId} />
        </div>
    )
}

export default page