"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const user = useCurrentUser();
    // const userId = useCurrentUserId();
    // console.log(userId);
    return (  
        <UserInfo user={user} label="Profile" />
    );
}
 
export default ClientPage;