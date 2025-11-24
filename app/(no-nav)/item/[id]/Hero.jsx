import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
            <div className="absolute inset-0 bg-black/50" />

            {/* --- Content --- */}
            <div className="relative z-10 max-w-xl text-white space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold md:text-right text-center">
                    {name}
                </h1>

                <p className="text-sm md:text-lg opacity-90 md:text-right text-center">
                    {description}
                </p>

                <div className="flex gap-4 pt-4 md:justify-normal justify-center">
                    <Button className="px-6 py-2 rounded-lg text-white font-semibold tracking-wide carbon-fiber shadow-md shadow-red-500 hover:scale-95">
                        <Link href="#features">اعرف اكتر</Link>
                    </Button>

                    <Button className="px-6 py-2 rounded-lg text-white font-semibold tracking-wide carbon-fiber shadow-md shadow-red-500 hover:scale-95">
                        <Link href={`/checkout/${id}`}>اشتري دلوقتي</Link>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Hero
