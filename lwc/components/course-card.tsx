import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { Skeleton } from "./ui/skeleton";
import { CldImage } from "next-cloudinary";

interface CoursecardProps{
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
    loading: boolean;
}

export const CourseCard = ({
    id,
    category,
    chaptersLength,
    imageUrl,
    price,
    progress,
    title,
    loading
}: CoursecardProps) => {
    if(loading){
        return(
            <></>
        )
    }

    return(
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    {/* <Image fill className="object-cover" alt={title} src={imageUrl} /> */}
                    <CldImage className="object-cover" height={500} width={500} src={imageUrl} alt={title} />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress != null ? (
                        <CourseProgress variant={progress===100 ? "success" : "default"} size="sm" value={progress} />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}