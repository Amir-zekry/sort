import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getImages } from "@/app/data"
import Image from "next/image"
import { Empty, EmptyDescription, EmptyHeader } from "@/components/ui/empty"

export default async function ItemGallery({ id }) {
    const images = await getImages(id)
    return (
        <div>
            {images.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyDescription>لا توجد صور لهذا المنتج حاليا !</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <Carousel className="w-3/4 mx-auto" dir='ltr'>
                    <CarouselContent>
                        {images.map((image) => (
                            <CarouselItem key={image.id} className='md:basis-1/3 basis-1/1'>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <Image src={image.image_url} alt="Item Image" width={300} height={300} className="object-contain" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            )}
        </div>
    )
}
