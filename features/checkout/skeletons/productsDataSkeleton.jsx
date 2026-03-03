import { Skeleton } from '@/components/ui/skeleton'
export default function ProductDataSkeleton() {
    return (
        <div className='md:w-1/3 md:sticky md:top-0 md:p-10'>
            <div className='p-1 mb-2 block md:hidden'>
                <div className='flex w-full space-x-2 text-center items-center justify-between'>
                    <Skeleton className='h-6 w-24' />
                    <Skeleton className='h-6 w-6' />
                </div>
            </div>
            <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className='flex items-start justify-between pb-4'>
                        <Skeleton className='w-14 h-14 rounded-lg' />
                        <Skeleton className='h-4 w-32' />
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-16' />
                            <div className='flex items-center gap-2'>
                                <Skeleton className='h-4 w-8' />
                                <Skeleton className='h-4 w-8' />
                                <Skeleton className='h-4 w-8' />
                            </div>
                        </div>
                    </div>
                ))}
                <Skeleton className='h-4 w-full mt-4' />
                <Skeleton className='h-6 w-full' />
            </div>
        </div>
    )
}