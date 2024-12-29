import { Skeleton } from "@/components/ui/skeleton";

export const NavbarSkeleton = () => (
    <div className="border-b bg-white shadow-sm h-full flex justify-end gap-x-4 px-5 items-center">
        <Skeleton className="h-9 w-28 rounded-lg"/>
        <Skeleton className="h-9 w-9 rounded-full"/>
    </div>
  );
  
  export const SidebarSkeleton = () => (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-md">
        <div className="py-6 px-10 border-b bg-white shadow-inner">
            <Skeleton className="w-full h-9"/>
        </div>
        <div className="flex flex-col gap-y-4 px-5 py-3">
        {Array(2).fill(0).map((_, index) => (
            <div className="w-32 h-7 flex gap-x-1" key={index}>
                <Skeleton className="h-full w-11 rounded-full"/>
                <Skeleton className="h-full w-full"/>
            </div>
        ))}
        </div>
    </div>
  );
  
  export const MainContentSkeleton = () => (
    <>
        <div className="h-2/5"></div>
        <div className="flex justify-center w-full">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute rounded-full h-3.5 w-3.5 bg-sky-500/60 "></span>
                <span className="animate-ping animate-infinite animate-ease-linear absolute h-4 w-4 rounded-full bg-sky-400/90 opacity-75"></span>
                <span className="animate-ping animate-infinite animate-ease-linear absolute h-6 w-6 rounded-full animate-ease-in bg-sky-400/80 opacity-75"></span>
            </span>
        </div>
    </>
  );
  