import { NextRequest, NextResponse } from "next/server";

const s3BaseUrl = process.env.MY_S3_BASE_URL ?? "";
const s3BucketName = process.env.MY_S3_BUCKET_NAME ?? "";
const accessKeyId = process.env.MY_S3_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.MY_S3_SECRET_ACCESS_KEY ?? "";

async function uploadFileToS3(file: any, fileName: string) {
  const fileBuffer = file;

  const uploadUrl = `${s3BaseUrl}/upload`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": accessKeyId,
      "x-api-secret": secretAccessKey,
    },
    body: JSON.stringify({
      bucketName: s3BucketName,
      key: `alibaba/${fileName}`,
      file: fileBuffer.toString("base64"), // assuming your API can handle base64 encoded files
      contentType: "image/jpg",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  const data = await response.json();
  return data.fileName;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ fileName });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
