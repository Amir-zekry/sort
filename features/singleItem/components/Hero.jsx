import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddToCart from '@/features/cart/components/AddToCart'
import { getHeroSetionData } from '@/features/singleItem/server/data'
import BuyNow from './BuyNow'


async function Hero({ itemId }) {
    const heroData = await getHeroSetionData(itemId)
    return (
        <div
            className="relative w-full h-screen flex md:items-center items-start px-8 md:px-24 py-24">

            {/* --- Background for Desktop --- */}
            {heroData.heroImage && (
                <div
                    className="hidden md:block absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroData.heroImage})` }}
                />
            )}

            {/* --- Background for Mobile --- */}
            {heroData.heroImagePhone && (
                <div
                    className="md:hidden absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroData.heroImagePhone})` }}
                />
            )}

            {/* --- Dark overlay for contrast --- */}

            {/* --- Content --- */}
            <div className="relative z-10 max-w-xl text-white mix-blend-difference space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold md:text-right text-center">
                    {heroData.name}
                </h1>

                <p className="text-sm md:text-lg opacity-90 md:text-right text-center">
                    {heroData.discription}
                </p>

                <div className="flex md:flex-row flex-col gap-4 pt-4 md:justify-normal justify-center">
                    <div className='flex items-center gap-4'>
                        <Link href="#features">
                            <Button className="px-6 py-2 cursor-pointer rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
                                اعرف اكتر
                            </Button>
                        </Link>
                        <BuyNow id={itemId} />
                    </div>
                    <AddToCart id={heroData.id} />
                </div>
            </div>

        </div>
    )
}

export default Hero
