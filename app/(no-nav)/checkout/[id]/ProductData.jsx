import { getProductById } from '@/app/data'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

async function ProductData({ id }) {
    const item = await getProductById(id)
    return (
        <div className='items-start md:max-w-[40vw] md:min-w-[40vw]'>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <div className='flex items-center space-x-2'>
                    <Card className=' border-white'>
                        <CardContent className=''>
                            <Image className='' src={item.image} alt={item.name} width={75} height={75} />
                        </CardContent>
                    </Card>
                    <div>
                        <p>{item.name}</p>
                        <p className='text-red-500'>{item.note}</p>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    <p>{item.price}</p>
                    <p>L.E</p>
                </div>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2>التوصيل</h2>
                <p>مجاني</p>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw] mt-10'>
                <h2 className='font-bold'>المجموع</h2>
                <div className='flex items-center gap-x-2'>
                    <p>{item.price}</p>
                    <p>L.E</p>
                </div>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw] mt-10'>
                <h2>الرقم التعريفي للمنتج</h2>
                <p>{id}</p>
            </div>
        </div>
    )
}

export default ProductData