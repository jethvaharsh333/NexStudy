import { auth } from "@/auth";

export const currentUser = async() => {
    const session = await auth();
    return session?.user;
};

export const currentUserId = async() => {
    const session = await auth();
    // console.log(session?.user.id);
    return session?.user.id;
};

export const currentRole = async() => {
    const session = await auth();
    return session?.user?.role;
};