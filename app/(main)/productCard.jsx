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
                <Image
                    className='hover:scale-110 transition-all duration-300'
                    src={product.image}
                    width={300}
                    height={300}
                    alt={product.name}
                />
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