import { db } from "@/lib/db";

interface GetCourseProps {
    courseId: string;
};

export const getCourse = async ({ courseId }: GetCourseProps) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId,
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        position: "asc",
                    }
                }
            }
        });

        return {course};
    }
    catch(error){
        console.log("[GET_COURSE]", error);
        return {course: null};
    }


}