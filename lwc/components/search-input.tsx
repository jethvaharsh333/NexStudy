"use client";

import qs from  "query-string";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debounceValue
            },
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }, [ debounceValue, currentCategoryId, router, pathname ]);

    return(
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600"/>
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                // className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" 
                placeholder="Search for a course"
                className={cn( "w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" , pathname=="/explore-courses" ? "md:w-[800px]" : "md:w-[300px]")}
            />
        </div>
    )
}