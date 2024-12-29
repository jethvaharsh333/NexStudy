import { getCourses } from "@/actions/get-courses";
import { getProgress } from "@/actions/get-progress";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { NextResponse } from "next/server";

type CoursesWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
}

// export async function GET(req: Request, res:Response){
//     try{
//         const userId = await currentUserId(); // Fetch the current user's ID
//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         console.log("backend: userID: "+userId);

//         const url = new URL(req.url); // Get query params from the request URL
//         const queryParams: Partial<GetCourses> = {
//             userId,
//             title: url.searchParams.get("title") || undefined,
//             categoryId: url.searchParams.get("categoryId") || undefined,
//         };

//         const title = queryParams.title;
//         const categoryId = queryParams.categoryId;

//         const courses = await db.course.findMany({
//             where: {
//                 isPublished: true,
//                 title: {
//                     contains: title,
//                 },
//                 categoryId,
//             },
//             include: {
//                 category: true,
//                 chapters: {
//                     where: {
//                         isPublished: true,
//                     },
//                     select: {
//                         id: true
//                     }
//                 },
//                 purchases: {
//                     where: {
//                         userId,
//                     }
//                 }
//             },
//             orderBy: {
//                 createdAt: "desc",
//             }
//         });

//         console.log("courses: ",courses);

//         const coursesWithProgress: CoursesWithProgressWithCategory[] = await Promise.all(
//             courses.map(async course => {
//                 if(course.purchases.length === 0){
//                     return {
//                         ...course,
//                         progress: null,
//                     }
//                 }

//                 const progressPercentage = await getProgress(userId, course.id);

//                 return{
//                     ...course,
//                     progress: progressPercentage,
//                 };
//             })
//         );

//         return coursesWithProgress;
//     }catch(error){
//         console.error("Error in GET handler:", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }


// import { getCourses } from "@/actions/get-courses";
// import { getProgress } from "@/actions/get-progress";
// import { currentUserId } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { Category, Course } from "@prisma/client";
// import { NextResponse } from "next/server";

// type CoursesWithProgressWithCategory = Course & {
//     category: Category | null;
//     chapters: { id: string }[];
//     progress: number | null;
// };

// type GetCourses = {
//     userId: string;
//     title?: string;
//     categoryId?: string;
// }

export async function GET(req: Request, res:Response){
    try{
        const userId = await currentUserId(); // Fetch the current user's ID
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(req.url); // Get query params from the request URL
        const queryParams: GetCourses = {
            userId,
            title: url.searchParams.get("title") || undefined,
            categoryId: url.searchParams.get("categoryId") || undefined,
        };
        
        // console.log("Query Params:", queryParams);

        const coursesWithProgress = await getCourses(queryParams);

        return NextResponse.json(coursesWithProgress);
    }catch(error){
        console.error("Error in GET handler:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// -----------------------------------

// import { NextResponse } from "next/server";
// import { getCourses } from "@/actions/get-courses"; // Assuming getCourses is imported from another file
// import { currentUserId } from "@/lib/auth"; // Utility to get current user ID
// // import Router, { useRouter } from "next/router";
// import { useSearchParams } from "next/navigation";

// type GetCourses = {
//     userId: string;
//     title?: string;
//     categoryId?: string;
// }

// export async function GET(req: Request, res:Response) {
//     try {
//         const userId = await currentUserId();
//         if(!userId){
//             return new NextResponse("Unauthorized", { status: 401 });
//         }
//         console.log("userId: "+ userId);    

//         const searchParams = useSearchParams();

//         const url = new URL(req.url); // Get query params from the request URL
//         const queryParams = {
//             userId: url.searchParams.get('userId') || undefined, // userId is now ensured to be a string
//             title: url.searchParams.get('title') || undefined,
//             categoryId: url.searchParams.get('categoryId') || undefined,
//         };

//         console.log(queryParams);

//         // Only call getCourses if userId is valid and passed correctly
//         const coursesWithProgress = await getCourses({
//             userId: url.searchParams.get('userId') || userId, // Here userId is passed correctly
//             title: url.searchParams.get('title') || undefined,
//             categoryId: url.searchParams.get('categoryId') || undefined,
//         });

//         console.log("coursesWithProgress: \n"+coursesWithProgress);

//         return NextResponse.json(coursesWithProgress); // Return the result as a JSON response
//     } catch (error) {
//         console.error("Error in GET handler:", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }

// --------------------------

