"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Github } from "lucide-react";
import AuthSocialButton from "./AuthSocialButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        } else if (callback?.ok) {
          toast.success("Signed In Successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        toast.success("Login Successful");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-screen h-[90vh] relative grid items-center">
      <Card className="w-[500px] mx-auto text-center">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <AuthSocialButton
              name={"GitHub"}
              onClick={() => socialAction("github")}
              icon={Github}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
