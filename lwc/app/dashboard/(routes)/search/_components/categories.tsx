"use client";

import { Category } from "@prisma/client";
import { icons } from "lucide-react";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoriesProps{
    items: Category[];
    loading: boolean;
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
};

export const Categories = ({items, loading} : CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {loading ? (
                <>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                    <Skeleton className="py-4 px-12 mr-1 rounded-full flex items-center gap-x-1"/>
                </>
            ) : (
                <>
                    {items.map((item) => (
                        <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
                    ))}
                </>
            )}
        </div>
    )
}