"use server";

import prisma from "@/lib/db/connect";
import { NextResponse } from "next/server";

export async function checkAndUpdateUsername(id: string) {
  //   const session = await auth();

  // if (!session) {
  //   console.log("no session found");
  //   return;
  // }

  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) return new NextResponse("User not found", { status: 404 });
  // if (existingUser.email !== session.user!.email!)
  //   return new NextResponse("Unauthorized", { status: 403 });

  console.log("existingUser found: ", existingUser);
  console.log("proceed to update username");

  const localPart = existingUser.email.split("@")[0];

  let username = localPart;
  let usernameExists = true;
  let counter = 1;

  while (usernameExists) {
    usernameExists =
      (await prisma.user.findUnique({ where: { username } })) !== null;
    if (usernameExists) {
      username = `${localPart}${counter}`;
      counter++;
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { username: username },
  });

  console.log("updatedUser: ", updatedUser);

  return updatedUser;
}
