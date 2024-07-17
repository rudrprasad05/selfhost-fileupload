"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import EditProfileSheet from "./EditProfileSheet";
import AvatarComponent from "./AvatarComponent";
import { Loader2, LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const NavBarLogin = () => {
  const [domLoaded, setdomLoaded] = useState(false);
  const [navKey, setNavKey] = useState(0);
  const session = useSession();
  const user = session.data?.user;
  useEffect(() => {
    // setdomLoaded(true);
    setNavKey((prev) => prev + 1);
  }, [user]);

  // if (domLoaded)
  return (
    <div key={navKey} className="flex items-center">
      {!user ? <SignIn user={user} /> : <CreateAccount user={user} />}
    </div>
  );
  // else
  //   return (
  //     <>
  //       <Loader2 className={"animate-spin mr-3"} />
  //     </>
  //   );
};

const SignIn = ({ user }: { user: any }) => {
  if (user) return null;
  return (
    <div className="flex gap-4 text-lg">
      <Link
        href={"/auth/login"}
        className="text-white px-6 py-4 bg-primary rounded-full hover:bg-primary/90 transition"
      >
        Sign up
      </Link>
    </div>
  );
};

const CreateAccount = ({ user }: { user: any }) => {
  if (user)
    return (
      <EditProfileSheet user={user}>
        <AvatarComponent
          className=""
          fallback={user.name?.slice(0, 2).toUpperCase() || "AD"}
          src={user?.image}
        />
      </EditProfileSheet>
    );
  return (
    <Link
      href="/register"
      className={buttonVariants({
        variant: "ghost",
      })}
    >
      Create account
    </Link>
  );
};

const Seperator = ({ user }: { user: any }) => {
  if (user) return null;
  return <span className="h-6 w-px bg-muted" aria-hidden="true" />;
};

export default NavBarLogin;
