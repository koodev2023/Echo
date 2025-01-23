import {
  GetPostsResponse,
  PostWithCategoriesAndUserEssence,
} from "@/types/customTypes";
import { headers } from "next/headers";
import { cache } from "react";

export const getPosts = cache(
  async ({
    page,
    cat,
    username,
    isPublished,
  }: {
    page: number;
    cat?: string; // Optional parameter
    username?: string; // Optional parameter
    isPublished: boolean;
  }): Promise<GetPostsResponse> => {
    try {
      const url = new URL(`/api/getPosts`, process.env.NEXTAUTH_URL);

      url.searchParams.set("page", page.toString()); // Cleaner way to add params
      if (cat) url.searchParams.set("cat", cat);
      if (username) url.searchParams.set("username", username);
      url.searchParams.set("isPublished", isPublished.toString());

      const res = await fetch(url, {
        // cache: "no-store",
        headers: { "x-api-key": process.env.API_SECRET_KEY! },
      });

      if (!res.ok) {
        const errorText = await res.text();
        const errorMessage = `Failed to fetch posts: ${res.status} - ${
          errorText || res.statusText
        }`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      return res.json() as Promise<GetPostsResponse>;
    } catch (error: any) {
      if (
        error instanceof Error &&
        "digest" in error &&
        error.digest === "DYNAMIC_SERVER_USAGE"
      ) {
        throw error;
      }

      console.error("Error fetching or parsing data:", error.message);
      throw new Error("Failed to fetch or process data.");
    }
  }
);

export const getPostBySlug = cache(
  async (slug: string): Promise<PostWithCategoriesAndUserEssence | null> => {
    try {
      const postUrl = `${process.env.NEXTAUTH_URL}/api/getPosts/${slug}`;
      const viewUrl = `${process.env.NEXTAUTH_URL}/api/increasePostView/${slug}`;

      // Fetch post data and increment views concurrently
      const [postResponse, viewResponse] = await Promise.all([
        fetch(postUrl, {
          headers: { "x-api-key": process.env.API_SECRET_KEY! },
        }),
        fetch(viewUrl, {
          method: "PATCH",
          headers: { "x-api-key": process.env.API_SECRET_KEY! },
        }),
      ]);

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        const errorMessage = `Failed to fetch post: ${postResponse.status} - ${
          errorText || postResponse.statusText
        }`;
        console.error(errorMessage);

        if (postResponse.status === 404) {
          return null;
        }

        throw new Error(errorMessage);
      }

      // Check view response, but don't prevent post display if it fails
      if (!viewResponse.ok) {
        console.error(
          `Failed to increase view count: ${
            viewResponse.status
          } - ${await viewResponse.text()}`
        );
      }

      return postResponse.json() as Promise<PostWithCategoriesAndUserEssence>;
    } catch (error: any) {
      if (
        error instanceof Error &&
        "digest" in error &&
        error.digest === "DYNAMIC_SERVER_USAGE"
      ) {
        throw error;
      }

      console.error("Error fetching or parsing post data:", error.message);
      throw new Error("Failed to fetch or process post data.");
    }
  }
);

// http://localhost:3000/posts/679103e067b30f7f11dd4145/edit

// get a post by id
export const getPostById = cache(
  async (id: string): Promise<PostWithCategoriesAndUserEssence | null> => {
    try {
      const url = new URL(`/api/getPostById/${id}`, process.env.NEXTAUTH_URL);

      const myHeaders = new Headers(headers());
      myHeaders.append("x-api-key", process.env.API_SECRET_KEY!);

      const res = await fetch(url, {
        method: "GET",
        // cache: "no-store",
        headers: myHeaders,
        // headers: { "x-api-key": process.env.API_SECRET_KEY! },
      });

      if (!res.ok) {
        const errorText = await res.text();
        const errorMessage = `Failed to fetch post: ${res.status} - ${
          errorText || res.statusText
        }`;
        console.error(errorMessage);

        if (res.status === 404) {
          console.warn("Post not found.");
          return null;
        }

        throw new Error(errorMessage);
      }

      return res.json() as Promise<PostWithCategoriesAndUserEssence>;
    } catch (error: any) {
      if (
        error instanceof Error &&
        "digest" in error &&
        error.digest === "DYNAMIC_SERVER_USAGE"
      ) {
        throw error;
      }

      console.error("Error fetching or parsing post data:", error.message);
      throw new Error("Failed to fetch or process post data.");
    }
  }
);
