"use client";

import { CldUploadWidget } from "next-cloudinary";
import React, { useImperativeHandle, forwardRef, useRef } from "react";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const ImageUploader = forwardRef(
  ({ onUploadSuccess }: ImageUploaderProps, ref) => {
    const uploadWidgetRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (uploadWidgetRef.current) {
          uploadWidgetRef.current();
        }
      },
    }));

    return (
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          singleUploadAutoClose: true,
          maxFiles: 1,
          sources: [
            "camera",
            "dropbox",
            "facebook",
            // "gettyimages",
            "google_drive",
            "image_search",
            "instagram",
            // "istock",
            "local",
            // "shutterstock",
            "unsplash",
            "url",
          ],
        }}
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            // console.log("Uploaded result:", result);
            // console.log("Uploaded image:", result.info.secure_url);
            onUploadSuccess(result.info.secure_url);
          }
        }}
      >
        {({ open }) => {
          uploadWidgetRef.current = open; // Store the open function in the ref
          return <></>;
        }}
      </CldUploadWidget>
    );
  }
);

export default ImageUploader;
