"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ProfileButton = () => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (session.status === "loading") return;
  // if (session.data?.user === null || session.data?.user === undefined) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${session.data?.user?.image ? "rounded-full" : ""}`}
        >
          {session.data?.user?.image ? (
            <Image
              src={session.data?.user?.image!}
              alt="UserLogo"
              width="100"
              height="100"
              loading="lazy"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <UserRound size={28} />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {session.status === "unauthenticated" ? (
          <DropdownMenuItem asChild>
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
        ) : (
          <>
            {pathname === "/write" && (
              <DropdownMenuItem asChild>
                <Link href="/write">Write</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href={`/@${session.data?.user.username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/me/library">Library</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/me/stories/drafts">Stories</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
