import { db } from "@/lib/db";
import { Attachment, Chapter} from "@prisma/client";

interface GetChapterProps{
    userId?: string;
    courseId: string;
    chapterId: string;
};

export const getChapter = async({
    userId,
    courseId,
    chapterId,
} : GetChapterProps) => {
    try{
        const purchase = userId ? await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                }
            }
        }) : false;

        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
            select: {
                price: true,
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        });

        // console.log(chapter.);

        if(!chapter || !course){
            throw new Error("Chapter or course not found");
        }

        // let videoUrl = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        // if(chapter.videoUrl){
        //     videoUrl = videoUrl;
        // }

        if(purchase){
            attachments = await db.attachment.findMany({
                where: {
                    courseId: courseId
                }
            });
        }

        if(chapter.isFree || purchase){
            // muxData = await db.muxData.findUnique({
            //     where: {
            //         chapterId: chapterId,
            //     }
            // });

            // videoUrl = await 

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    }
                },
                orderBy: {
                    position: "asc",
                }
            });
        }

        const userProgress = userId ? await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                }
            }
        }) : null;

        return {
            chapter,
            course,
            // videoUrl,
            attachments,
            nextChapter,
            userProgress,
            purchase
        };
    }
    catch(error){
        console.log("[GET_CHAPTER]",error);
        return{
            chapter: null,
            course: null,
            // videoUrl: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        }
    }
}