import { getProductById } from '@/app/data'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

async function ProductData({ id }) {
    const item = await getProductById(id)
    return (
        <div className='items-start max-w-[40vw] min-w-[40vw]'>
            <div className='flex items-center justify-between w-[30vw]'>
                <div className='flex items-center space-x-2'>
                    <Card className='p-0 border-white'>
                        <CardContent className='p-0'>
                            <Image src={`/${item.Image}`} alt={item.name} width={75} height={75} />
                        </CardContent>
                    </Card>
                    <p>{item.name}</p>
                </div>
                <p > L.E. {item.price}</p>
            </div>
            <div className='flex items-center justify-between w-[30vw]'>
                <h2>التوصيل</h2>
                <p>L.E. 0</p>
            </div>
            <div className='flex items-center justify-between w-[30vw] mt-10'>
                <h2 className='font-bold'>المجموع</h2>
                <p className='font-bold'>L.E. {item.price}</p>
            </div>
        </div>
    )
}

export default ProductData