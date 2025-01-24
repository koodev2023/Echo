import prisma from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// create a new post
export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) return new NextResponse("Not Authenticated", { status: 401 });

  try {
    const body = await req.json();

    console.log("body:", body);

    // Handle new post creation
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user!.email!,
      },
    });
    return new NextResponse(JSON.stringify(newPost), {
      status: 201,
    }); // Return 201: Created
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
