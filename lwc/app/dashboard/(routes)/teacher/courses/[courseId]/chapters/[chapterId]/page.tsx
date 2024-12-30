"use client"
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForms } from "./_components/chapter-description-form";
import { ChapterAccessForms } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/ui/banner";
import { ChapterActions } from "./_components/chapter-actions";
// import { currentUserIdId } from "@/hooks/use-current-user-id";
import { currentUserId } from "@/lib/auth";
import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonChapterEdit from "./_components/skeleton-chapter-edit";
import { useCurrentUserId } from "@/hooks/use-current-user-id";

const ChapterIdPage = ({params}: {params: {courseId: string; chapterId: string}}) => {
    const [loading, setLoading] = useState(true);
    const userId  = useCurrentUserId(); 
    const [chapter, setChapter] = useState<Chapter>();

    useEffect(() => {
        setLoading(true);
        if(!userId){
            return redirect("/");
        }

        const fetchChapter = async() => {
            
            try{
                const response = await axios.get(`/api/actions/get-teacher-chapter?courseId=${params.courseId}&chapterId=${params.chapterId}`);
                setChapter(response.data);
            }catch(error){  
                console.log("Chapter data error");
            }finally{
                setLoading(false);
            }
        }

        // handlePublishedChange();
        fetchChapter();
    }, [userId, params.courseId, params.chapterId]);

    if (!userId) {
        return null; // Avoid returning hooks conditionally
    }

    if(loading){
        return <SkeletonChapterEdit/>;
    }

    if(!chapter){
        return redirect("/dashboard/teacher/courses");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];


    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    const handlePublishedChange = (published: boolean) => {
        setChapter(prevChapter => prevChapter ? { ...prevChapter, isPublished: published } : undefined);
    };

    return (  
        <>
            {!chapter.isPublished && (
                <Banner variant="warning" label="This chapter is unpublished. It will not be in the course." />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link href={`/dashboard/teacher/courses/${params.courseId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to course setup
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">
                                    Chapter Creation
                                </h1>
                                <span className="text-sm text-slate-700">
                                    Complete all fields {completionText}
                                </span>
                            </div>
                            <ChapterActions disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished} onPublishedChange={handlePublishedChange}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">
                                    Customize your chapter
                                </h2>
                            </div>
                            <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}  />
                            <ChapterDescriptionForms initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForms initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Video} />
                            <h2 className="text-xl">
                                Add a video
                            </h2>
                        </div>
                        <ChapterVideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default ChapterIdPage;