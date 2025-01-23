import extractImageUrls from "./extractImageUrls";

export function getNonCloudinaryImageUrlsFromDesc(desc: string) {
  const extractedImageUrls = extractImageUrls(desc);

  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/dxzh9xfsu/image/upload/";

  const nonCloudinaryImageUrls = extractedImageUrls.filter((url) => {
    return !url.startsWith(cloudinaryBaseUrl);
  });

  return nonCloudinaryImageUrls;
}
