"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import GithubSlugger from "github-slugger";
import { Badge } from "../ui/badge";
import { useMutation } from "@tanstack/react-query";
import { PostWithCategoriesAndUserEssence } from "@/types/customTypes";
import { useDebouncedCallback } from "use-debounce";
import TitlePlusEditorSkeletion from "./TitlePlusEditorSkeletion";
import { PostCoverImagePicker } from "../custom/PostCoverImagePicker";
import extractImageUrls from "@/lib/extractImageUrls";
import ReactQuill from "react-quill-new";
import { waitForSeconds } from "@/lib/waitForSeconds";
import { Input } from "../ui/input";
import { replaceNonCloudinaryWithCloudinary } from "@/lib/replaceNonCloudinaryWithCloudinary";
import { getNonCloudinaryImageUrlsFromDesc } from "@/lib/getNonCloudinaryImageUrlsFromDesc";
import { handlePostMutation } from "@/lib/mutations/handlePostMutation";
import EditorNavBar from "../custom/EditorNavBar";
import { Skeleton } from "../ui/skeleton";
import { trimExcessWhitespace } from "@/lib/trimExcessHtmlWhitespace";

const MyEditor = ({
  editorType,
  userEmailName,
  postToEdit,
}: {
  editorType: "create" | "edit";
  userEmailName: string;
  postToEdit: PostWithCategoriesAndUserEssence | null;
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [latestPostId, setLatestPostId] = useState<string | null>(
    postToEdit?.id ?? ""
  );
  let initialSaveMessage: "New" | "Edit" =
    editorType === "create" ? "New" : "Edit";
  const [saveMessage, setSaveMessage] = useState<
    "New" | "Edit" | "Saving..." | "Saved"
  >(initialSaveMessage);
  const textAreaRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(null);
  const [isLoadingSavedPost, setIsLoadingSavedPost] = useState(true);
  const [isImportingEditor, setIsImportingEditor] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchPostForEditMode = async () => {
      if (editorType === "edit" && postToEdit) {
        try {
          setTitle(postToEdit.title);
          setDesc(postToEdit.desc);
          setImages(postToEdit.imgs);
          setIsPublished(postToEdit.isPublished);

          await waitForSeconds(1);
        } catch (error: any) {
          setError(error.message);
          console.error("Error using postToEdit:", error);
        } finally {
          setIsLoadingSavedPost(false);
        }
      } else {
        setIsLoadingSavedPost(false);
      }
    };

    fetchPostForEditMode();
  }, []);

  const MyReactQuill = useMemo(() => {
    const editor = dynamic(() => import("@/components/editor/MyReactQuill"), {
      ssr: true,
      loading: () => (
        <div className="flex flex-col gap-3 h-[80vh] w-full">
          <Skeleton className="w-full h-16 rounded-[10px]" />
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ),
    });

    // console.log("dynamic import done");

    setTimeout(() => {
      setIsImportingEditor(false);
    }, 500);

    return editor;
  }, []);

  const createPost = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/createPost", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          desc: trimExcessWhitespace(desc),
        }),
      });
      return response.json();
    },
  });

  const updatePost = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/savePost/${latestPostId}`, {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          desc: trimExcessWhitespace(desc),
          imgs: images,
        }),
      });
      return response.json();
    },
  });

  const publishPost = useMutation({
    mutationFn: async () => {
      const slugger = new GithubSlugger();

      const response = await fetch(`/api/publishPost/${latestPostId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title.trim(),
          desc: trimExcessWhitespace(desc),
          imgs: images,
          slug: slugger.slug(title),
        }),
      });
      return response.json();
    },
  });

  const saveNewImages = async ({
    newImageUrls,
  }: {
    newImageUrls: string[];
  }) => {
    try {
      const response = await fetch(`/api/upload-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: newImageUrls }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      // console.log("Images saved successfully:", result.data);

      return result.data;
    } catch (error) {
      console.error("Failed to save images:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  };

  const debouncedSave = useDebouncedCallback(async () => {
    // console.log("location pathname: ", window.location.pathname);

    if (typeof window === "undefined") {
      // console.log("window obj undefined.");
      return;
    }

    if (window.location.pathname === "/write") {
      let bodyIsEmtpy = desc.trim() === "<p><br></p>" || desc === "";
      let titleIsEmtpy = title.trim() === "";

      if (bodyIsEmtpy && titleIsEmtpy) {
        // console.log("Both title and body are empty, would not create a post");
        return;
      }
    }

    const nonCloudinaryImageUrls = getNonCloudinaryImageUrlsFromDesc(desc);

    const uniqueNonCloudinaryImageUrls = Array.from(
      new Set(nonCloudinaryImageUrls)
    );

    // console.log(
    //   "extracted uniqueNonCloudinaryImageUrls: ",
    //   uniqueNonCloudinaryImageUrls
    // );

    if (uniqueNonCloudinaryImageUrls.length > 0) {
      // do sth
      // console.log(
      //   "has non-cloudinary image, save them to cloud, then cancel the debounceSave."
      // );

      const results = await saveNewImages({
        newImageUrls: uniqueNonCloudinaryImageUrls,
      });

      // console.log("results: ", results);

      // update desc with saved image urls
      replaceNonCloudinaryWithCloudinary(quillRef, results);

      return;
    }

    const safeImageUrls = extractImageUrls(desc);
    const uniqueSafeImageUrls = Array.from(new Set(safeImageUrls));

    // console.log("safeImageUrls: ", safeImageUrls);
    // console.log("uniqueSafeImageUrls: ", uniqueSafeImageUrls);

    // setImages((prev) => [
    //   ...prev.filter((image) => uniqueSafeImageUrls.includes(image)),
    // ]);

    setImages((prev) => {
      // Filter existing images that are in uniqueSafeImageUrls
      const filteredImages = prev.filter((image) =>
        uniqueSafeImageUrls.includes(image)
      );
      // Add new images from uniqueSafeImageUrls that are not in filteredImages
      const newImages = uniqueSafeImageUrls.filter(
        (url) => !filteredImages.includes(url)
      );
      return [...filteredImages, ...newImages];
    });

    // console.log(
    //   "no base64 image, no need to save them to cloud, so proceed saving the post."
    // );

    setSaveMessage("Saving...");

    await new Promise((resolve) => setTimeout(resolve, 500));

    handlePostMutation(createPost, updatePost, setLatestPostId);

    // After save complete

    await new Promise((resolve) => setTimeout(resolve, 500));

    setSaveMessage("Saved");
  }, 3000);

  // ==============================================
  // START OF NO-TOUCHED CODE: AUTO RESIZE TEXTAREA
  // ==============================================

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  // ==============================================
  // END OF NO-TOUCHED CODE: AUTO RESIZE TEXTAREA
  // ==============================================

  const handleImageConfirm = async (selectedImageUrl: string) => {
    const selectedIndex = images.indexOf(selectedImageUrl);

    if (selectedIndex > -1) {
      // Use map to create a new array with the selected image at the beginning
      setImages((prev) => [
        selectedImageUrl,
        ...prev.filter((image) => image !== selectedImageUrl),
      ]);

      // console.log("selectedImageUrl: ", selectedImageUrl);
    }

    setSaveMessage("Saving...");

    await new Promise((resolve) => setTimeout(resolve, 500));

    handlePostMutation(createPost, updatePost, setLatestPostId);

    // After save complete

    await new Promise((resolve) => setTimeout(resolve, 500));

    setSaveMessage("Saved");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    (isPublished ? updatePost : publishPost).mutate(undefined, {
      onSuccess: (data) => {
        // console.log("success " + editorType, data);
        // console.log(editorType + " post ID: ", data.id);

        if (typeof window !== "undefined") {
          window.location.assign(`/@${userEmailName}/${data.slug}`);
        }

        // setIsSubmitting(false);
      },
      onError: (err) => {
        console.error(err);
        setIsSubmitting(false);
      },
    });
  };

  const handleClick = () => {
    const nonCloudinaryImageUrls = getNonCloudinaryImageUrlsFromDesc(desc);

    if (nonCloudinaryImageUrls.length > 0) {
      alert("Please wait a moment.");
      return;
    }

    // console.log(
    //   "nonCloudinaryImageUrls.length: ",
    //   nonCloudinaryImageUrls.length
    // );

    switch (saveMessage) {
      case "Saving...":
        alert("Please wait for save to complete.");
        return;

      case "New":
        alert("Please wait a few seconds OR write something for submit.");
        return;

      case "Edit":
        alert("Please wait a few seconds OR edit something for submit.");
        return;

      default:
        break;
    }

    if (title.trim() === "") {
      alert("Missing title.");
      return;
    }

    if (trimExcessWhitespace(desc) === "") {
      alert("Missing body.");
      return;
    }

    handleSubmit();
  };

  // return <TitlePlusEditorSkeletion />;

  if (error) return <div>{error}</div>;
  if (isLoadingSavedPost) return <TitlePlusEditorSkeletion />;

  return (
    <>
      <EditorNavBar>
        {/* {isPublished && (
          <Button
            onClick={() => history.back()}
            variant="ghost"
            className="whitespace-normal break-words w-auto px-1 items-center justify-center leading-tight font-normal"
          >
            Back to
            <br />
            Story
          </Button>
        )} */}

        <Button
          onClick={() => history.back()}
          variant="ghost"
          className="whitespace-normal break-words w-auto px-1 items-center justify-center leading-tight font-normal"
        >
          Go Back
        </Button>

        <PostCoverImagePicker images={images} onConfirm={handleImageConfirm} />

        <Button
          variant="ghost"
          className="whitespace-normal break-words w-auto px-1 items-center justify-center leading-tight font-normal"
          disabled={
            isImportingEditor ||
            isLoadingSavedPost ||
            error !== null ||
            isSubmitting
          }
          onClick={handleClick}
        >
          {isSubmitting ? (
            "Submitting"
          ) : isPublished ? (
            <span>
              Update
              <br />& Publish
            </span>
          ) : (
            "Publish"
          )}
        </Button>
      </EditorNavBar>

      <div className="flex flex-row w-full gap-2 items-center justify-between h-min max-h-min">
        <Input
          disabled={isImportingEditor || isLoadingSavedPost || error !== null}
          ref={textAreaRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            debouncedSave();
            resizeTextArea();
          }}
          placeholder="Title"
          className="my-textarea w-full focus-visible:ring-0 focus-visible:ring-offset-0 p-0 m-0 border-none outline-none ring-0 text-3xl"
        />
        <Badge>{saveMessage}</Badge>
      </div>

      <MyReactQuill
        quillRef={quillRef}
        onImageUploaded={(url) => setImages((prevItems) => [...prevItems, url])}
        disabled={isImportingEditor || isLoadingSavedPost || error !== null}
        onChangeDebounce={debouncedSave}
        body={desc}
        setBody={setDesc}
      />
    </>
  );
};

export default MyEditor;
