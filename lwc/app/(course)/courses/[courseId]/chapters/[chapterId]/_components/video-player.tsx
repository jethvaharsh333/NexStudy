"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Video } from "lucide-react";
import "next-cloudinary/dist/cld-video-player.css";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CldVideoPlayer } from "next-cloudinary";
import { Inter } from "next/font/google";

interface VideoPlayerProps{
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
}

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
} : VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async() => {
        try{
            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                console.log("is happening");

                if(!nextChapterId){
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if(nextChapterId){
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    }

    return(
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                    {/* {playbackId} */}
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && (
                // <MuxPlayer 
                //     title={title}
                //     className={cn(
                //         !isReady && "hidden"
                //     )}
                //     onCanPlay={() => setIsReady(true)}
                //     onEnded={onEnd}
                //     autoPlay
                //     // playbackId={playbackId}
                // />

                <CldVideoPlayer
                    key={playbackId} // Ensure re-render with updated playbackId
                    src={playbackId}
                    onPlay={() => setIsReady(true)}
                    autoPlay
                    fontFace="Inter"
                    // className={cn(!isReady ? "hidden" : "justify-center")}
                    preload="auto"
                    // interactionAreas={
                    //     // enable: true,
                    //     template: 'portrait', // or landscape/all/center,
                    //     onClick: function(event) {
                    //         // Code for event here 
                    //     }
                    // }
                    
                    onEnded={onEnd}
                    // controls
                    showJumpControls
                    transformation={{ streaming_profile: "hd" }}
                    sourceTypes={["hls", "dash"]}
                    colors={{
                        accent: "#2563EB",
                        base: "#000000",
                        text: "#FFFFFF",
                    }}
                />

                // <CldVideoPlayer
                //     key={playbackId}
                //     src={playbackId}
                //     onPlay={() => setIsReady(true)}
                //     onEnded={onEnd}
                //     controls
                //     autoPlay
                //     sourceTypes={["hls", "dash"]}
                //     transformation={{ streaming_profile: "hd" }}
                //     className={cn(!isReady ? "hidden" : "justify-center")}
                // />
            )}
        </div>
    )
}