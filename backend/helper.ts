var fs = require("fs");

export const deleteDirectory = async (dirPath) => {
  if (fs.existsSync(dirPath)) {
    await fs.promises.rm(dirPath, { recursive: true, force: true });
  }
};
