import React from "react";
import { Skeleton } from "../ui/skeleton";

const TitlePlusEditorSkeletion = () => {
  return (
    <div className="flex flex-col gap-3 h-screen mx-auto max-w-3xl w-full">
      <Skeleton className="w-full h-10 mt-2.5 rounded-[10px]" />
      <Skeleton className="w-full h-10 rounded-[10px]" />
      <Skeleton className="w-full h-16 rounded-[10px]" />
      <Skeleton className="flex flex-1 w-full rounded-lg" />
    </div>
  );
};

export default TitlePlusEditorSkeletion;
