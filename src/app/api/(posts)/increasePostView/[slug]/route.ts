import prisma from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { authorizeWithSecret } from "@/lib/authorizeWithSecret";

// increase post view count by slug
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const authorizationError = authorizeWithSecret(req);
  if (authorizationError) return authorizationError;

  const slug = params.slug;

  try {
    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.log("viewcount error", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
