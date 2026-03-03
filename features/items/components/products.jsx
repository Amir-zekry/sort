import React from 'react'
import { getProductsByCategory } from '@/features/items/server/data'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ChevronRight } from "lucide-react"
import { Button } from '@/components/ui/button'

async function Products({ params }) {
    const { slug } = await params
    const products = await getProductsByCategory(slug)
    if (products.length === 0) {
        return (
            <div className='flex-1 flex flex-col items-center justify-center'>
                <p className='text-muted-foreground text-lg'>لا توجد منتجات في هذا القسم</p>
                <Link
                    href='/'
                    className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors mt-4'
                >
                    <Button>
                        الرجوع الي الصفحه الرئيسيه
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <div className='flex-1 flex flex-col p-12'>
            <div className='mb-6'>
                <Link
                    href='/'
                    className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors'
                >
                    <ChevronRight size={16} />
                    الرجوع الي الصفحه الرئيسيه
                </Link>
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {products.map(product => (
                    <Link
                        key={product.id}
                        href={`/item/${product.id}`}
                        className='border-border/50 bg-card hover:border-primary/30 hover:shadow-primary/5 group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
                    >
                        <div className='from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                        <div className='bg-muted/30 relative aspect-square overflow-hidden'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className='object-contain transition-transform duration-500 group-hover:scale-105'
                            />
                        </div>

                        <div className='relative z-10 flex flex-1 flex-col p-5'>
                            <h2 className='text-foreground line-clamp-2 font-semibold'>
                                {product.name}
                            </h2>

                            <p className='text-muted-foreground mt-2 line-clamp-2 text-sm'>
                                {product.discription}
                            </p>

                            {/* <div className='mt-3 flex items-center gap-1.5'>
                                <div className='flex items-center'>
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                ? 'text-amber-400'
                                                : 'text-muted'
                                                }`}
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                        </svg>
                                    ))}
                                </div>
                                <span className='text-muted-foreground text-sm'>
                                    {product.rating}
                                </span>
                            </div> */}

                            <div className='mt-auto pt-4'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-foreground text-xl font-bold'>
                                        ج.م{product.price}
                                    </span>

                                    <span className='text-primary flex items-center text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100'>
                                        عرض المنتج
                                        <ArrowRight size={16} className='mr-1' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default Products