import React from "react";
import CardTiny from "./CardTiny";

const MenuPosts = async () => {
  //  const { posts, count }: GetPostsResponse = await getPosts({
  //    page,
  //    cat,
  //    username,
  //    isPublished:
  //      type === "STORIES_PUBLISHED" || type === "PROFILE"
  //        ? true
  //        : type === "STORIES_DRAFTS"
  //        ? false
  //        : true,
  //  });

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-5 max-lg:hidden">
        <CardTiny />
        <CardTiny />
        {/* <CardTiny /> */}
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-5 lg:hidden">
        {/* {posts?.map((post) => (
          <Card post={post} key={post.id} />
        ))} */}
      </div>
    </>
  );
};

export default MenuPosts;
