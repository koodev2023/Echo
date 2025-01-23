import { auth } from "@/auth";
import CardList from "@/components/custom/CardList";
import CardListLoading from "@/components/loading/CardListLoading";
import React, { Suspense } from "react";

const DraftsPage = async () => {
  const session = await auth();

  return (
    <Suspense fallback={<CardListLoading />}>
      <CardList
        mode="DASHBOARD"
        username={session?.user.username ?? ""}
        type="STORIES_DRAFTS"
        // cat={undefined}
        page={1}
      />
    </Suspense>
  );
};

export default DraftsPage;
