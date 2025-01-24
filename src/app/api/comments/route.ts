import prisma from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { authorizeWithSecret } from "@/lib/utils/authorizeWithSecret";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  if (!postSlug) {
    const authorizationError = authorizeWithSecret(req);
    if (authorizationError) return authorizationError;
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { ...(postSlug && { postSlug }) },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session) {
    return new NextResponse("Not Authenticated", { status: 401 });
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user!.email,
      },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
