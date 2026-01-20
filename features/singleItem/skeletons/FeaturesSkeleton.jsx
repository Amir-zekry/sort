import { Skeleton } from "@/components/ui/skeleton"

function FeaturesSkeleton() {
    return (
        <div>
            <Skeleton className='flex w-28 h-5 justify-center mx-auto mb-20' />
            <div className='flex flex-col gap-y-10'>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col w-full items-center px-4 md:px-8">
                        {/* Title Skeleton */}
                        <div className="flex flex-col items-center space-y-1 mb-4 md:mb-8 w-full">
                            <Skeleton className="h-10 w-3/4" />
                        </div>

                        {/* Description + Image Skeleton */}
                        <div
                            className={`flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                                }`}
                        >
                            {/* Description Skeleton */}
                            <div className="space-y-2 order-1 max-w-md w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            {/* Image Skeleton */}
                            <Skeleton className="rounded-2xl w-full md:w-125 h-125 order-2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturesSkeleton