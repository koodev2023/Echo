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

  // console.log("desc", desc);

  const createDomainRegex = (domains: any[], path = "") => {
    const escapedDomains = domains.map((domain) => domain.replace(".", "\\."));
    const domainPattern = escapedDomains.join("|");
    return new RegExp(`^(https?:)?//(${domainPattern})/${path}`, "i");
  };

  const iframeSrcPattern = createDomainRegex(
    ["www.youtube.com", "youtube.com"],
    "embed/"
  );
  const imageSrcPattern = createDomainRegex(["res.cloudinary.com"]);

  const combinedPattern = new RegExp(
    `${iframeSrcPattern.source}|${imageSrcPattern.source}`,
    "i"
  );

  const cleanedDesc = DOMPurify.sanitize(desc, {
    ADD_TAGS: ["iframe", "img"],
    ADD_ATTR: ["src", "frameborder", "allowfullscreen", "class", "style"],
    ALLOWED_ATTR: ["data-list"],
    FORBID_TAGS: ["script"],
    FORCE_BODY: true,
    ALLOWED_URI_REGEXP: combinedPattern,
    KEEP_CONTENT: true,
  });

  // console.log("cleanedDesc:", cleanedDesc);

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
