"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartProps {
    data: {
        name: string;
        total: number;

    }[];
    loading: boolean;
}

export const Chart = ({
    data, loading
}: ChartProps) => {
    return (
        <div>
            {loading ? (
                <div>
                    <Skeleton className="h-[350px] w-full rounded-md" />
                </div>
            ) : (
                <Card className="pt-5">
                    <ResponsiveContainer width="100%" height={350} >
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            )}

        </div>
    )
}