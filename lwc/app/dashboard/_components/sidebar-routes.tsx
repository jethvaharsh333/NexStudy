"use client";

import { BarChart, Compass, Layout, List, Workflow } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/dashboard/search",
    },
    // {
    //     icon: Workflow,
    //     label: "Task",
    //     href: "/dashboard/task",
    // }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/dashboard/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/dashboard/teacher/analytics",
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (  
        <div className="flex flex-col w-full "> 
            {routes.map((route) => (
                <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
            ))}
            
        </div>
    );
}
 
export default SidebarRoutes;