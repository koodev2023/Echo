import { incrementPostView } from "@/server-actions/posts.actions";
import { useState, useEffect } from "react";

const usePostViewIncrement = (slug: string) => {
  const [hasViewed, setHasViewed] = useState(false);

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
          setHasViewed(true);
          return;
        }

        const timeoutId = setTimeout(async () => {
          try {
            await incrementPostView(slug);
            viewedPosts[slug] = true;
            localStorage.setItem("viewedPosts", JSON.stringify(viewedPosts));
            setHasViewed(true);
          } catch (error) {
            console.error("Error incrementing views:", error);
          }
        }, 1000);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error in view increment logic:", error);
      }
    };

    if (!hasViewed) {
      incrementViews();
    }
  }, [slug, hasViewed]);

  return hasViewed;
};

export default usePostViewIncrement;
