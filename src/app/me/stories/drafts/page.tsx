import { auth } from "@/auth";
import CardList from "@/components/custom/CardList";
import CardListLoading from "@/components/loading/CardListLoading";
import React, { Suspense } from "react";

const DraftsPage = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
    cat: string;
  };
}) => {
  const session = await auth();
  const page = parseInt(searchParams.page) || 1;

  return (
    <Suspense fallback={<CardListLoading />}>
      <CardList
        mode="DASHBOARD"
        username={session?.user.username ?? ""}
        type="STORIES_DRAFTS"
        // cat={undefined}
        page={page}
      />
    </Suspense>
  );
};

export default DraftsPage;
