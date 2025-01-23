import { redirect } from "next/navigation";

const page = async () => {
  //   const session = await auth();

  // if (!session) redirect("/login");

  redirect("/me/stories/drafts");
};

export default page;
