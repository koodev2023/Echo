import React from "react";
import UserIcon from "./UserIcon";
import formatDate from "@/lib/utils/date";

const CommentSingle = ({
  userImageUrl,
  userName,
  createdAt,
  commentBody,
}: {
  userImageUrl: string | null | undefined;
  userName: string;
  createdAt: string;
  commentBody: string;
}) => {
  return (
    <div className="flex flex-row gap-3 items-start justify-start">
      {userImageUrl && <UserIcon userImageUrl={userImageUrl} />}

      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row gap-1.5">
          <div className="text-sm text-foreground font-bold">{userName}</div>
          <div className="text-sm text-muted-foreground">
            {formatDate({ dateInput: createdAt })}
          </div>
        </div>
        <div className="text-sm text-foreground">{commentBody}</div>
      </div>
    </div>
  );
};

export default CommentSingle;
