import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response){
    try{
        const userId = await currentUserId(); // Fetch the current user's ID
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(req.url);
        const courseId = url.searchParams.get("courseId");

        if(!courseId){
            return new NextResponse("Bad Request", { status: 400 });
        }
        
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            },
            include: {
                chapters: {
                    orderBy: {
                        position: "asc",
                    }
                },
                attachments: { 
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        if(!course){
            return new NextResponse("Not Found", { status: 404 });
        }

        console.log("course api: "+course);
        
        return NextResponse.json(course);
    }catch(error){
        console.error("Error in GET handler:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}