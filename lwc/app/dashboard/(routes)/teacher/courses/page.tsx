"use client"

import { redirect, useRouter } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { TeacherCourses } from "@/types";
import { useCurrentUserId } from "@/hooks/use-current-user-id";

export default function CoursesPage(){
    const userId  = useCurrentUserId(); 
    const router = useRouter();
    const [courses, setCourses] = useState<TeacherCourses[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            router.push("/");
            return;
        }

        const fetchCourses = async() => {
            try{
                setLoading(true);
                // console.log("userId: "+userId);
                const response = await axios.get("/api/actions/get-teacher-courses");
                // console.log(response);
                setCourses(response.data);
            }catch(error){
                console.error("Error fetching teacher courses:", error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchCourses();
    }, [userId, router])

    if (!userId) return null;

    return (  
        <div className="p-6">
            <DataTable columns={columns} data={courses} loading={loading} />
        </div>
    );
}