import React from 'react'
import { getProducts } from '@/features/items/server/data'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function Products({ category, sort, search }) {
    const products = await getProducts(category, sort, search)
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
            {products.map((product) => (
                <Link key={product.id} href={`/item/${product.id}`}>
                    <Card className='hover:border-purple-500 cursor-pointer'>
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
                </Link>
            ))}
        </div>
    )
}

export default Products