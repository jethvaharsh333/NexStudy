"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useCurrentUserId } from "@/hooks/use-current-user-id";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import { Info } from "lucide-react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const userId = useCurrentUserId();

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            toast((t) => (
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-blue-600">
                            <Info className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-blue-700">Testing Mode</p>
                            <p className="mt-1">
                                Enter card number as: <br /><span className="font-mono text-gray-900">4242 4242 4242 4242</span>
                            </p>
                            <br />
                            <p className="text-gray-600">
                                You may enter other details anonymously.
                            </p>
                        </div>
                </div>
            ), {
                duration: 9000,
            });


            await new Promise((res) => setTimeout(res, 9000));

            window.location.assign(response.data.url);
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
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