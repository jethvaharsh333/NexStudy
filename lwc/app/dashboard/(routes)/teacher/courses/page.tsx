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

    if(!userId){
        return redirect("/");
    }

    useEffect(() => {
        if (!userId) {
            router.push("/dashboard");
            return;
        }

        const fetchCourses = async() => {
            try{
                setLoading(false);
                const response = await axios.get("/api/actions/get-teacher-courses");
                setCourses(response.data);
            }catch(error){
                console.error("Error fetching teacher courses:", error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchCourses();
    }, [courses, router])

    return (  
        <div className="p-6">
            <DataTable columns={columns} data={courses} loading={loading} />
        </div>
    );
}