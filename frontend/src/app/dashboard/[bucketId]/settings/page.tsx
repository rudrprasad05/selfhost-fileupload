import React from "react";
import DeleteAppCTA from "../../_components/DeleteAppCTA";
type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};
const page = (props: PageProps) => {
  const bucketId = parseInt(props.params.bucketId as string);
  return (
    <div>
      <div>
        <h1>Settings</h1>
        <p>Configure settings for your app</p>
      </div>
      <DeleteAppCTA bucketId={bucketId as unknown as string} />
    </div>
  );
};

export default page;
