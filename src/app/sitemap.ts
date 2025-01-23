import { getPosts } from "@/services/postService";
import { GetPostsResponse } from "@/types/customTypes";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts }: GetPostsResponse = await getPosts({
    page: 1,
    isPublished: true,
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.NEXTAUTH_URL}/${post.user.username}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  return [{ url: `${process.env.NEXTAUTH_URL}/` }, ...postEntries];
}
