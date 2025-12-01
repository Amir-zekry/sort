import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function ProductData({ id, price, image, name, note, total, quantity }) {
    return (
        <div className='items-start md:max-w-[40vw] md:min-w-[40vw] space-y-5'>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <div className='flex items-center gap-x-2'>
                    <Image className='' src={image} alt={name} width={50} height={50} />
                    <div>
                        <p>{name}</p>
                        <p className='text-red-500'>{note}</p>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    <p>{price}</p>
                    <p>L.E</p>
                </div>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2>الكميه</h2>
                <p>{quantity}</p>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2>التوصيل</h2>
                <p>مجاني</p>
            </div>
            <div className='flex items-center justify-between md:w-[30vw] w-[80vw]'>
                <h2 className='font-bold'>المجموع</h2>
                <div className='flex items-center gap-x-2 font-bold'>
                    <p>{total}</p>
                    <p>L.E</p>
                </div>
            </div>
        </div>
    )
}

export default ProductData