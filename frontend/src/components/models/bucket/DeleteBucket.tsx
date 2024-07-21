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
import { DeleteBucketFromDB } from "@/actions/Buckets";

const DeleteBucket = ({ bucket }: { bucket: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleClick() {
    const res = await axios.delete(`http://localhost:3000/api/buckets`);
    // .then((r) => {
    //   toast.success("App Deleted");
    // })
    // .catch((e) => {
    //   toast.error("An error occured");
    //   console.log(e);
    // })
  }

  async function onSubmit(data: BucketType) {
    await DeleteBucketFromDB(parseInt(bucket))
      .then((r) => {
        toast.success("App Deleted");
      })
      .catch((e) => {
        toast.error("An error occured");
        console.log(e);
      })
      .finally(() => setOpen(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${buttonVariants({
            variant: "destructive",
          })} flex flex-row gap-2`}
        >
          <Trash />
          Delete App
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>Delete App</DialogTitle>
          <DialogDescription>
            Warning, this action cant be undone
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button onClick={handleClick} variant={"destructive"}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBucket;
