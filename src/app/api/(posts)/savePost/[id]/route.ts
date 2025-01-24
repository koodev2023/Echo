import prisma from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();
  if (!session) return new NextResponse("Not Authenticated", { status: 401 });

  try {
    const body = await req.json();
    const postId = params.id;

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (existingPost.userEmail !== session.user!.email!)
      return new NextResponse("Unauthorized", { status: 403 });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { ...body },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
