import Image from 'next/image'
import React from 'react'
import { Empty, EmptyDescription, EmptyHeader } from '@/components/ui/empty'

async function Features({ features }) {
    return (
        <div >
            {features.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyDescription>لا توجد ميزات لهذا المنتج حاليا !</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className='flex flex-col gap-y-10'>
                    {features.map((feature, index) => (
                        <div key={feature.id} className="flex flex-col w-full items-center px-4 md:px-8">
                            {/* Title */}
                            <div className="flex flex-col items-center space-y-1 mb-4 md:mb-8">
                                <h1 className="text-3xl md:text-5xl font-bold text-center">{feature.h1}</h1>
                            </div>

                            {/* Description + Image */}
                            <div
                                className={`flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                                    }`}
                            >
                                {/* Description first always on mobile */}
                                <p className="text-muted-foreground text-lg leading-relaxed md:text-right text-center order-1 max-w-md">
                                    {feature.p}
                                </p>

                                {/* Image last on mobile */}
                                <Image
                                    src={feature.image_url}
                                    width={500}
                                    height={500}
                                    alt="feature image"
                                    className="rounded-2xl w-full md:w-auto order-2"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Features
