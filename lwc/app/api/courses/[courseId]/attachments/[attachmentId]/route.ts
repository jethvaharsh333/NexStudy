import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, attachmentId: string } }
) {
    try {
        const userId= await currentUserId();

        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        });

        const attachments = await db.attachment.findMany({
            where: {
              courseId: params.courseId,
            },  
          });

        return NextResponse.json({attachments});
    }
    catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}