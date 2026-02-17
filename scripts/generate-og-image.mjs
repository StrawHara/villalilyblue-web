import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const sourceImage = path.join(rootDir, "public/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg");
const outputImage = path.join(rootDir, "public/images/og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

// Create text overlay as SVG
const svgOverlay = `
<svg width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(0,0,0,0);stop-opacity:0" />
      <stop offset="60%" style="stop-color:rgba(0,0,0,0);stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgba(0,0,0,0.7);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grad)" />
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, serif" font-size="56" font-weight="bold" fill="white" letter-spacing="2">
    Villa Lily Blue
  </text>
  <text x="600" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" letter-spacing="3">
    Anse Marcel, Saint Martin
  </text>
</svg>`;

async function generateOgImage() {
  try {
    await sharp(sourceImage)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
      .composite([
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 90 })
      .toFile(outputImage);

    console.log(`OG image generated: ${outputImage}`);
  } catch (error) {
    console.error("Error generating OG image:", error);
    process.exit(1);
  }
}

generateOgImage();
