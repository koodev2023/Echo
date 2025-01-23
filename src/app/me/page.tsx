import { redirect } from "next/navigation";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  redirect(`/@${session.user.username}`);
};

export default page;
