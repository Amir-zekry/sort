import Image from 'next/image'
import React from 'react'
import { getFeatures } from '@/app/data'
import { Empty, EmptyDescription, EmptyHeader } from '@/components/ui/empty'
async function Features({ id }) {
    const features = await getFeatures(id)
    return (
        <div>
            {features.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyDescription>لا توجد ميزات لهذا المنتج حاليا !</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div>
                    {features.map((feature, index) => (
                        <div key={feature.id} className='flex flex-col w-full items-center px-8'>
                            <div className='flex flex-col items-center space-y-1 mb-16'>
                                <h1 className='text-5xl font-bold'>{feature.h1}</h1>
                            </div>

                            {/* Alternate layout direction */}
                            <div
                                className={`flex items-center justify-between w-full max-w-5xl gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                            >
                                <Image
                                    src={`/${feature.image_url}`}
                                    width={500}
                                    height={500}
                                    alt="feature image"
                                    className="rounded-2xl"
                                />
                                <p className="text-muted-foreground text-lg leading-relaxed max-w-md text-right">
                                    {feature.p}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Features
