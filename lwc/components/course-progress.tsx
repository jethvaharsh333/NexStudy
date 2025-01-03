import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps{
    value: number | null;
    variant?: "default" | "success",
    size?: "default" | "sm";
}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
}

export const CourseProgress = ({
    value,
    size,
    variant
} : CourseProgressProps) => {
    return(
        <div>
            <Progress className="h-2" value={value} variant={variant} />
            <p className={cn(
                "font-medium text-sky-700",
                colorByVariant[variant || "default"],
                sizeByVariant[size || "default"],
            )}>
                {
                    value ?
                    (
                        <>{Math.round(value)}% Complete</>
                    ) : (
                        <>0% Complete</>
                    )
                }
                
            </p>
        </div>
    )
}