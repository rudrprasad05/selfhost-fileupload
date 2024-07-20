"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  url: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
  bucketId: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "url",
    header: () => <div className="">Image</div>,
    cell: ({ row }) => {
      const url = row.getValue("url") as string;

      return (
        <div className="text-right font-medium">
          <Image
            src={`http://localhost:3000${url}`}
            alt="image"
            width={50}
            height={50}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Date</div>,
    cell: ({ row }) => {
      const now = row.getValue("createdAt") as string;
      const formattedDate = format(now, "dd-MM-yyyy");
      const formattedTime = format(now, "HH:mm:ss");

      return (
        <div className=" font-medium flex gap-2">
          <span>{formattedDate}</span>
          <span className="text-slate-500">{formattedTime}</span>
        </div>
      );
    },
  },
];
