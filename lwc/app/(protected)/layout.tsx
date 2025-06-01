import Link from "next/link";
import { Navbar } from "./_components/navbar";
import { FaBackward, FaArrowLeft } from "react-icons/fa";

interface ProtectedLayoutProps {
    children:React.ReactNode
}

const ProtectedLayout = ({children}:ProtectedLayoutProps) => {
    return (  
        <div className="h-full relative w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="absolute top-5 left-5">
                <Link href="/dashboard" className="flex items-center gap-x-1">
                    <FaArrowLeft className="w-3 h-3 text-white"/>
                    <span className="text-white text-sm">Back</span>
                </Link>
            </div>
            {children}
        </div>
    );
}
 
export default ProtectedLayout;