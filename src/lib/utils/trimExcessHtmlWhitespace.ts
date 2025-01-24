function trimExcessWhitespace(
  html: string | null | undefined
): string | null | undefined {
  if (!html) {
    return html;
  }

  // 1. Remove leading/trailing whitespace and multiple spaces within tags
  html = html.replace(/\s*</g, "<").replace(/>\s*/g, ">").trim();

  // 2. Remove empty <p> tags (including those with only <br>)
  html = html.replace(/<p>(<br\s*\/?>)?<\/p>/g, "");

  // 3. Remove multiple consecutive <br> tags within other tags (like divs)
  html = html.replace(/(<br\s*\/?>){2,}/g, "<br/>");

  // 4. Remove whitespace between tags.
  html = html.replace(/>\s+</g, "><");

  return html;
}

export { trimExcessWhitespace };
