import prisma from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const postId = params.id;

    const deletePost = await prisma.post.delete({
      // Assuming your Prisma model is named 'post'
      where: {
        id: postId,
        userEmail: session.user.email!, // Use session.user.email
        user: {
          id: session.user.id,
        },
      },
    });

    if (!deletePost) {
      return new NextResponse(
        "Post not found or you don't have permission to delete it.",
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content is standard for successful DELETE
  } catch (error: any) {
    // Type the error for better debugging
    console.error("Error deleting post:", error);
    return new NextResponse("Error deleting post", { status: 500 }); // Don't expose detailed error messages in production
  }
};
