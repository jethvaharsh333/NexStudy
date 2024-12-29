import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response){
    try{
        const userId = await currentUserId();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const categories = await db.category.findMany({
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(categories);
    }catch(error){
        console.log("[GET_CATEGORIES]",error);
        return{
            categories: {}
        }
    }
}