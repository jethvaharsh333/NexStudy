import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

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

export const getCourses = async({
    userId,
    title,
    categoryId
}: GetCourses) => {
    try{
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        // console.log("courses: ",courses);

        if(!userId){
            return courses;
        }

        const coursesWithProgress: CoursesWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if(course.purchases.length === 0){
                    return {
                        ...course,
                        progress: null,
                    }
                }

                const progressPercentage = await getProgress(userId, course.id);

                return{
                    ...course,
                    progress: progressPercentage,
                };
            })
        );

        return coursesWithProgress;
    }
    catch(error){
        console.log("[GET_COURSES]",error);
        return [];
    }
}