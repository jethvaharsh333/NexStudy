import { NextRequest ,NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { currentUserId } from "@/lib/auth";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const handleAuth = async () => {
    const userId = await currentUserId();

    if (!userId) throw new Error("unauthorized");
    return { userId };
}

export async function DELETE(request: NextRequest) {
    await handleAuth();
    
    try {
        const url = new URL(request.url);
        const publicId = url.searchParams.get('publicId');
        
        if(!publicId){
            return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
        }
        
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image'  // If it's a video, specify the resource type
        });

        if (result.result !== 'ok') {
            throw new Error('Failed to delete image');
        }

        return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}