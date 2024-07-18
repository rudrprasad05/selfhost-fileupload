"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue } from "react-hook-form";
import { toast } from "sonner";

import { BucketType } from "@/types";
import { Image } from "lucide-react";

const SetLinkImage = ({ bucket }: { bucket: BucketType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>();
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    setImageUpload(true);
    if (!file) return;

    try {
      let data = new FormData();
      data.append("file", file, "image" + salt.toString());

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setImageUpload(false);
          setImageUrl((prev) => [
            ...prev,
            `https://mctechfiji.s3.amazonaws.com/alibaba/${
              "image" + salt.toString()
            }`,
          ]);
          setIsImageInCloud(true);
          toast.success("Image Uploaded to Cloud");
        })
        .catch((e) => {
          toast("Something went wrong", { description: "Contact site admin" });
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  function onSubmit(data: BucketType) {}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image className="hover:text-primary transition " />
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>Add Preview Image</DialogTitle>
        </DialogHeader>
        <label
          htmlFor="file"
          className="group border-2 border-dashed border-primary hover:text-blue-500 hover:border-blue-500 rounded-lg h-[200px] grid place-items-center"
        >
          <div className="flex flex-col items-center">
            <Image size={40} className="stroke-1 group-hover:text-blue-500" />
            Click to Select an Image
          </div>
        </label>
        <input type="file" id="file" name="file" hidden />
      </DialogContent>
    </Dialog>
  );
};

export default SetLinkImage;
