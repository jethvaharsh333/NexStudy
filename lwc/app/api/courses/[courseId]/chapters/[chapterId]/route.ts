import {Mux} from "@mux/mux-node";
import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

// const mux = new Mux({
//     tokenId: process.env.MUX_TOKEN_ID!,
//     tokenSecret: process.env.MUX_TOKEN_SECRET!
// });



export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
){
    try{
        const userId= await currentUserId();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        // console.log(ownCourse?.categoryId);
        
        if(!ownCourse){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });

        if(!chapter){
            return new NextResponse("Not Found", { status: 404 });
        }

        // if(chapter.videoUrl){

        // }

        // if(chapter.videoUrl){
        //     // const existingMuxData = await db.muxData.findFirst({
        //     //     where: {
        //     //         chapterId: params.chapterId,
        //     //     }
        //     // });

        //     // if(existingMuxData){
        //     //     console.log(existingMuxData);
        //     //     await mux.video.assets.delete(existingMuxData.assetId);
        //     //     // await mux.delete(existingMuxData.assetId);
        //     //     console.log(existingMuxData);
        //     //     console.log("-----------------------------------------------------------------------")
        //     //     await db.muxData.delete({
        //     //         where: {
        //     //             id: existingMuxData.id,
        //     //         }
        //     //     });
        //     // }
        // }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId
            }
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        });

        if(!publishedChaptersInCourse.length){
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                }
            })
        }

        return NextResponse.json(deletedChapter);
    }
    catch(error){
        console.log("[CHAPTER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try{
        const userId= await currentUserId();
        const { isPublished, ...values } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        if(!ownCourse){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(chapter);
    }
    catch(error){
        console.log("[COURSES_CHAPTER_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
  ) {
    try {
      const userId = await currentUserId();

      if(!userId){
        return new NextResponse("Unauthorized", { status: 401 });
    }
  
      const course = await db.course.findUnique({
        where: {
          id: params.courseId,
          userId,
        },
      });
  
      if (!course) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const chapter = await db.chapter.findUnique({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
      });
  
      if (!chapter) {
        return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: chapter }, { status: 200 });
    } catch (error) {
      console.error("[CHAPTER_GET_ERROR]", error);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }