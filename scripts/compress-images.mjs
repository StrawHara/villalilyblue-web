import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const images = [
  path.join(rootDir, "public/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg"),
  path.join(rootDir, "public/images/villa_lily_blue-sxm_photo-anse-marcel-beach-02.jpg"),
];

const MAX_WIDTH = 1920;
const QUALITY = 72;

// La compression est destructive (remplace l'original) : ce manifeste
// mémorise la taille des fichiers déjà compressés pour ne jamais
// ré-encoder une image déjà passée par le script (perte cumulative sinon).
const manifestPath = path.join(__dirname, ".compressed-images.json");

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

async function compressImage(imagePath, manifest) {
  const name = path.basename(imagePath);
  const { size: beforeBytes } = await fs.stat(imagePath);

  if (manifest[name]?.size === beforeBytes) {
    console.log(`${name}: déjà compressée (${beforeBytes} bytes), ignorée`);
    return;
  }

  const tmpPath = `${imagePath}.tmp`;
  await sharp(imagePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmpPath);

  await fs.rename(tmpPath, imagePath);

  const { size: afterBytes } = await fs.stat(imagePath);
  const { width, height } = await sharp(imagePath).metadata();
  manifest[name] = { size: afterBytes };
  console.log(`${name}: ${width}x${height}, ${beforeBytes} bytes -> ${afterBytes} bytes`);
}

async function compressImages() {
  try {
    const manifest = await loadManifest();
    for (const imagePath of images) {
      await compressImage(imagePath, manifest);
    }
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  } catch (error) {
    console.error("Error compressing images:", error);
    process.exit(1);
  }
}

compressImages();
