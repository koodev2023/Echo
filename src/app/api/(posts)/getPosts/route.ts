import { POST_PER_PAGE } from "@/constants/postConfig";
import prisma from "@/lib/db/connect";
import { authorizeWithSecret } from "@/lib/utils/authorizeWithSecret";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// get posts with pagination
export const GET = async (req: NextRequest) => {
  const authorizationError = authorizeWithSecret(req);
  if (authorizationError) return authorizationError;

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1"); // Default to page 1 if not provided
  const cat = searchParams.get("cat") || undefined; // Simplify cat retrieval
  const username = searchParams.get("username");
  const isPublished =
    searchParams.get("isPublished") === "true"
      ? true
      : searchParams.get("isPublished") === "false"
      ? false
      : true;

  const where: Prisma.PostWhereInput = { isPublished };

  if (cat) where.categories = { some: { slug: cat } };
  if (username) where.user = { username };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: (page - 1) * POST_PER_PAGE,
        where, // Use the simplified where clause
        include: {
          _count: { select: { comments: true } },
          categories: true,
          user: {
            select: { name: true, image: true, username: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({ posts, count }); // Simplified response
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
