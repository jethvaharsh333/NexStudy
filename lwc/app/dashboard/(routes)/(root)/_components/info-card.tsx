import { LucideIcon } from 'lucide-react';
import { IconBadge } from '@/components/icon-badge';
import { Skeleton } from '@/components/ui/skeleton';

interface InfoCardProps {
  numberOfItems: number;
  icon: LucideIcon;
  variant?: "default" | "success";
  label: string;
  loading: boolean;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  label,
  numberOfItems,
  loading,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        {loading ? (
          <div className="mt-1">
            <Skeleton className="h-[22px] w-[74px] rounded-3xl"/>
        </div>
        ) : (
          <p className="text-gray-500 text-sm">
            {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
          </p>
        )}
      </div>
    </div>
  );
};