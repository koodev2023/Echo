import Card from "./Card";
import { POST_PER_PAGE } from "@/constants/postConfig";
import { CardListType, CardMode, GetPostsResponse } from "@/types/customTypes";
import { getPosts } from "@/services/postService";
import { getNameByUsername } from "@/services/userService";
import { notFound } from "next/navigation";
import CardListPagination from "./CardListPagination";
import { ScrollArea } from "../ui/scroll-area";

const CardList = async ({
  type,
  page,
  cat,
  username,
  mode,
}: {
  type: CardListType;
  page: number;
  cat?: string;
  username?: string;
  mode: CardMode;
}) => {
  console.log("page", page);
  console.log("cat", cat);

  let name: string | null = null;
  let isProfile = type === "PROFILE";

  if (isProfile && username) {
    try {
      name = await getNameByUsername({ username });
    } catch (error) {
      console.error("Error fetching name:", error);
      return notFound(); // Handle potential errors during name retrieval
    }

    if (!name) {
      // Check if name is still null or empty after the await
      console.log("Name not found for username:", username);
      return notFound();
    }
  }

  const { posts, count }: GetPostsResponse = await getPosts({
    page,
    cat,
    username,
    isPublished:
      type === "STORIES_PUBLISHED" || type === "PROFILE"
        ? true
        : type === "STORIES_DRAFTS"
        ? false
        : true,
  });

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * page < count;

  const postWord =
    type === "STORIES_DRAFTS"
      ? "draft posts"
      : type === "STORIES_PUBLISHED"
      ? "published posts"
      : "posts";

  return (
    <div className="flex flex-col gap-3">
      <h1 className="w-full flex text-2xl font-bold mb-4">
        {type === "HOME" ? "Recent Posts" : type === "PROFILE" ? name : null}
      </h1>

      {posts ? (
        posts.length > 0 ? (
          <div className="flex flex-col w-full items-center justify-center divide-y">
            {posts.map((post) => (
              <Card mode={mode} post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full max-sm:items-center justify-center">
            <p>{`No ${postWord} found.`}</p>
          </div>
        )
      ) : (
        <div className="flex flex-col w-full max-sm:items-center justify-center">
          <p>{`Failed to fetch ${postWord}.`}</p>
        </div>
      )}

      {posts && posts.length !== 0 && (
        <CardListPagination
          hasNext={hasNext}
          hasPrev={hasPrev}
          page={page}
          category={cat}
        />
      )}
    </div>
  );
};

export default CardList;
