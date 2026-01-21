import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CategoryCardSkeleton() {
    return (
        <div className="aspect-[4/5] w-full">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    );
}

export function ProductCardSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
    if (viewMode === 'list') {
        return (
            <div className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-xl shadow-sm">
                <Skeleton className="w-full md:w-[300px] aspect-[4/3] rounded-lg" />
                <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-6 w-20" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-24 rounded-full" />
                        <Skeleton className="h-10 w-24 rounded-full" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm">
            <Skeleton className="w-full aspect-[4/3] rounded-none" />
            <div className="p-6 flex flex-col items-center space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-16" />
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function SidebarSkeleton() {
    return (
        <div className="space-y-8">
            <div className="bg-[#f4f4f4] p-8 rounded-sm space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="bg-[#f4f4f4] p-8 rounded-sm space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-1/3 ml-auto" />
            </div>
            <div className="bg-[#f4f4f4] p-8 rounded-sm space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#f4f4f4] p-8 rounded-sm space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-8 w-16 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    )
}
