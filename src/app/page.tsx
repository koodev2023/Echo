import { auth } from "@/auth";
import CardList from "@/components/custom/CardList";
import Menu from "@/components/custom/Menu";
import CardListLoading from "@/components/loading/CardListLoading";
import { Suspense } from "react";
// import Featured from "@/components/custom/Featured";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: string;
    cat: string;
  };
}) {
  const session = await auth();

  const page = parseInt(searchParams.page) || 1;

  return (
    <div className="flex flex-row gap-3 sm:gap-5">
      <div className="flex flex-col gap-8 w-full">
        {/* <Featured /> */}
        {/* <CategoryList /> */}

        <div className="flex flex-col gap-1 sm:gap-3">
          <p className="max-sm:text-3xl text-5xl font-medium">
            Welcome {session?.user.name}!
          </p>

          <Suspense fallback={<CardListLoading />}>
            <CardList
              mode="PUBLIC"
              type="HOME"
              cat={searchParams.cat}
              page={page}
            />
          </Suspense>
        </div>
      </div>

      {/* <div className="max-sm:hidden h-min sticky top-0">
        <Menu />
      </div> */}
    </div>
  );
}
