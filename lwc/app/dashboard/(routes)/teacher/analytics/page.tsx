"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { Analytics } from "@/types";
import { useCurrentUserId } from "@/hooks/use-current-user-id";

export default function Analyticspage() {
  const userId = useCurrentUserId();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoadingUser(false);
      router.push("/dashboard");
    } else {
      setLoadingUser(false);
    }
  }, [userId, router]);

  useEffect(() => {
    if (!userId) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/actions/get-analytics");
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          loading={loading}
          value={loading || !analytics ? 0 : analytics.totalRevenue || 0}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          loading={loading}
          value={loading || !analytics ? 0 : analytics.totalSales || 0}
        />
      </div>
      <Chart
        data={loading || !analytics ? [] : analytics.data || []}
        loading={loading}
      />
    </div>
  );
}
