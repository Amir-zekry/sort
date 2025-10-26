import Image from 'next/image'
import React from 'react'
import { getProductById } from '../../data'
import { Button } from '@/components/ui/button'

async function Hero({ id }) {
    const item = await getProductById(id)
    return (
        <div className='flex justify-center items-center space-x-8 h-screen'>
            <div className='space-y-4'>
                <h1 className='text-3xl font-bold'>
                    {item.name}
                </h1>
                <p className='max-w-60'>{item.discription}</p>
                <Button >اعرف اكتر</Button>

            </div>
            <div>
                <Image
                    src={`/${item.Image}`}
                    width={500}
                    height={500}
                    alt={item.name}
                />
            </div>
        </div >
    )
}

export default Hero