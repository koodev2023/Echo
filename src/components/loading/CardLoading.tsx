import React from "react";
import { Skeleton } from "../ui/skeleton";

const CardLoading = () => {
  return (
    <div className="w-full flex flex-row gap-5 md:gap-8 items-center justify-center py-1 first:pt-5">
      <div className="w-full flex-1 flex flex-col gap-2 items-start justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full h-8 w-8" />
          <Skeleton className="rounded h-4 w-20" /> {/* Username */}
        </div>
        <Skeleton className="rounded h-6 w-full sm:w-2/3 md:h-8" />
        {/* Title */}
        <Skeleton className="rounded h-4 w-full sm:w-3/4" />
        {/* Description */}
        <Skeleton className="rounded h-4 w-24" /> {/* Date/Views/Comments */}
      </div>
      <Skeleton className="rounded-xl w-20 h-14 sm:w-40 sm:h-24 aspect-video" />
      {/* Image */}
    </div>
  );
};

export default CardLoading;
