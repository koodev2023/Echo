import Image from "next/image";
import Link from "next/link";
import React from "react";
import appIcon from "@/public/icons/kooblog.svg";
import ProfileButton from "./ProfileButton";
import ThemeToogle from "./ThemeToogle";

const EditorNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex flex-row w-full items-center justify-between min-h-14 h-14">
        <Link
          href="/"
          className="flex flex-row items-center justify-start w-max text-left text-3xl font-medium gap-2"
        >
          <Image
            src={appIcon}
            alt="avatar"
            width={35}
            height={35}
            loading="lazy"
            className="rounded-xl"
          />
          <div className="max-sm:hidden">Echo</div>
        </Link>

        <div className="flex flex-row gap-2 w-max items-center justify-end text-xl">
          {children}
          <ThemeToogle />
          <ProfileButton />
        </div>
      </header>
    </>
  );
};

export default EditorNavBar;
