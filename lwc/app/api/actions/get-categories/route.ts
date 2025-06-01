import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response){
    try{
        // console.log("Hello categories api");
        const userId = await currentUserId();
        // console.log("categories userID: "+userId);
        // if(!userId){
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const categories = await db.category.findMany({
            orderBy: {
                name: "asc"
            }
        });

        // console.log("categories: "+categories);
        return NextResponse.json(categories || [], { status: 200 });
    }catch(error){
        console.log("[GET_CATEGORIES]",error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}