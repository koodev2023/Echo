import { NonCloudinaryStringAndCloudinaryUrlPair } from "@/types/customInterfaces";
import { escapeRegExp } from "./escapeRegExp";
import ReactQuill from "react-quill-new";

export function replaceNonCloudinaryWithCloudinary(
  quillRef: React.MutableRefObject<ReactQuill | null>, // Accept quillRef
  pairs: NonCloudinaryStringAndCloudinaryUrlPair[]
) {
  if (!quillRef.current) {
    console.warn("Quill editor not initialized yet.");
    return;
  }

  const quill = quillRef.current.editor!;
  const editorContainer = quill.container; // Get the editor's container element

  pairs.forEach(({ nonCloudinaryString, cloudinaryUrl }) => {
    const escapedNonCloudinaryString = escapeRegExp(nonCloudinaryString);
    const nonCloudinaryRegex = new RegExp(escapedNonCloudinaryString, "g");

    // Find img elements with matching src
    const imgElements = Array.from(editorContainer.querySelectorAll("img"));
    imgElements.forEach((img) => {
      if (img.src && nonCloudinaryRegex.test(img.src)) {
        img.src = cloudinaryUrl; // Update the src attribute with the cloudinary URL
      }
    });
  });
}
