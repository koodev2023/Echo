import StoriesNavBar from "@/components/stories/StoriesNavBar";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col justify-start gap-3.5 sm:gap-8 sm:mt-5">
      <StoriesNavBar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
