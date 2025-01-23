"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { PostWithCategories } from "@/types/customTypes";
import { Loader } from "lucide-react";

const CardListPagination = ({
  page,
  hasNext,
  hasPrev,
  category,
}: {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  category: string | undefined | null;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const pathname = usePathname();
  // console.log("pathname", pathname);

  // console.log("logging at CardListPagination ts");
  // console.log(posts);

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  const handlePrevious = () => {
    setIsLoading(true);
    router.push(`?${category ? `cat=${category}&` : ""}page=${page - 1}`, {});
  };

  const handleNextPage = () => {
    setIsLoading(true);
    router.push(`?${category ? `cat=${category}&` : ""}page=${page + 1}`, {});
  };

  return (
    <div className="flex flex-row w-full items-center justify-between mb-5">
      <Button
        className="w-14 p-0"
        disabled={!hasPrev || isLoading}
        onClick={handlePrevious}
      >
        {isLoading ? <Loader className="animate-spin" /> : "Prev"}
      </Button>
      <Button
        className="w-14 p-0"
        disabled={!hasNext || isLoading}
        onClick={handleNextPage}
      >
        {isLoading ? <Loader className="animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default CardListPagination;
