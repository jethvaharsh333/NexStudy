"use client";

import * as z from "zod";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import Script from "next/script";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "image is required"
    })
});

interface ImageFormProps {
    initialData: Course;
    courseId: string;
    onChange: (value: string) => void;
}

const ImageForm = ({ initialData, courseId, onChange }: ImageFormProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
    const preUrlRef = useRef(initialData.imageUrl);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const preUrl = preUrlRef.current;
        
        try{
            const { data } = await axios.patch(`/api/courses/${courseId}`, values);
            setImageUrl(data.imageUrl);
            onChange(data.imageUrl);
            toast.success("Course updated");
        } catch (error) {
            toast.error("Something went wrong");
        }

        try{
            if(preUrl){
                await axios.delete('/api/image-cld-upload', { params: { publicId: preUrl } });
            }
            preUrlRef.current = imageUrl;
        }catch(error){
            console.log("Not deleted course image");
        }

        
    };

    const handleImageUpload = async (result: any) => {
        // const uploadedUrl = result.info.secure_url;
        const publicUrl = result.info.public_id;

        try {
            await onSubmit({ imageUrl: publicUrl });
        } catch (error) {
            console.error("Error uploading or deleting the image: ", error);
        }
    };

    return (
        <>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
                <div className="font-medium flex items-center justify-between">
                    Course Image
                    <div>
                        <CldUploadWidget
                            uploadPreset="sng1zvit"
                            onSuccessAction={handleImageUpload}
                        >
                            {({ open }) => (
                                <Button
                                    variant="ghost"
                                    onClick={() => open()}
                                    disabled={isUploading}
                                    onError={() => setIsUploading(false)}
                                >
                                    {imageUrl ? (
                                        <>
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Edit image
                                            
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle className="h-4 w-4 mr-2" />
                                            Add an image
                                        </>
                                    )}
                                </Button>
                            )}
                        </CldUploadWidget>
                    </div>
                </div>
                <div className="pt-2">
                    {!imageUrl ? (
                        <div className="flex items-center justify-center h-64 bg-slate-200 rounded-md">
                            <ImageIcon className="h-10 w-10 text-slate-500" />
                        </div>
                    ) : (
                        <div className="relative aspect-video flex justify-center px-1" >
                            <CldImage
                                width={500} 
                                height={500}
                                src={imageUrl}
                                className="justify-center object-cover rounded-md w-full h-full"
                                alt="course image"
                            />
                        </div>
                    )}
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio recommended
                </div>
            </div>
            <Script
                src="https://upload-widget.cloudinary.com/latest/global/all.js"
                strategy="lazyOnload"
            />
        </>
    );
};

export default ImageForm;