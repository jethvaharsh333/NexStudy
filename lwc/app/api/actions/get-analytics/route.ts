import { getAnalytics } from "@/actions/get-analytics";
import { currentUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try{
        const userId = await currentUserId();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const analytics = await getAnalytics(userId);

        return NextResponse.json(analytics);
    }catch(error){
        console.log("[COURSE_ANALYTICS]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}