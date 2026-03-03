import { Skeleton } from '@/components/ui/skeleton'

export function FeaturedProductsSkeleton() {
    return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className='border-border/50 bg-card group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm'
                >
                    <div className='bg-muted/30 relative aspect-square overflow-hidden'>
                        <Skeleton className='h-full w-full' />
                    </div>

                    <div className='relative z-10 flex flex-1 flex-col p-5'>
                        <Skeleton className='h-5 w-3/4 rounded' />

                        <Skeleton className='mt-2 h-4 w-full rounded' />
                        <Skeleton className='mt-1 h-4 w-2/3 rounded' />

                        <div className='mt-3 flex items-center gap-1.5'>
                            <div className='flex items-center gap-1'>
                                {[...Array(5)].map((_, j) => (
                                    <Skeleton key={j} className='h-4 w-4 rounded' />
                                ))}
                            </div>
                            <Skeleton className='h-4 w-6 rounded' />
                        </div>

                        <div className='mt-auto pt-4'>
                            <div className='flex items-center justify-between'>
                                <Skeleton className='h-6 w-24 rounded' />
                                <Skeleton className='h-4 w-20 rounded' />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
