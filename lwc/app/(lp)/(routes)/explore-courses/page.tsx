"use client"
import { db } from "@/lib/db";
import { Categories } from "@/components/course-search/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { currentUserId } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { CourseWithProgressWithCategory } from "@/types";
import axios from "axios";
import { useCurrentUserId } from "@/hooks/use-current-user-id";

interface ExploreCourseProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const ExploreCourse = ({ searchParams }: ExploreCourseProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [courses, setCourses] = useState<CourseWithProgressWithCategory[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const router = useRouter();
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                // console.log("Hello categories client");
                const response = await axios.get("/api/actions/get-categories");
                // console.log("categories: "+ response);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchCourses = async () => {
            try {
                const queryString = new URLSearchParams({
                    ...searchParams,
                }).toString();

                // console.log("queryString\n",queryString);
                const response = await axios.get(`/api/actions/get-courses?${queryString}`);
                setCourses(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCategories();
        // console.log("categories: "+categories);
        fetchCourses();
    }, [searchParams, router])

    return (  
        <>
            <div className="px-6 pt-6  mb:mb-0 block">
                <SearchInput/>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <Categories items={categories} loading={loadingCategories} />
                </div>
                <div>
                    <CoursesList items={courses} loading={loadingCourses} />
                </div>
            </div>
        </>
    );
}

export default ExploreCourse;