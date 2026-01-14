import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddToCart from './AddToCart'

function Hero({ id, name, description, heroImage, heroImagePhone }) {
    return (
        <div
            className="
                relative 
                w-full 
                h-screen 
                flex 
                md:items-center
                items-start
                px-8 md:px-24 
                py-24
            "
        >

            {/* --- Background for Desktop --- */}
            {heroImage && (
                <div
                    className="hidden md:block absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
            )}

            {/* --- Background for Mobile --- */}
            {heroImagePhone && (
                <div
                    className="md:hidden absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImagePhone})` }}
                />
            )}

            {/* --- Dark overlay for contrast --- */}

            {/* --- Content --- */}
            <div className="relative z-10 max-w-xl text-white mix-blend-difference space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold md:text-right text-center">
                    {name}
                </h1>

                <p className="text-sm md:text-lg opacity-90 md:text-right text-center">
                    {description}
                </p>

                <div className="flex gap-4 pt-4 md:justify-normal justify-center">
                    <Link href="#features">
                        <Button className="px-6 py-2 cursor-pointer rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
                            اعرف اكتر
                        </Button>
                    </Link>
                    <Link href={`/checkout/${id}`} className="block w-fit">
                        <Button className="cursor-pointer px-6 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-red-500 hover:scale-95">
                            اشتري دلوقتي
                        </Button>
                    </Link>
                    <AddToCart id={id} />
                </div>
            </div>

        </div>
    )
}

export default Hero
