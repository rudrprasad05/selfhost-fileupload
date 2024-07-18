import { Loader, Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-24 h-24" />
    </div>
  );
};

export default loading;
