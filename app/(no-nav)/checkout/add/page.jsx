import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/features/authentications/utils/auth'
import ShippingInfoForm from '@/features/checkout/components/ShippingInfoForm'
import React from 'react'

async function page() {
    const session = await auth()
    const userId = session?.user?.id
    return (
        <div className='flex h-screen w-full justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle>بيانات الشحن</CardTitle>
                </CardHeader>
                <CardContent>
                    <ShippingInfoForm userId={userId} />
                </CardContent>
            </Card>
        </div>
    )
}

export default page