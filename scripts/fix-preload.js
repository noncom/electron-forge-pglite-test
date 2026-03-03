import { readFile, writeFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "..", "dist", "preload.js");

// Read the file
readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split into lines and filter out lines containing 'export {'
  const lines = data.split("\n");
  const filteredLines = lines.filter((line) => !line.includes("export {"));

  // Join back and write
  const result = filteredLines.join("\n");

  writeFile(filePath, result, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    const removedCount = lines.length - filteredLines.length;
    console.log(`Done! Removed ${removedCount} line(s) containing 'export {'.`);
  });
});
