import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";

interface DataCardProps{
    value: number;
    label: string;
    shouldFormat?: boolean;
    loading: boolean;
}

export const DataCard = ({label, value, shouldFormat, loading}: DataCardProps) => {
    return(
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {label}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {loading ? (
                            <div className="mt-1">
                                <Skeleton className="pt-1 h-[24px] w-[74px] rounded-3xl"/>
                            </div>
                        ) : (
                            shouldFormat ? formatPrice(value) : value
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}