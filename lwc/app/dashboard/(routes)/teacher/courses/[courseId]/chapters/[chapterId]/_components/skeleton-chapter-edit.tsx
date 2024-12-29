import { IconBadge } from "@/components/icon-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, ArrowLeft, Eye, Video } from "lucide-react";

const SkeletonChapterEdit = () => {
    return(
        <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <div className="flex items-center text-sm hover:opacity-75 transition mb-6">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to course setup
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">
                                    Chapter Creation
                                </h1>
                                <div className="flex items-center gap-x-2">
                                    <div className="text-sm text-slate-700">Complete all fields</div> 
                                    <Skeleton className="h-5 w-12" />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-10" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-y-5">
                            <div className="flex items-center gap-x-2 mb-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">
                                    Customize your chapter
                                </h2>
                            </div>
                            <Skeleton className="w-full h-24 border bg-slate-100 rounded-md"/>
                            <Skeleton className="w-full h-32 border bg-slate-100 rounded-md"/>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div className="flex items-center gap-x-2 mb-1">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">
                                    Access Settings
                                </h2>
                            </div>
                            <Skeleton className="w-full h-24 border bg-slate-100 rounded-md"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-2  mb-2">
                            <IconBadge icon={Video} />
                            <h2 className="text-xl">
                                Add a video
                            </h2>
                        </div>
                        <Skeleton className="w-full h-96 border bg-slate-100 rounded-md"/>
                    </div>
                </div>
            </div>
    );
}

export default SkeletonChapterEdit;