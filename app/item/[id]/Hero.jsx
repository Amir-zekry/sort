import Image from 'next/image'
import React from 'react'
import { getProductById } from '../../data'
import { Button } from '@/components/ui/button'

async function Hero({ id }) {
    const item = await getProductById(id)
    return (
        <div className='flex md:flex-row flex-col md:pt-0 pt-12 justify-center items-center space-x-8 px-8 md:h-screen h-[50vh]'>
            <div className='space-y-4 items-center'>
                <h1 className='text-3xl font-bold'>
                    {item.name}
                </h1>
                <p className='max-w-60'>{item.discription}</p>
                <Button
                    className="relative overflow-hidden border-0 rounded-lg text-white font-semibold tracking-wide hover:cursor-pointer carbon-fiber shadow-md shadow-red-500"
                >
                    اعرف اكتر
                </Button>
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