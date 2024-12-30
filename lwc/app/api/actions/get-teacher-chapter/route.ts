import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request, res:Response){
    try{
        const userId = await currentUserId();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const url = new URL(req.url);

        const queryParams = {
            courseId: url.searchParams.get("courseId") || undefined,
            chapterId: url.searchParams.get("chapterId") || undefined,
        };

        const chapter = await db.chapter.findUnique({
            where: {
                id: queryParams.chapterId,
                courseId: queryParams.courseId
            },
            // include: {
            //     muxData: true,
            // },
        });

        return NextResponse.json(chapter, {status: 200});
    }catch(error){
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}