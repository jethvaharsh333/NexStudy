import { getProgress } from "@/actions/get-progress";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { CourseWithProgressWithCategory } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response){
    try{
        const userId = await currentUserId();
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        console.log("userId: "+ userId);

        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });

        

        const courses = purchasedCourses.map((purchase:any) => purchase.course) as CourseWithProgressWithCategory[];

        for(let course of courses){
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);
        return NextResponse.json({completedCourses, coursesInProgress}, { status: 200 });
    }
    catch(error){
        console.log("[GET_DASHBOARD_COURSES]",error);
        return NextResponse.json(
            { completedCourses: [], coursesInProgress: [] }, 
            { status: 500 }
          );  
    }
}