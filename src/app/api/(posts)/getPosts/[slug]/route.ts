import prisma from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { authorizeWithSecret } from "@/lib/authorizeWithSecret";
import { revalidatePath } from "next/cache";

// get a post by slug
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const authorizationError = authorizeWithSecret(req);
  if (authorizationError) return authorizationError;

  const slug = params.slug;

  revalidatePath(`/@username/${slug}`);

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
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
