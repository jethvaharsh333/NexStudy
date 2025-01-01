import { getCourses } from "@/actions/get-courses";
import { getProgress } from "@/actions/get-progress";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { NextResponse } from "next/server";

type CoursesWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourses = {
    userId?: string;
    title?: string;
    categoryId?: string;
}

export async function GET(req: Request, res:Response){
    try{
        const userId = await currentUserId(); // Fetch the current user's ID
        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const url = new URL(req.url); // Get query params from the request URL
        const queryParams: GetCourses = {
            userId: userId || undefined,
            title: url.searchParams.get("title") || undefined,
            categoryId: url.searchParams.get("categoryId") || undefined,
        };
        
        const coursesWithProgress = await getCourses(queryParams);
        return NextResponse.json(coursesWithProgress,  { status: 200 });
    }catch(error){
        console.error("Error in GET handler:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
