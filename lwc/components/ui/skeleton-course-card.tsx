import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCourseCard = () => {
    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="flex flex-col pt-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40 mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
            </div>
        </div>
    )
}