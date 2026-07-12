import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const sourceLogo = path.join(rootDir, "public/images/logo.png");
const iconsDir = path.join(rootDir, "public/icons");

// Brand primary color (--primary in src/app/globals.css)
const BRAND_COLOR = "#3AA6B9";

async function logOutput(filePath) {
  const { size } = await fs.stat(filePath);
  console.log(`Generated: ${filePath} (${size} bytes)`);
}

async function generateTransparentIcon(size, outputPath) {
  await sharp(sourceLogo)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath);
  await logOutput(outputPath);
}

async function generateAppleIcon(outputPath) {
  const size = 180;
  const logoSize = Math.round(size * 0.76);
  const logo = await sharp(sourceLogo)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(outputPath);
  await logOutput(outputPath);
}

async function generateMaskableIcon(outputPath) {
  const size = 512;
  const logoSize = Math.round(size * 0.6);
  const logo = await sharp(sourceLogo)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_COLOR,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .flatten({ background: BRAND_COLOR })
    .png()
    .toFile(outputPath);
  await logOutput(outputPath);
}

async function generateFavicon(outputPath) {
  const buffers = await Promise.all(
    [32, 48].map((size) =>
      sharp(sourceLogo)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );
  const ico = await pngToIco(buffers);
  await fs.writeFile(outputPath, ico);
  await logOutput(outputPath);
}

async function generateIcons() {
  try {
    await fs.mkdir(iconsDir, { recursive: true });

    await generateTransparentIcon(512, path.join(rootDir, "src/app/icon.png"));
    await generateAppleIcon(path.join(rootDir, "src/app/apple-icon.png"));
    await generateTransparentIcon(192, path.join(iconsDir, "icon-192.png"));
    await generateTransparentIcon(512, path.join(iconsDir, "icon-512.png"));
    await generateMaskableIcon(path.join(iconsDir, "icon-512-maskable.png"));
    await generateFavicon(path.join(rootDir, "src/app/favicon.ico"));

    console.log("All icons generated successfully.");
  } catch (error) {
    console.error("Error generating icons:", error);
    process.exit(1);
  }
}

generateIcons();
