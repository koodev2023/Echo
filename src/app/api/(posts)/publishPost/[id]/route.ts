import { auth } from "@/auth";
import prisma from "@/db/connect";
import { generateUniqueSlug } from "@/lib/slugService";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// publish a post
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();
  if (!session) return new NextResponse("Not Authenticated", { status: 401 });

  try {
    const body = await req.json();
    const { id } = params;

    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost)
      return new NextResponse("Post not found", { status: 404 });
    if (existingPost.userEmail !== session.user!.email!)
      return new NextResponse("Unauthorized", { status: 403 });

    const baseSlug = body.title;
    const slug = await generateUniqueSlug(baseSlug);
    const post: Post = await prisma.post.update({
      where: { id },
      data: {
        ...body,
        slug,
        isPublished: true,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
