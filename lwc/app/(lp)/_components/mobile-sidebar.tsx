"use client"

import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent, 
    SheetTrigger
} from "@/components/ui/sheet";

import Navbar from "./navbar"
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Close the sheet when the pathname changes
        setIsOpen(false);
    }, [pathname]);

    const handleSheetOpen = () => {
        setIsOpen(true);
    };

    return(
        <div className="w-full md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="md:hidden w-full flex justify-end hover:opacity-75 transition" onClick={handleSheetOpen}>
                    <Menu className="h-7 w-7 p-1 bg-white rounded-md"/>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 bg-white">
                    <NavLink/>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileSidebar;