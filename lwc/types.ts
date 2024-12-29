import { Category, Course } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

export type TeacherCourses = {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    categoryId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type Analytics = {
    data:{
        name: string;
        total: number;
    }[];
    totalRevenue: number | null;
    totalSales: number | null;
}

export type SingleCourse = {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number;
    categoryId: string;
    isPublished: boolean;
    chapters: {
        id: string;
        title: string;
        description: string | null;
        videoUrl: string | null;
        position: number;
        isPublished: boolean;
        isFree: boolean;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    attachments: {
        id: string;
        title: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};
