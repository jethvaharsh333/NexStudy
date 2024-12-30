"use client";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { useEffect, useState } from "react";
import { CourseWithProgressWithCategory } from "@/types";
import { useCurrentUserId } from "@/hooks/use-current-user-id";
import axios from "axios";

export default function Dashboard() {
  const [completedCourses, setCompletedCourses] = useState<CourseWithProgressWithCategory[]>([]);
  const [coursesInProgress, setCoursesInProgress] = useState<CourseWithProgressWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = useCurrentUserId();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        router.push("/");
        return;
      }

      try {
        const result = await axios.get("/api/actions/get-dashboard-courses");
        setCompletedCourses(result.data.completedCourses);
        setCoursesInProgress(result.data.coursesInProgress);
      } catch (error) {
        console.error("Error fetching dashboard courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!userId) {
      router.push("/");
      return;
    }

    fetchData();
  }, [userId, router]);

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard loading={loading} icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard loading={loading} icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>
      <CoursesList loading={loading} items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}