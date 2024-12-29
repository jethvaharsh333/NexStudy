"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { UserButton } from "@/components/auth/user-button";

const NavbarRoutes = () => {
    const pathnamer = usePathname();

    const isTeacherPage = pathnamer?.startsWith("/dashboard/teacher");
    const isCoursePage = pathnamer?.startsWith("/courses");
    const isSearchPage = pathnamer === "/dashboard/search";
    
    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput/>
                </div>
            )}        
            <div className="flex gap-x-2 ml-auto">
                {(isTeacherPage || isCoursePage) ? (
                    <Link href="/dashboard">
                        <Button size="sm" variant="ghost"> 
                            <LogOut className="h-4 w-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/dashboard/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>
                )}
                <UserButton/>
            </div>
        </>
    );
}
 
export default NavbarRoutes;