// The entry lives beside this file, so it is read from this file's own
// folder rather than trusting the working directory at launch time.
// Length is counted in code points, matching the gate's 400-character
// limit, and a too-long entry exits before anything is written out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(join(here, "entry.txt"), "utf8");

const length = Array.from(content).length;
if (length < 1 || content.trim().length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}
if (length > 400) {
  console.error(`entry.txt is ${length} characters, over the 400-character limit`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), content, "utf8");
