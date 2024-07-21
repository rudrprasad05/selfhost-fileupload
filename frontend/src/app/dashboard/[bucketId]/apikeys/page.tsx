import { CreateApiKey, GetApiKeys } from "@/actions/Api-key";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React from "react";
import CopySection from "./_components/CopySection";
import CreateNewKey from "./_components/CreateNewKey";
import { ApikeyType } from "@/types";

const page = async () => {
  // const res = await CreateApiKey();
  const res = await GetApiKeys();
  console.log(res?.data);

  return (
    <div>
      <div className="justify-between flex items-center">
        <div>
          <h1 className="text-xl">Api Keys</h1>
          <p className="text-sm text-slate-400">View and manage API Keys</p>
        </div>
        <CreateNewKey />
      </div>
      {res?.data.map((d: ApikeyType) => (
        <div key={d.id} className="my-6 border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p>.env.local</p>
            <div className="flex gap-5 items-center">
              <Eye />
              <CopySection data={d} />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="w-6">1</span>
              <span className="text-primary">R3_APP_ID=</span>
              <span>{d.accessKeyId}</span>
            </div>
            <div className="flex items-center">
              <span className="w-6">2</span>
              <span className="text-primary">R3_SECRET_KEY=</span>
              <span>{d.secretAccessKey}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
