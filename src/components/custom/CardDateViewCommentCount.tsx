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
    </div>
  );
};

export default CardDateViewCommentCount;
