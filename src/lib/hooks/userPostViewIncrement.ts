import { incrementPostView } from "@/server-actions/posts.actions";
import { useEffect } from "react";

const usePostViewIncrement = (slug: string) => {
  useEffect(() => {
    if (!slug) {
      return;
    }

    const incrementViews = async () => {
      try {
        const viewedPosts = JSON.parse(
          localStorage.getItem("viewedPosts") || "{}"
        );

        if (viewedPosts[slug]) {
          console.log("Already viewed this post.");
          return;
        }

        const timeoutId = setTimeout(async () => {
          try {
            await incrementPostView(slug);
            viewedPosts[slug] = true;
            localStorage.setItem("viewedPosts", JSON.stringify(viewedPosts));
          } catch (error) {
            console.error("Error incrementing views:", error);
          }
        }, 1000);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error in view increment logic:", error);
      }
    };

    incrementViews();
  }, [slug]);
};

export default usePostViewIncrement;
