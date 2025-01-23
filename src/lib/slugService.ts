import GithubSlugger from "github-slugger";
import { customAlphabet } from "nanoid";

export async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const slugger = new GithubSlugger();
  let slug = slugger.slug(baseSlug);
  const alphabet = "0123456789ABCDEFGHIJKLMNOPRSTUVWXYZabcdefhiklmnorstuvwxz";
  const nanoid = customAlphabet(alphabet, 12);
  const uniqueId = nanoid();
  return `${slug}-${uniqueId}`;
}

// export async function generateUniqueSlug(baseSlug: string): Promise<string> {
//   const slugger = new GithubSlugger();
//   let slug = slugger.slug(baseSlug);
//   let counter = 1;

//   try {
//     await prisma.$transaction(async (tx) => {
//       // Find an existing slug counter document or create one if it doesn't exist
//       let slugCounter = await tx.slugCounter.upsert({
//         where: { baseSlug },
//         update: { count: { increment: 1 } }, // Increment the counter atomically
//         create: { baseSlug, count: 1 },
//       });

//       // If the counter is greater than 1, append it to the slug
//       if (slugCounter.count > 1) {
//         slug = `${slug}-${slugCounter.count - 1}`; // Use the previous count
//       }

//       // Check if a post with this final slug already exists (edge case)
//       while (await tx.post.findUnique({ where: { slug } })) {
//         slug = `${slug}-${counter}`;
//         counter++;
//       }
//     });
//   } catch (error) {
//     console.error("Error generating slug:", error);
//     // Handle the error appropriately (e.g., throw it or return a default slug)
//     return "error-generating-slug"; // Example fallback
//   }

//   return slug;
// }
