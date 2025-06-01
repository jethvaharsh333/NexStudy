"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftRight, ArrowLeftRightIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUserId } from "@/hooks/use-current-user-id";


const NavbarRoutes = () => {
    const pathnamer = usePathname();

    const isTeacherPage = pathnamer?.startsWith("/dashboard/teacher");
    const isCoursePage = pathnamer?.startsWith("/courses");
    const isSearchPage = pathnamer === "/dashboard/search";

    const userId = useCurrentUserId();
    
    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput/>
                </div>
            )}        
            <div className="flex items-center gap-x-2 lg:gap-x-5 ml-auto">
                {userId ? (
                    (isTeacherPage || isCoursePage) ? (
                        <Link href="/dashboard">
                            <Button 
                                className="py-2 px-3 rounded-md flex gap-x-3 items-center border border-transparent hover:border-gray-200 bg-slate-100" 
                                size="sm" 
                                variant="ghost"
                            >                                
                                <ArrowLeftRightIcon className="h-4 w-4"/>
                                Teacher Mode
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/dashboard/teacher/courses">
                            <Button 
                                className="py-2 px-3 rounded-md flex gap-x-3 items-center border border-transparent hover:border-gray-200 bg-slate-100" 
                                size="sm" 
                                variant="ghost"
                            >                                
                                <ArrowLeftRightIcon className="h-4 w-4"/>
                                Student Mode
                            </Button>
                        </Link>
                    )
                ) : (
                    <Link href="/explore-courses">
                        <Button size="sm" variant="ghost"> 
                            <LogOut className="h-4 w-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                )}
                
                <UserButton/>
            </div>
        </>
    );
}
 
export default NavbarRoutes;