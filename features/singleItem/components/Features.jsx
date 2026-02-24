import Image from 'next/image'
import React from 'react'
import { getFeatures } from '@/features/singleItem/server/data'
import FeaturesH1 from './FeaturesH1'
import * as motion from "motion/react-client"

async function Features({ itemId }) {
    const features = await getFeatures(itemId)
    if (features.length == 0) return
    return (
        <div>
            <FeaturesH1 />
            <div className='flex flex-col gap-y-20'>
                {features.map((feature, index) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                        }}
                        key={feature.image_url}
                        className="flex flex-col w-full items-center px-4 md:px-8 space-y-16"
                    >
                        <motion.h1
                            // initial={{ x: 100 }}
                            // whileInView={{ x: 0 }}
                            // transition={{
                            //     duration: 1
                            // }}
                            className="text-3xl md:text-5xl font-bold text-center"
                        >
                            {feature.h1}
                        </motion.h1>

                        {/* Description + Image */}
                        <div className="w-full overflow-hidden">
                            <div
                                className={`flex flex-col items-center justify-between w-full md:max-w-5xl mx-auto gap-8 ${index % 2 === 1 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Description first always on mobile */}
                                <motion.p
                                    initial={{ x: index % 2 === 1 ? -100 : 100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{
                                        duration: 1
                                    }}
                                    className="text-muted-foreground text-lg leading-relaxed md:text-right text-center order-1 max-w-md"
                                >
                                    {feature.p}
                                </motion.p>

                                {/* Image last on mobile */}
                                <motion.div
                                    initial={{ x: index % 2 === 1 ? 100 : -100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{
                                        duration: 1
                                    }}
                                >
                                    <Image
                                        src={feature.image_url}
                                        width={500}
                                        height={500}
                                        alt="feature image"
                                        className="rounded-2xl w-full md:w-auto"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Features
