"use client"
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { useState, useEffect } from "react";

import { NavbarSkeleton, SidebarSkeleton, MainContentSkeleton } from "./_components/dashboard-skeleton";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        {isLoading ? <NavbarSkeleton /> : <Navbar />}
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        {isLoading ? <SidebarSkeleton /> : <Sidebar />}
      </div>

      <main className="md:pl-56 h-full pt-[80px]">
        {isLoading ? <MainContentSkeleton /> : children}
        {/* <MainContentSkeleton /> */}
      </main>
    </div>
  );
  // return (  
  //     <div className="h-full">
  //         <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
  //             <Navbar/>
  //         </div>
  //         <div className="hidden md:flex h-full w-56 flex-col  fixed inset-y-0 z-50">
  //             <Sidebar/>
  //         </div>
  //         <main className="md:pl-56 h-full pt-[80px]">
  //             {children}
  //         </main>
  //     </div>
  // );
}

export default DashboardLayout;