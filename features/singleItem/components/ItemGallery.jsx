import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import ItemGalleryH1 from "./ItemGalleryH1"
import { getImages } from "@/features/singleItem/server/data"

export default async function ItemGallery({ itemId }) {
    const images = await getImages(itemId)
    if (images.length == 0) return
    return (
        <div>
            <ItemGalleryH1 />
            <Carousel className="w-3/4 mx-auto" dir='ltr'>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.image_url} className='md:basis-1/3 basis-1/1'>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center relative">
                                            <Image src={image.image_url} alt="Item Image" fill className="object-contain" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    )
}
