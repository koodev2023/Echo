"use client";

import Image, { StaticImageData } from "next/image";
import {
  CardMode,
  PostWithCategoriesAndUserEssenceAndCommentCount,
} from "@/types/customTypes";
import getPlainTextWithNewlines from "@/lib/utils/plainText";
import UserIconWithName from "./UserIconWithName";
import CardDateViewCommentCount from "./CardDateViewCommentCount";
import formatDate from "@/lib/utils/date";
import placeholderImage from "@/public/image-placeholder-grey.png";
import { useRouter } from "next/navigation";
import CardDropdownMenu from "./CardDropdownMenu";
import Link from "next/link";

const CardTiny = ({}: // mode,
// post,
{
  // mode: CardMode;
  // post: PostWithCategoriesAndUserEssenceAndCommentCount;
}) => {
  // const plainText = getPlainTextWithNewlines(post.desc, 300);
  // const blurDataURL = (placeholderImage as StaticImageData).src;

  // const router = useRouter();
  // const url = post.isPublished
  //   ? `/@${post.user.username}/${post.slug}`
  //   : `/posts/${post.id}/edit`;

  // const pushToEditOrDisplay = () => {
  //   router.push(url);
  // };

  // const isDashboardView = mode === "DASHBOARD";

  return (
    <Link
      href={"/"}
      className={`w-[250px] flex flex-row gap-1 items-center justify-center hover:cursor-pointer`}
    >
      <div className="w-full flex-1 flex flex-col gap-1 items-start justify-center">
        <UserIconWithName userImageUrl={""} username="John Doe" name="John" />
        <h1
          className={`text-lg font-semibold text-foreground line-clamp-4 md:line-clamp-3 lg:line-clamp-2 leading-none break-words max-w-full hover:cursor-pointer`}
        >
          Hello World
        </h1>
        <div
          className={`text-muted-foreground leading-tight line-clamp-2 break-words max-w-full hover:cursor-pointer`}
        >
          hello!!!
        </div>
      </div>
    </Link>
  );
};

export default CardTiny;
