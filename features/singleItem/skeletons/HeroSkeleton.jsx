import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function HeroSkeleton() {
    return (
        <div className="relative w-full h-screen flex md:items-center items-start px-8 md:px-24 py-24">
            {/* --- Background Skeleton --- */}
            <Skeleton className="hidden md:block absolute inset-0" />
            <Skeleton className="md:hidden absolute inset-0" />

            {/* --- Content Skeleton --- */}
            <div className="relative z-10 max-w-xl w-full space-y-4">
                <Skeleton className="h-12 md:h-16 w-3/4 md:w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />

                <div className="flex gap-4 pt-4">
                    <Skeleton className="h-10 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default HeroSkeleton