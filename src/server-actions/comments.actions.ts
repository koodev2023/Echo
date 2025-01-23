"use server";

import prisma from "@/db/connect";
import { CommentWithUser } from "@/types/customTypes";
import { NextResponse } from "next/server";

// export const getCommentsBySlugServerAction = async (
//   postSlug: string
// ): Promise<CommentWithUser[] | null> => {
//   try {
//     const comments = await prisma.comment.findMany({
//       where: { ...(postSlug && { postSlug }) },
//       include: { user: true },
//       orderBy: { createdAt: "desc" },
//     });

//     return comments as unknown as Promise<CommentWithUser[]>;
//   } catch (error) {
//     console.log(error);
//     throw new NextResponse("Something went wrong!!", { status: 500 });
//   }
// };
