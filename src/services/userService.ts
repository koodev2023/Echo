import { cache } from "react";

export const getNameByUsername = cache(
  async ({ username }: { username: string }): Promise<string | null> => {
    try {
      console.log("getNameByUsername called once");

      let url = `${process.env.NEXTAUTH_URL}/api/getNameByUsername?username=${username}`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "x-api-key": process.env.API_SECRET_KEY! },
      });

      if (!res.ok) {
        // More informative error handling
        const errorText = await res.text(); // Try to get error message from server
        console.error(
          `API Error: ${res.status} - ${res.statusText}`,
          errorText
        );
        throw new Error(
          `Failed to fetch name: ${res.status} - ${
            errorText || "No details provided"
          }`
        );
      }

      const name: string = await res.json(); // Explicitly type the parsed data
      return name;
    } catch (error: any) {
      if (
        error instanceof Error &&
        "digest" in error &&
        error.digest === "DYNAMIC_SERVER_USAGE"
      ) {
        throw error;
      }

      // Handle JSON parsing errors or network issues
      console.error("Error fetching or parsing name:", error);
      return null;
    }
  }
);
