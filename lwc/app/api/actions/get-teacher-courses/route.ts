import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request, res:Response){
    try{
        const userId = await currentUserId();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const courses = await db.course.findMany({
            where:{
                userId: userId
            },
            orderBy:{
                createdAt: "desc"
            }
        }) 

        return NextResponse.json(courses,  { status: 200 });
    }catch(error){
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}