import { IconBadge } from "@/components/icon-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from "lucide-react";

const SkeletonCourseEdit = () => {
    return (
        <div className="p-6">
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Course setup
                        </h1>
                        <div className="flex items-center gap-x-2">
                            <div className="text-sm text-slate-700">Completed all fields</div> 
                            <Skeleton className="h-5 w-12" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-10" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="flex flex-col gap-y-5">
                    <div className="flex items-center gap-x-2 mb-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your course</h2>   
                    </div>
                    <Skeleton className="w-full h-24 border bg-slate-100 rounded-md"/>
                    <Skeleton className="w-full h-24 border bg-slate-100 rounded-md"/>
                    <Skeleton className="w-full h-72 border bg-slate-100 rounded-md"/>
                    <Skeleton className="w-full h-24 border bg-slate-100 rounded-md"/>
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-2 mb-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">Course Chapters</h2>
                        </div>
                        <Skeleton className="w-full h-28 border bg-slate-100 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-2 mb-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-xl">Sell your course</h2>
                        </div>
                        <Skeleton className="w-full h-24 border bg-slate-100 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-2 mb-2">
                            <IconBadge icon={File} />
                            <h2 className="text-xl">Resources and attachments</h2>
                        </div>
                        <Skeleton className="w-full h-24 border bg-slate-100 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCourseEdit;