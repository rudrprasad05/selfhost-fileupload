"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@prisma/client";

import React, { useContext } from "react";
import { signOut } from "next-auth/react";
// import ThemeSwitcher from "@/theme/ThemeSwitcher";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface props {
  children?: React.ReactNode;
  user?: any;
}

const EditProfileSheet: React.FC<props> = ({ children, user }) => {
  const router = useRouter();
  const handleClick = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <Sheet>
      <SheetTrigger className="mr-6">{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {/* Welcome back {user && user?.username.split(" ")[0]} */}
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex flex-col gap-2 my-4">
          <Link
            className="hover:underline"
            href={`/account/${user?.id}/mydash`}
          >
            Dashboard
          </Link>
          <Link
            className="hover:underline"
            href={`/account/${user?.id}/myorders`}
          >
            Orders
          </Link>
          <Link
            className="hover:underline"
            href={`/account/${user?.id}/myprofile`}
          >
            Profile
          </Link>
          <Link className="hover:underline" href={`/account/${user?.id}/help`}>
            Customer Support
          </Link>
          <Link
            className="hover:underline"
            href={`/account/${user?.id}/wishlist`}
          >
            Wish List
          </Link>
        </SheetDescription>
        <SheetFooter className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex justify-between w-full">
            {/* <ThemeSwitcher /> */}
            <Button onClick={() => handleClick()}>Signout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
