import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ShippingInfoForm from '@/features/checkout/components/ShippingInfoForm'
import React from 'react'

async function page() {
    return (
        <div className='flex h-screen w-full justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle>بيانات الشحن</CardTitle>
                </CardHeader>
                <CardContent>
                    <ShippingInfoForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default page