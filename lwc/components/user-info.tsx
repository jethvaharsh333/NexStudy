import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
    console.log(user);
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-cebter">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-3" >
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-x-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-x-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Image
                    </p>
                    <p className="truncate text-xs  max-x-[180px] font-mono p-1 rounded-md">
                        <Avatar className="">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback className="bg-sky-500 h-full w-full">
                                <FaUser className="text-white  h-1/2 w-1/2" />
                            </AvatarFallback>
                        </Avatar>                    
                    </p>
                </div>
                {/* <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-x-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div> */}
                {/* <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}                        
                    </Badge>
                </div> */}
            </CardContent>
        </Card>
    );
}