import { isTeacher } from "@/lib/teacher";
import { currentUserId } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { useCurrentUserId } from "@/hooks/use-current-user-id";

const f = createUploadthing();

const handleAuth = async () => {
    const userId= await currentUserId();
    // console.log(userId);

    // const isAuthorized = isTeacher(userId);
    // if (!userId || !isAuthorized) throw new Error("unauthorized");

    if (!userId) throw new Error("unauthorized");
    return { userId };
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    courseAttachment: f(["text", "audio", "video", "image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            // console.log("Upload complete for userId:", metadata.userId);
       
            // console.log("file url", file.url);
       
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
          }),
    courseVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;