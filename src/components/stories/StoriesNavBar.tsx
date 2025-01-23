"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const StoriesNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="max-sm:text-3xl text-5xl font-medium">Your stories</h1>
        <Button
          onClick={() => router.push("/write")}
          className="max-sm:px-2 max-sm:py-1.5 max-sm:h-min"
        >
          Write a story
        </Button>
      </div>

      <Tabs
        value={pathname === "/me/stories/drafts" ? "drafts" : "published"}
        className="sm:w-[400px] w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            onClick={() => router.push("/me/stories/drafts")}
            value="drafts"
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push("/me/stories/published")}
            value="published"
          >
            Published
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default StoriesNavBar;
