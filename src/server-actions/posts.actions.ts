"use server";

import { PostWithCategoriesAndUserEssence } from "@/types/customTypes";

/**
 * @deprecated Use `getPostById` instead. This function will be removed in a future release.
 */
export const getPostByIdServerAction = async (
  id: string
): Promise<PostWithCategoriesAndUserEssence | null> => {
  console.warn(
    "`getPostByIdServerAction` is deprecated. Use `getNewPostById` instead."
  );

  return null;

  /* const session = await auth();
  if (!session) {
    console.error({
      message: "Not Authenticated",
      status: 401,
    });
    return null;
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { categories: true, user: true },
    });

    if (!existingPost) {
      console.error({
        message: "Post not found",
        status: 404,
      });
      return null;
    }

    if (existingPost.userEmail !== session.user!.email!) {
      console.error({
        message: "Forbidden",
        status: 403,
      });
      return null;
    }

    return existingPost as unknown as Promise<PostWithCategoriesAndUserEssence>;
  } catch (error) {
    console.log(error);
    throw new NextResponse("Something went wrong!!", { status: 500 });
  } */
};
