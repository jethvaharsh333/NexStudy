"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useCurrentUserId } from "@/hooks/use-current-user-id";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps{
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const userId = useCurrentUserId();
    
    const onClick = async() => {
        try{
            setIsLoading(true);

            // if(!userId){
            //     return;
            // }

            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);
        }
        catch(error){
            toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false);
        }
    }

    // if(!userId){
    //     return <LoginButton>
    //               <Button size="lg">Sign in</Button>
    //             </LoginButton>;
    // }

    return(
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto"
        >
            Enroll for {formatPrice(price)}
        </Button>

    )
}