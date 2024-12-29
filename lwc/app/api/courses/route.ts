import { currentUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";

export async function POST(req: Request,){
    try{
        // const { userId } = auth();
        // console.log("not good");
        const userId = await currentUserId();
        // console.log("\n\n\n\n\n\n\n\nuserId",userId);
        const { title } = await req.json();
        // console.log(userId);

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });

        return NextResponse.json(course);
    } 
    catch(error){
        console.log("[courses]", error);
        return new NextResponse("internal error", { status: 500 });
    }
}