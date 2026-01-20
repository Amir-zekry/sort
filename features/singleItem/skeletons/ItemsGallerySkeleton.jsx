import { Skeleton } from "@/components/ui/skeleton"
function ItemsGallerySkeleton() {
    return (
        <div>
            <div className="h-8 w-48 mb-4 flex justify-center mx-auto">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="w-3/4 mx-auto">
                <div className="flex gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex-1">
                            <div className="p-1">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ItemsGallerySkeleton