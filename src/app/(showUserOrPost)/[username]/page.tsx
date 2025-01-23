import CardList from "@/components/custom/CardList";
import CardListLoading from "@/components/loading/CardListLoading";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const page = ({ params }: { params: { username: string } }) => {
  console.log("logging at app Home page tsx");
  console.log("params.username", params.username);

  const decodedUsername = decodeURIComponent(params.username);
  if (!decodedUsername.startsWith("@")) {
    notFound();
  }

  const username = decodedUsername.substring(1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-col gap-y-8">
        <Suspense fallback={<CardListLoading />}>
          <CardList
            username={username}
            type="PROFILE"
            // cat={undefined}
            page={1}
            mode="PUBLIC"
          />
        </Suspense>

        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default page;
