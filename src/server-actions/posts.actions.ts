"use server";

import prisma from "@/lib/db/connect";
import { PostWithCategoriesAndUserEssence } from "@/types/customTypes";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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

export const incrementPostView = async (slug: string): Promise<void> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        views: { increment: 1 },
      },
    });

    if (!updatedPost) {
      console.error("Post not found for view increment");
      throw new NextResponse("Post not found", { status: 404 });
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error("Post not found for view increment");
      throw new NextResponse("Post not found", { status: 404 });
    } else {
      console.error("Error incrementing post views:", error);
      throw new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
