import { Loader2, TreeDeciduous, TreePalm } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

import NavBarLogin from "./NavBarLogin";
import getSession from "@/actions/getSession";

const Navbar = async () => {
  const user = await getSession();
  console.log(user);

  return (
    <nav className="bg-card px-10 py-6">
      <div className="bg-secondary rounded-full p-3 flex items-center justify-between">
        <ul className="flex items-center gap-5 p-3 pl-9 capitalize text-accent-foreground">
          <li>
            <TreePalm className="stroke-primary" size={30} />
          </li>
          {user && (
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
          )}
        </ul>

        <NavBarLogin />
      </div>
    </nav>
  );
};

export default Navbar;
