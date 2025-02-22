import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostLoading = () => {
  return (
    <div className="flex flex-col gap-2 sm:gap-5 md:gap-8 w-full h-full">
      <div>
        {/* Big Title */}
        <Skeleton className="rounded h-10 w-full my-4" />

        {/* Simple Avatar with Name */}
        <div className="flex items-center my-4">
          <Skeleton className="rounded-full h-12 w-12 mr-4" />
          <Skeleton className="rounded h-5 w-36" />
        </div>
      </div>

      {/* Paragraphs */}
      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      {/* Paragraph skeletons of similar page length will produce unwanted scrolling */}
      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>

      <div>
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
        <Skeleton className="rounded h-5 w-full my-2" />
      </div>
    </div>
  );
};

export default PostLoading;
