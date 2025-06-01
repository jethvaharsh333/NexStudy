"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  onChange: (value: string) => void;

}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
  onChange
}: ChapterVideoFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl);
  const preVideoUrlRef = useRef(initialData.videoUrl);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const preVideoUrl = preVideoUrlRef.current; // Store current URL before update
      const { data } = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      setVideoUrl(data.videoUrl); // Update state
      preVideoUrlRef.current = data.videoUrl; // Update ref
      toast.success("Chapter updated");
      onChange(data.videoUrl);

      // Delete the old video if it exists
      if (preVideoUrl) {
        await axios.delete("/api/cloudinary/chapter-video", {
          params: { publicId: preVideoUrl },
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error in onSubmit:", error);
    }
  };

  useEffect(() => {
    // Synchronize ref with videoUrl whenever videoUrl changes
    preVideoUrlRef.current = videoUrl;
    // console.log("Updated preVideoUrlRef:", preVideoUrlRef.current);
  }, [videoUrl]);

  const handleVideoUpload = async (result: any) => {
    const publicId = result.info.public_id;
    try {
      setIsUploading(true); // Indicate uploading in progress
      await onSubmit({ videoUrl: publicId });
      setVideoUrl(publicId); // Update state after successful submission
    } catch (error) {
      console.error("Error in handleVideoUpload:", error);
    } finally {
      setIsUploading(false); // Reset upload indicator
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Video
        <div>
          <CldUploadWidget
            uploadPreset="sng1zvit"
            onSuccessAction={handleVideoUpload}
          >
            {({ open }) => (
              <Button
                variant="ghost"
                onClick={() => open()}
                disabled={isUploading}
              >
                {videoUrl ? (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Video
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add a Video
                  </>
                )}
              </Button>
            )}
          </CldUploadWidget>
        </div>
      </div>
      <div className="pt-2">
        {!videoUrl ? (
          <div className="flex items-center justify-center h-64 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video flex justify-center px-1">
            <CldVideoPlayer
              key={videoUrl} // Ensure re-render with updated videoUrl
              src={videoUrl}
              className="justify-center object-cover w-full h-full rounded-lg shadow-md"
              preload="auto"
              showJumpControls
              transformation={{ streaming_profile: "hd" }}
              sourceTypes={["hls", "dash"]}
              colors={{
                accent: "#2563EB",
                base: "#000000",
                text: "#FFFFFF",
              }}
            />
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground mt-4">
        16:9 aspect ratio recommended
      </div>
    </div>
  );
};
