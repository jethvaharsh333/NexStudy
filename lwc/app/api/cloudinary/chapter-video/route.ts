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
            resource_type: 'video'  // If it's a video, specify the resource type
        });

        if (result.result !== 'ok') {
            throw new Error('Failed to delete video');
        }

        return NextResponse.json({ message: "video deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("[CLOUDINARY-VIDEO-ERROR]\n: "+error);
        return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const publicId = url.searchParams.get('publicId');

        if(!publicId){
            return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
        }

    try {
        // Fetch video resource details from Cloudinary
        const resource = await cloudinary.api.resource(publicId, {
            resource_type: "video",
        });

        return NextResponse.json({
            status: "success",
            data: {
                publicId: resource.public_id,
                format: resource.format,
                duration: resource.duration,
                width: resource.width,
                height: resource.height,
                created_at: resource.created_at,
                secure_url: resource.secure_url,
            },
        });
    } catch (error: any) {
        if (error.http_code === 404) {
            return NextResponse.json({ error: "Video not found" }, { status: 400 });
        }

        return NextResponse.json({ error: "An error occurred while fetching video details" }, { status: 500 });
    }
}