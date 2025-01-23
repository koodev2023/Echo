import { getPostBySlug } from "@/services/postService";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const alt = "Echo Blog";
export const size = {
  width: 1200,
  height: 628,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) return new NextResponse("Post not found.", { status: 404 });

  console.log("OG image tsx got the post");

  // const background =
  //   post.imgs && post.imgs.length > 0
  //     ? `url(${post.imgs[0]}) no-repeat center`
  //     : "white";

  const defaultImageUrl = `${process.env.NEXTAUTH_URL}/opengraph-image.png`; // Full URL

  const backgroundImage =
    post.imgs && post.imgs.length > 0 && post.imgs[0]
      ? post.imgs[0]
      : defaultImageUrl;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          backgroundImage: `url(${backgroundImage})`, // Use backgroundImage variable
          backgroundSize: "cover",
          backgroundColor:
            post.imgs && post.imgs.length > 0 && post.imgs[0]
              ? "transparent"
              : "rgba(0, 0, 0, 0.5)", // Dimmed effect for default image
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black", // Sharp black text
          // textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          textShadow: "2px 2px 4px rgba(255,255,255,0.7)", // White text shadow for better contrast on dark backgrounds.
        }}
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
