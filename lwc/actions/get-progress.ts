import { db } from "@/lib/db";

export const getProgress = async(
    userId: string,
    courseId: string,
): Promise<number> => {
    try{
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        // console.log("publishedChapters: "+publishedChapters);

        const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChaptersIds,
                },
                isCompleted: true,
            }
        });

        const progressPercentage = (validCompletedChapters / publishedChaptersIds.length) * 100;

        return progressPercentage;
    }   
    catch(error){
        console.log("[GET_PROGRESS]",error);
        return 0;
    }
}