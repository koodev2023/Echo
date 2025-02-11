"use client";

import PostFooterCategory from "./PostFooterCategory";
import DOMPurify from "isomorphic-dompurify";
import usePostViewIncrement from "@/lib/hooks/userPostViewIncrement";

const PostBody = ({
  slug,
  desc,
  categories,
}: {
  slug: string;
  desc: string;
  categories: string[];
}) => {
  usePostViewIncrement(slug);

  console.log("desc", desc);

  const cleanedDesc = DOMPurify.sanitize(desc, {
    ADD_TAGS: ["iframe", "img", "a"],
    ADD_ATTR: [
      "src",
      "frameborder",
      "allowfullscreen",
      "class",
      "style",
      "href",
      "target",
      "rel",
    ],
    ALLOWED_ATTR: ["data-list"],
    FORBID_TAGS: ["script"],
    KEEP_CONTENT: true,
  });

  console.log("cleanedDesc:", cleanedDesc);

  return (
    <>
      <div className="ql-editor">
        <div
          className="flex flex-col min-h-40 break-words"
          dangerouslySetInnerHTML={{ __html: cleanedDesc }}
        />
      </div>

      <PostFooterCategory categories={categories} />
    </>
  );
};

export default PostBody;
