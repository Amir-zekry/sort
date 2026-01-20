'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function ProductsSkeleton() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
            {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-[397.6px] w-full rounded-lg' />
            ))}
        </div>
    )
}

export default ProductsSkeleton
