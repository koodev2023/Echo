"use client";

import Link from "next/link";
import UserIconWithNameAndDate from "./UserIconWithNameAndDate";

const PostBanner = ({
  date,
  title,
  userImageUrl,
  username,
}: {
  date: string;
  title: string;
  userImageUrl: string;
  username: string;
}) => {
  return (
    <div className="px-3">
      <div className="flex flex-col-reverse lg:flex-row gap-8 items-center justify-center">
        <div className="flex-1 flex flex-col gap-2 md:gap-3 text-foreground justify-center items-start h-full w-full">
          <h2 className="text-3xl md:text-4xl font-bold break-words w-full">
            {title}
          </h2>
          <UserIconWithNameAndDate
            userImageUrl={userImageUrl}
            username={username}
            date={date}
          />
        </div>

        {/* {postImageUrl && (
          <div className="flex-1 flex relative rounded-lg overflow-hidden w-full shadow-lg aspect-video">
            <Image src={postImageUrl} alt="" fill className="object-cover" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PostBanner;
