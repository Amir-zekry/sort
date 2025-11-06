import Image from 'next/image'
import React from 'react'
import { getProductById } from '../../../data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function Hero({ id }) {
    const item = await getProductById(id)
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 py-12 md:h-screen h-screen mb-0">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold">{item.name}</h1>
                <p className="max-w-xs md:max-w-md text-sm md:text-base text-right">{item.discription}</p>

                {/* --- Price Section --- */}
                <div className="text-2xl font-semibold text-red-500">
                    {item.price ? `${item.price} EGP` : 'السعر غير متوفر'}
                </div>

                {/* --- Buy Now Button --- */}
                <div className='flex md:flex-row md:justify-start justify-center items-center  space-x-4'>
                    <Button className="w-1/2 md:w-auto px-6 py-2 rounded-lg text-white font-semibold tracking-wide carbon-fiber shadow-md shadow-red-500 hover:scale-90 hover:shadow-lg">
                        <Link href="#features">اعرف اكتر</Link>
                    </Button>
                    <Button className="w-1/2 md:w-auto px-6 py-2 rounded-lg text-white font-semibold tracking-wide carbon-fiber shadow-md shadow-red-500 hover:scale-90 hover:shadow-lg">
                        <Link href={`/checkout/${id}`}>اشتري دلوقتي</Link>
                    </Button>
                </div>
            </div>

            <div>
                <Image
                    src={item.heroImage}
                    width={600}
                    height={600}
                    alt={item.name}
                    className="w-80 h-80 md:w-96 md:h-96 object-contain"
                />
            </div>
        </div>
    )
}

export default Hero
