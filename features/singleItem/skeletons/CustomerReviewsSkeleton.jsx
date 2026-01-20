import { Skeleton } from "@/components/ui/skeleton"
function CustomerReviewsSkeleton() {
    return (
        <section className="md:w-3/4 w-full mx-auto px-4 py-10 space-y-2">
            <Skeleton className="h-8 w-48 flex justify-center mx-auto mb-20" />
            <div className="space-y-2">
                <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 space-y-4">
                            <div className="flex gap-3">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-24" />
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <Skeleton key={j} className="h-4 w-4" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ))}
                </div>
                <Skeleton className="h-4 w-32" />
            </div>
        </section>
    )
}

export default CustomerReviewsSkeleton