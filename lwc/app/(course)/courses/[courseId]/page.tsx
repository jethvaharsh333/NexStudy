import { getCourse } from "@/actions/get-course";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string;}
}) => {
    const {course} = await getCourse({courseId: params.courseId});

    if(!course){
        return redirect("/dashboard");
    }

    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;