import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async(userId: string): Promise<DashboardCourses> => {
    try{
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
        // console.log("purchasecourse_1",purchasedCourses);

        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];
        // console.log("courses_2",courses);

        for(let course of courses){
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }
        // console.log("courses_3",courses);

        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);
        // console.log("completedCourses ",completedCourses, " ::  coursesInProgress ", coursesInProgress);

        return {completedCourses, coursesInProgress}
    }
    catch(error){
        console.log("[GET_DASHBOARD_COURSES]",error);
        return{
            completedCourses: [],
            coursesInProgress: [],
        }
    }   
}