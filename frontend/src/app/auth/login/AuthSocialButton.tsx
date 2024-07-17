import { LucideIcon } from "lucide-react";
import React from "react";

interface AuthSocialButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  name: String;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  name,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-3 items-center group w-full justify-center rounded-md bg-border shadow-sm px-4 py-2 ring-1 ring-inset ring-muted-foreground transition"
    >
      <Icon className="" />
      <span className="text-sm">{name}</span>
    </button>
  );
};

export default AuthSocialButton;
