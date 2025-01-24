import sanitizeHtml from "sanitize-html";

// Function to convert HTML to plain text while preserving newlines
export default function getPlainTextWithNewlines(
  desc: string,
  charCount: number
) {
  // Replace specific tags with newlines
  let modifiedHtml = desc
    .replace(/<p>/g, "\n") // Replace <p> with newline
    .replace(/<\/p>/g, "\n") // Replace </p> with newline
    .replace(/<br\s*\/?>/g, "\n") // Replace <br> with newline
    .replace(/<h[1-6]>/g, "\n") // Replace headings with newline
    .replace(/<\/h[1-6]>/g, "\n") // Replace closing headings with newline
    .replace(/<blockquote>/g, "\n") // Replace <blockquote> with newline
    .replace(/<\/blockquote>/g, "\n") // Replace closing blockquote with newline
    .replace(/<ul>/g, "\n") // Replace <ul> with newline
    .replace(/<\/ul>/g, "\n") // Replace closing <ul> with newline
    .replace(/<ol>/g, "\n") // Replace <ol> with newline
    .replace(/<\/ol>/g, "\n") // Replace closing <ol> with newline
    .replace(/<li>/g, "\n• ") // Replace <li> with bullet point and newline
    .replace(/<\/li>/g, "\n") // Replace closing <li> with newline
    .replace(/<section>/g, "\n") // Replace <section> with newline
    .replace(/<\/section>/g, "\n") // Replace closing <section> with newline
    .replace(/<article>/g, "\n") // Replace <article> with newline
    .replace(/<\/article>/g, "\n") // Replace closing <article> with newline
    .replace(/<div>/g, "\n") // Replace <div> with newline
    .replace(/<\/div>/g, "\n"); // Replace closing <div> with newline

  // Sanitize the modified HTML, removing all tags
  const cleanedHtml = sanitizeHtml(modifiedHtml, {
    allowedTags: [], // Disallow all tags
    allowedAttributes: {}, // Disallow attributes
  });

  // Clean up whitespace and trim
  const plainText = cleanedHtml.replace(/\s+/g, " ").trim();

  if (plainText.length > charCount) {
    // If the plain text exceeds the specified character limit, truncate it
    return plainText.substring(0, charCount) + "...";
  }

  return plainText;
}
