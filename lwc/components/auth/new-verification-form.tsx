"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string|undefined>();
    const [success, setSuccess] = useState<string|undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token"); 

    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token) {
            setError("Missing Token!");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return(
        <CardWrapper
            headerLabel="Confirming your email"
            backButtonHref="/auth/login"
            backButtonLabel="Back to Login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}