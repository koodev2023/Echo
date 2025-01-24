export default function extractImageUrls(desc: string): string[] {
  const imageUrls: string[] = [];

  // Use a regular expression to find img tags with src attributes
  const imgTagRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/g;
  let match;

  while ((match = imgTagRegex.exec(desc)) !== null) {
    // Check if the matched string contains HTML entities
    if (!match[0].includes("&lt;") && !match[0].includes("&gt;")) {
      imageUrls.push(match[1]);
    }
  }

  return imageUrls;
}
