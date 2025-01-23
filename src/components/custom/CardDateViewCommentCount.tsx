import { Eye, MessageCircle } from "lucide-react";
import React from "react";

const CardDateViewCommentCount = ({
  date,
  viewCount,
  commentCount,
  isPublished,
}: {
  date: string;
  viewCount: number;
  commentCount: number;
  isPublished: boolean;
}) => {
  return (
    <div className="text-muted-foreground flex flex-row items-center justify-center gap-3.5 text-[13px]">
      <div>{date}</div>

      <div className="flex flex-row items-center justify-center gap-1">
        <Eye className="w-4 h-4" />
        <div>{viewCount}</div>
      </div>

      <div className="flex flex-row items-center justify-center gap-1">
        <MessageCircle className="w-4 h-4" />
        <div>{commentCount}</div>
      </div>

      <div
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
          isPublished
            ? "bg-green-100 text-green-800 ring-green-600/20"
            : "bg-yellow-100 text-yellow-800 ring-yellow-600/20"
        }`}
      >
        {isPublished ? "Published" : "Draft"}
      </div>

      {/* <div
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
          cardType === "VIEW"
            ? "bg-green-100 text-green-800 ring-green-600/20"
            : "bg-yellow-100 text-yellow-800 ring-yellow-600/20"
        }`}
      >
        {cardType === "EDIT" ? "EDIT" : "VIEW"}
      </div> */}
    </div>
  );
};

export default CardDateViewCommentCount;
