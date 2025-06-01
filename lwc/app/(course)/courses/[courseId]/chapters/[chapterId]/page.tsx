import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/ui/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";
import { currentUserId } from "@/lib/auth";

const ChapterIdPage = async({
    params
}: {
    params: {courseId: string; chapterId: string;}
}) => {
    const userId = await currentUserId();

    const {
        chapter,
        course,
        // videoUrl,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if(!chapter || !course){
        return redirect("/dashboard");
    }

    // console.log("videoUrl"+chapter?.videoUrl);

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (  
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="You already completed this chapter."
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="You need to purchase this course to watch this chapter."
                />
            )} 
            <div className="flex flex-col max-w-4xl h-100 mx-auto lg:pt-5 pb-20 overflow-hidden">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title = {chapter.title}
                        // videoUrl = {chapter.videoUrl!}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={chapter.videoUrl!}
                        isLocked = {isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">
                        {chapter.title}
                    </h2>
                    {purchase ? (
                        <CourseProgressButton chapterId={params.chapterId} courseId={params.courseId} nextChapterId={nextChapter?.id} isCompleted={!!userProgress?.isCompleted} />
                    ) : (
                        <CourseEnrollButton courseId={params.courseId} price={course.price!}  />
                    )}
                </div>
                <Separator/>
                <div>
                    <Preview value={chapter.description!} />
                </div>
                {!!attachments.length && (
                    <>
                        <Separator/>
                        <div className="p-4">
                            {attachments.map((attachment) => (
                                <a href={attachment.url} key={attachment.id} className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
                                    <File/>
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
 
export default ChapterIdPage;