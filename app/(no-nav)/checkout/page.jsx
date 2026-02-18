import { auth } from '@/features/authentications/utils/auth'
import React from 'react'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import { getCartItems } from '@/features/cart/server/data'
import Link from 'next/link'

async function page() {
    const session = await auth()
    const userId = session.user?.id
    const cartItems = await getCartItems(userId)
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
        <CheckoutForm cartItems={cartItems} userId={userId} />
    )
}

export default page