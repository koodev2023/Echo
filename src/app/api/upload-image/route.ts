import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { NonCloudinaryStringAndCloudinaryUrlPair } from "@/types/customInterfaces";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) return new NextResponse("Not Authenticated", { status: 401 });

  const body = await req.json();
  const { images } = body;

  // console.log("Received images:", images);

  if (!images || !Array.isArray(images)) {
    return NextResponse.json({ msg: "Invalid input" }, { status: 400 });
  }

  try {
    const uploadPromises = images.map(
      (image: string): Promise<NonCloudinaryStringAndCloudinaryUrlPair> =>
        cloudinary.uploader.upload(image).then((result) => ({
          nonCloudinaryString: image,
          cloudinaryUrl: result.secure_url,
        }))
    );

    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json(
      { msg: "Images uploaded successfully", data: uploadResults },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { msg: "Failed to upload images", error: error.message },
      { status: 500 }
    );
  }
};
