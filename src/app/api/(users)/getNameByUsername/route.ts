import { auth } from "@/auth";

import prisma from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";

// get name by username
export const GET = async (req: NextRequest) => {
  console.log("getNameByUsername ROUTE.TS called once");

  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username");
  if (!username)
    return new NextResponse("Username field is missing.", { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { name: true },
    });
    if (!user) throw new NextResponse("User not found", { status: 404 });

    return new NextResponse(JSON.stringify(user.name), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!!", { status: 500 });
  }
};
