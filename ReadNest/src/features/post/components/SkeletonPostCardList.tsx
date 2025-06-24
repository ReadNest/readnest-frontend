import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPostCard = () => {
    return (
      <div className="rounded-xl border bg-white shadow h-full flex flex-col">
        {/* Book image */}
        <Skeleton className="w-full h-48 rounded-t" />
  
        {/* CardHeader */}
        <div className="p-4 flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
  
        {/* CardContent */}
        <div className="px-4 pb-4 flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
  
        {/* CardFooter */}
        <div className="px-4 pb-4 flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    );
  };

const SkeletonPostCardList = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonPostCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonPostCardList;
