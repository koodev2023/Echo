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
import CardDropdownMenu from "./CardDropdownMenu";
import { useRouter } from "nextjs-toploader/app";

const Card = ({
  mode,
  post,
}: {
  mode: CardMode;
  post: PostWithCategoriesAndUserEssenceAndCommentCount;
}) => {
  const plainText = getPlainTextWithNewlines(post.desc, 300);
  const blurDataURL = (placeholderImage as StaticImageData).src;
  const router = useRouter();

  const url = post.isPublished
    ? `/@${post.user.username}/${post.slug}`
    : `/posts/${post.id}/edit`;

  const pushToEditOrDisplay = () => {
    router.push(url);
  };

  const isDashboardView = mode === "DASHBOARD";

  return (
    <div
      onClick={() => pushToEditOrDisplay()}
      className={`w-full flex flex-row gap-5 md:gap-8 items-center justify-center py-5 first:pt-0 ${
        post.isPublished ? "hover:cursor-pointer" : ""
      }`}
    >
      <div className="w-full flex-1 flex flex-col gap-2 items-start justify-center">
        <UserIconWithName
          userImageUrl={post.user.image ?? ""}
          username={post.user.username}
          name={post.user.name}
        />
        <h1
          onClick={(e) => {
            if (!post.isPublished) {
              e.stopPropagation();
              pushToEditOrDisplay();
            }
          }}
          className={`text-xl md:text-2xl font-semibold text-foreground line-clamp-4 md:line-clamp-3 lg:line-clamp-2 leading-none break-words max-w-full ${
            !post.isPublished ? "hover:cursor-pointer" : ""
          }`}
        >
          {post.title || "[Untitled]"}
        </h1>
        <div
          onClick={(e) => {
            if (!post.isPublished) {
              e.stopPropagation();
              pushToEditOrDisplay();
            }
          }}
          className={`text-muted-foreground leading-tight line-clamp-2 break-words max-w-full ${
            !post.isPublished ? "hover:cursor-pointer" : ""
          }`}
        >
          {plainText}
        </div>
        <div className="flex flex-row gap-3.5 items-center">
          <CardDateViewCommentCount
            date={formatDate({ dateInput: post.createdAt })}
            viewCount={post.views}
            commentCount={post._count.comments}
            isPublished={post.isPublished}
          />

          {isDashboardView && (
            <CardDropdownMenu postId={post.id} isPublished={post.isPublished} />
          )}
        </div>
      </div>

      {post.imgs && post.imgs.length > 0 && (
        <div className="flex items-center justify-center relative w-20 h-14 sm:w-40 sm:h-24 overflow-hidden rounded-xl aspect-video">
          <Image
            src={post.imgs[0]}
            alt=""
            fill
            sizes="99vw"
            className="object-cover w-full h-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
