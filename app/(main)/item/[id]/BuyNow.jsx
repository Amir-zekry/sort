import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function BuyNow({ id, name, price }) {
    return (
        <section className="relative w-full bg-linear-to-b from-black via-zinc-900 to-black py-16 px-6 text-center flex flex-col items-center justify-center space-y-6 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25),transparent_70%)] blur-3xl" />

            {/* Limited Offer Tag */}
            <div className="relative z-10 mb-4 inline-block px-4 py-2 bg-red-600 text-white font-semibold text-sm uppercase rounded-full tracking-widest shadow-md shadow-red-500/40 animate-pulse">
                عرض لفترة محدودة 🔥
            </div>

            {/* Product Info */}
            <div className="relative z-10 space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    جاهز تشتري {name}؟
                </h2>
                <p className="text-gray-300 text-lg font-medium">
                    السعر: <span className="text-red-500 font-bold">{price} EGP</span>
                </p>
                <p className="text-yellow-400 text-sm md:text-base font-medium">
                    الكمية محدودة — اطلب الآن قبل ما تخلص!
                </p>

                <Button className="mt-4 text-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/30 hover:scale-95 transition">
                    <Link href={`/checkout/${id}`} className="block px-6 py-2">
                        اشتري الآن 🚀
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default BuyNow
