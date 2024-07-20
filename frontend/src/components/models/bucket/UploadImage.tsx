"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue } from "react-hook-form";
import { toast } from "sonner";

import { BucketType } from "@/types";
import { Trash, Upload } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { headers } from "next/headers";

const UploadImage = ({ bucket }: { bucket: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>();
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setImageUpload(true);

    const formData = new FormData();
    formData.append("file", file);

    const headers = {
      token: "token",
      bucket: "test",
    };

    try {
      await axios
        .post("http://localhost:3000/api/upload", formData, { headers })
        .then((res) => {
          toast.success("Image uploaded");
          router.refresh();
          setOpen(false);
        });
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  function onSubmit(data: BucketType) {}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${buttonVariants({
            variant: "default",
          })} flex flex-row gap-2`}
        >
          <Upload />
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Drag and drop or click</DialogDescription>
        </DialogHeader>
        <Input onChange={(e) => setFile(e.target?.files[0])} type="file" />
        <Button onClick={() => handleImageUpload(file)}></Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
