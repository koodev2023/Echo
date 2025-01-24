import prisma from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { authorizeWithSecret } from "@/lib/utils/authorizeWithSecret";

// get a post by slug
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const authorizationError = authorizeWithSecret(req);
  if (authorizationError) return authorizationError;

  const slug = params.slug;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { categories: true, user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new NextResponse("Post not found", { status: 404 });
    }
    console.error(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
