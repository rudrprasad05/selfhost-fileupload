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
import { FieldValue, useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export const NewBucketFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must contain more than 2 characters" })
    .max(32, { message: "Nae must have less than 32 characters" }),
});

export type NewBucketFormType = z.infer<typeof NewBucketFormSchema>;

export const NewBucketModal = () => {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>();
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const form = useForm<NewBucketFormType>({
    resolver: zodResolver(NewBucketFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    setImageUpload(true);
    if (!file) return;

    try {
    } catch (e: any) {
      console.error(e);
    }
  };

  function onSubmit(data: NewBucketFormType) {
    try {
      axios
        .post("http://127.0.0.1:3000/api/buckets", {
          name: data.name,
          userId: 1,
        })
        .then(() => {
          toast.success("App created");
          router.refresh();
          setOpen(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonVariants({ variant: "default" })}>
          Create New App
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New App</DialogTitle>
          <DialogDescription>
            Create New App to start storing files
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-left"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="app name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="" type="submit">
              {isLoading && <Loader2 className={"animate-spin mr-3"} />}
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
