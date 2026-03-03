import { Skeleton } from '@/components/ui/skeleton'
export function CheckoutFormSkeleton() {
    return (
        <div className='md:w-1/3 w-full flex flex-col gap-y-4 h-auto md:border-l md:p-10'>
            <div className="border rounded-lg">
                <div className="border-b p-6">
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10" />
                        </div>
                    ))}
                </div>
            </div>
            <Skeleton className="h-16" />
            <Skeleton className="h-10 w-full" />
        </div>
    )
}