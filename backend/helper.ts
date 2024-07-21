var fs = require("fs");
import crypto from "crypto";

export const deleteDirectory = async (dirPath) => {
  if (fs.existsSync(dirPath)) {
    await fs.promises.rm(dirPath, { recursive: true, force: true });
  }
};

export function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
}
