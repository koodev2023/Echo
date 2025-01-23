import Image from "next/image";
import React from "react";

const UserIcon = ({ userImageUrl }: { userImageUrl: string }) => {
  return (
    <h1 className="text-lg font-semibold min-w-max">
      <Image
        src={userImageUrl}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
        loading="lazy"
      />
    </h1>
  );
};

export default UserIcon;
