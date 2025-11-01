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
                <p className="max-w-xs md:max-w-md text-sm md:text-base">{item.discription}</p>
                <Button className="w-full md:w-auto px-6 py-2 rounded-lg text-white font-semibold tracking-wide hover:cursor-pointer carbon-fiber shadow-md shadow-red-500 hover:scale-90 hover:shadow-lg">
                    <Link href='#features'>اعرف اكتر</Link>
                </Button>
            </div>

            <div>
                <Image
                    src={`/${item.Image}`}
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
