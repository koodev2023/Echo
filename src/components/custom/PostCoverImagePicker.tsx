import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import Image from "next/image";

export function PostCoverImagePicker({
  images,
  onConfirm,
}: {
  images: string[];
  onConfirm: (image: string) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    images.length > 0 ? images[0] : null
  );

  const handleImageSelect = (image: string) => setSelectedImage(image);

  const handleConfirm = () => selectedImage && onConfirm(selectedImage);

  const buttonTitle = (
    <span>
      Choose
      <br />
      Cover
    </span>
  );
  const title = "Select a Cover Image";
  const description =
    "Tip: Include a high-quality image in your story to grab people's attention.";

  const imagesList = (
    <>
      {images.map((image, index) => (
        <div
          key={index}
          className="w-auto h-auto aspect-square rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleImageSelect(image)}
        >
          <Image
            src={image}
            alt="Cover Image"
            width={500}
            height={500}
            loading="lazy"
            className={`w-full h-full object-cover rounded-xl border-[3px] p-1 ${
              selectedImage === image
                ? "border-blue-700"
                : "border-transparent hover:border-blue-300"
            }`}
          />
        </div>
      ))}
    </>
  );

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="hidden md:block px-1 whitespace-normal break-words w-auto text-center leading-tight font-normal"
            size="icon"
          >
            {buttonTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col min-h-[30%] w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {imagesList}
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center h-full">
              No images found
            </div>
          )}
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button variant="default" onClick={handleConfirm}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden px-1 whitespace-normal break-words w-auto text-center leading-tight font-normal"
          >
            {buttonTitle}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-[30%] w-full">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {images.length > 0 ? (
            <div className="px-5 py-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {imagesList}
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center h-full">
              No images found
            </div>
          )}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="default" onClick={handleConfirm}>
                Confirm
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
