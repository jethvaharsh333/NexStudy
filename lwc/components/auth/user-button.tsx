"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaCog, FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const user = useCurrentUser();
    const router = useRouter();

    const onClick = (location: string) => {
        router.push(location);
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end" >
                <DropdownMenuItem onClick={() => onClick("/profile")}>
                    <FaUser className="h-4 w-4 mr-2"/>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClick("/settings")}>
                    <FaCog className="h-4 w-4 mr-2"/>
                    Settings
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem>
                        <FaSignOutAlt className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}