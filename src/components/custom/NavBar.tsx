"use client";

import React from "react";
import ThemeToogle from "./ThemeToogle";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/public/icons/kooblog.svg";
import { usePathname } from "next/navigation";
import ProfileButton from "./ProfileButton";
import WriteButton from "./WriteButton";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/write" && !/^\/posts\/[^/]+\/edit$/.test(pathname) && (
        <header className="top-0 sticky z-50 bg-background flex flex-row w-full items-center justify-between min-h-14 h-14 border-b-[1px] shadow-md px-10 max-2xl:px-8 max-xl:px-6 max-lg:px-4 mb-5">
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
            <div className="max-sm:hidden">KooBlog</div>
          </Link>

          <div className="flex flex-row gap-2 w-max items-center justify-end text-xl">
            <WriteButton />
            <ThemeToogle />
            <ProfileButton />
          </div>
        </header>
      )}
    </>
  );
};

export default NavBar;
