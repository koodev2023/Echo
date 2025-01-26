import Comments from "@/components/custom/Comments";
import PostBanner from "@/components/custom/PostBanner";
import PostBody from "@/components/custom/PostBody";
import formatDate from "@/lib/utils/date";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import jsdom from "jsdom";
import { getPostBySlug, getPosts } from "@/services/postService";

const SEO_KEYWORDS = [
  "tech",
  "blog",
  "solution",
  "tutorial",
  "guide",
  "tips",
  "tricks",
  "best practices",
  "latest trends",
];

// export async function generateStaticParams() {
//   const response = await getPosts({ isPublished: true });

//   // Generate paths for each post
//   return response.posts.map((post) => ({
//     username: post.user.username.toString(),
//     slug: post.slug!.toString(),
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { JSDOM } = jsdom;
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  // console.log("generateMetadata got the post");

  if (!post) return {};

  const cleanedDesc = DOMPurify.sanitize(post.desc);
  const { window } = new JSDOM();
  const tempElement = window.document.createElement("div");
  tempElement.innerHTML = cleanedDesc;
  const textContent = tempElement.textContent || tempElement.innerText || "";
  const maxChars = 200;
  const minChars = 55;
  let description = textContent.slice(0, maxChars);
  if (description.length < minChars) {
    const additionalKeywords = SEO_KEYWORDS.join(" ");
    description = (textContent + " " + additionalKeywords).slice(0, maxChars);
  }
  if (description.length > maxChars) {
    description = description.slice(0, maxChars) + "...";
  }

  // Ensure title length is between 30-60 characters, with a maximum of 90 characters
  let title = post.title;
  if (title.length < 30) {
    title = title.padEnd(30, " ");
  } else if (title.length > 60) {
    title = title.slice(0, 60);
  }

  return {
    title: title,
    description: description,
    ...(post.imgs.length > 0 && {
      openGraph: { images: [{ url: post.imgs[0] }] },
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) {
  const { slug, username } = await params;
  const decodedUsername = decodeURIComponent(username);

  // const post = await getPostBySlug(slug);

  const timeout = new Promise((resolve) => setTimeout(resolve, 500));
  const post = await Promise.all([getPostBySlug(slug), timeout]).then(
    (values) => values[0]
  );

  if (!post) notFound();

  // console.log("post.user.username?", post.user.username);

  if (
    !decodedUsername.startsWith("@") ||
    decodedUsername.substring(1) !== post.user.username
  ) {
    const updatedPath = `/@${post.user.username}/${slug}`;
    redirect(updatedPath);
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-5 md:gap-8 w-full">
      <PostBanner
        date={formatDate({ dateInput: post.createdAt, fullText: true })}
        title={post.title}
        userImageUrl={post.user.image ?? ""}
        username={post.user.name ?? ""}
      />

      <div className="flex flex-col gap-1 sm:gap-3">
        <div className="whitespace-pre-line flex flex-col gap-3">
          <PostBody
            slug={slug}
            desc={post.desc}
            categories={post.categories.map((c) => c.title)}
          />

          <Comments postSlug={slug} />
        </div>
      </div>
    </div>
  );
}
