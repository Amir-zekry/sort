'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
function ProductCard({ product }) {
    const router = useRouter()
    return (
        <Card onClick={() => router.push(`/item/${product.id}`)} className='hover:border-purple-500 cursor-pointer'>
            <CardContent className='flex justify-center items-center'>
                <div className="relative w-72 h-72">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain hover:scale-105 transition-transform"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button variant='ghost' className='flex rounded-3xl items-center py-2'>
                    <p>{product.name}</p>
                    <p className='bg-purple-500 p-1 rounded-3xl'>{product.price} EGP</p>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard