"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { generateVerificationToken, generateTwofactorToken } from "@/lib/tokens";
import { db } from "@/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    console.log("Login api .........")
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Account does not exist!" }
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success:"Confirmation email sent!" }
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email){
        console.log("values: "+values);
        console.log("existingUser.isTwoFactorEnabled && existingUser.email");
        if(code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            console.log("token from db : "+twoFactorToken?.token);
            if(!twoFactorToken){
                return { error: "Invalid code!" };
            }

            if(twoFactorToken.token !== code){
                return { error: "Invalid code!" };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired){
                return { error: "Code expired!" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })
        }
        else{
            const twoFactorToken = await generateTwofactorToken(existingUser.email);

            await sendTwoFactorEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            )

            return { twoFactor: true };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case ("CallbackRouteError" || "CredentialsSignin"):
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
}