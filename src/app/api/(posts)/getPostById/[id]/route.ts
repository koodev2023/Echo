import { auth } from "@/auth";
import prisma from "@/db/connect";
import { authorizeWithSecret } from "@/lib/authorizeWithSecret";
import { NextRequest, NextResponse } from "next/server";

// get a post by id
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const authorizationError = authorizeWithSecret(req);
  if (authorizationError) return authorizationError;

  const session = await auth();
  if (!session) return new NextResponse("Not Authenticated", { status: 401 });

  try {
    const { id } = params;
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { categories: true, user: true },
    });

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (existingPost.userEmail !== session.user!.email!) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return new NextResponse(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
