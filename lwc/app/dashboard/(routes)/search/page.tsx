"use client"
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
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

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<CourseWithProgressWithCategory[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const router = useRouter();
    const userId = useCurrentUserId();

    useEffect(() => {
        if (!userId) {
            router.push("/dashboard");
        }
    }, [userId, router]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/actions/get-categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchCourses = async () => {
            try {
                if(!userId){
                    router.push("/dashboard");
                    return;
                }
                const queryString = new URLSearchParams({
                    userId,
                    ...searchParams,
                }).toString();

                console.log("queryString\n",queryString);
                const response = await axios.get(`/api/actions/get-courses?${queryString}`);
                setCourses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCategories();
        fetchCourses();
    }, [userId, searchParams])

    return (  
        <>
            <div className="px-6 pt-6 md:hidden mb:mb-0 block">
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

export default SearchPage;