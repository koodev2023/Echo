"use client";

import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserIconWithName = ({
  name,
  username,
  userImageUrl,
}: {
  name: string;
  username: string;
  userImageUrl: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <h1 className="text-lg font-semibold min-w-max">
        {userImageUrl ? (
          <Image
            src={userImageUrl}
            alt="user image"
            width={20}
            height={20}
            loading="lazy"
            className="rounded-full hover:opacity-80 hover:cursor-pointer"
            onClick={() => {
              window.location.href = `/@${username}`;
            }}
          />
        ) : (
          <CircleUserRound
            size={20}
            onClick={() => {
              window.location.href = `/@${username}`;
            }}
          />
        )}
      </h1>
      <div className="flex flex-col gap-0 items-start justify-center">
        <h1
          className="text-sm hover:underline hover:cursor-pointer"
          onClick={() => {
            window.location.href = `/@${username}`;
          }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default UserIconWithName;
