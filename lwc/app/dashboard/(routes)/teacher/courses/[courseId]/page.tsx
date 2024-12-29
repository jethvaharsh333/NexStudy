"use client";

import { useState, useEffect } from "react";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import axios from "axios";
import { Attachment, Chapter, Course } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCourseEdit from "./_components/skeleton-course-edit";

interface CourseWithChapters extends Course {
  chapters: Chapter[];
  attachments: Attachment[];
}

interface Category {
  id: string;
  name: string;
}

interface CoursePageProps {
  params: { courseId: string };
}

const CourseIdPage = ({ params }: CoursePageProps) => {
  const { courseId } = params;
  const [course, setCourse] = useState<CourseWithChapters | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCourseData = async () => {
      try {
        const [courseRes, categoriesRes] = await Promise.all([
          axios.get(`/api/actions/get-course?courseId=${courseId}`),
          axios.get("/api/actions/get-categories"),
        ]);
        setCourse(courseRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if(loading){
    return <SkeletonCourseEdit/>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapters) => chapters.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const handlePublishedChange = (published: boolean) => {
    setCourse(prevCourse => prevCourse ? { ...prevCourse, isPublished: published } : null);
  };

  const addChapterToList = (newChapter: Chapter) => {
    setCourse((prevCourse) =>
      prevCourse
        ? { ...prevCourse, chapters: [...prevCourse.chapters, newChapter] }
        : null
    );
  };

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students" />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">Completed all fields {completionText}</span>
          </div>
          <Actions disabled={!isComplete} courseId={course.id} isPublished={course.isPublished} onPublishedChange={handlePublishedChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} onChapterAdded={addChapterToList} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources and attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
