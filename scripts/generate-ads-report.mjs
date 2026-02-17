import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../rapport-google-ads-villa-lily-blue.pdf");

const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream(outputPath));

const BLUE = "#1e3a5f";
const LIGHT_BLUE = "#4a90d9";
const GRAY = "#666666";
const LIGHT_GRAY = "#f5f5f5";
const GREEN = "#27ae60";
const RED = "#e74c3c";
const ORANGE = "#f39c12";

function drawHeader() {
  doc.rect(0, 0, doc.page.width, 120).fill(BLUE);
  doc.fillColor("white").fontSize(28).font("Helvetica-Bold");
  doc.text("Villa Lily Blue", 50, 30);
  doc.fontSize(16).font("Helvetica");
  doc.text("Rapport Google Ads - Performance Max", 50, 65);
  doc.fontSize(11).fillColor("#aaccee");
  doc.text("Periode: 30 Dec 2025 - 7 Jan 2026  |  Campagne: Asset Group  |  Devise: EUR", 50, 90);
  doc.moveDown(3);
}

function sectionTitle(title, y) {
  const yPos = y || doc.y;
  doc.fillColor(BLUE).fontSize(16).font("Helvetica-Bold");
  doc.text(title, 50, yPos);
  doc.moveTo(50, doc.y + 3).lineTo(545, doc.y + 3).strokeColor(LIGHT_BLUE).lineWidth(2).stroke();
  doc.moveDown(0.8);
}

function drawKPIBoxes() {
  const kpis = [
    { label: "Impressions", value: "23,871", color: LIGHT_BLUE },
    { label: "Clics", value: "751", color: LIGHT_BLUE },
    { label: "CTR", value: "3.1%", color: GREEN },
    { label: "Conversions", value: "262", color: GREEN },
    { label: "Cout total", value: "270.88 EUR", color: ORANGE },
    { label: "Cout/conv.", value: "1.03 EUR", color: GREEN },
  ];

  const boxWidth = 155;
  const boxHeight = 55;
  const startX = 50;
  const startY = doc.y;

  kpis.forEach((kpi, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (boxWidth + 15);
    const y = startY + row * (boxHeight + 10);

    doc.roundedRect(x, y, boxWidth, boxHeight, 5).fill(LIGHT_GRAY);
    doc.fillColor(kpi.color).fontSize(20).font("Helvetica-Bold");
    doc.text(kpi.value, x + 10, y + 8, { width: boxWidth - 20 });
    doc.fillColor(GRAY).fontSize(9).font("Helvetica");
    doc.text(kpi.label, x + 10, y + 35, { width: boxWidth - 20 });
  });

  doc.y = startY + 2 * (boxHeight + 10) + 15;
}

function drawTable(headers, rows, colWidths) {
  const startX = 50;
  const rowHeight = 22;
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  let y = doc.y;

  // Header
  doc.rect(startX, y, totalWidth, rowHeight).fill(BLUE);
  let x = startX;
  headers.forEach((header, i) => {
    doc.fillColor("white").fontSize(8).font("Helvetica-Bold");
    doc.text(header, x + 4, y + 6, { width: colWidths[i] - 8, align: i === 0 ? "left" : "right" });
    x += colWidths[i];
  });
  y += rowHeight;

  // Rows
  rows.forEach((row, rowIdx) => {
    if (rowIdx % 2 === 0) {
      doc.rect(startX, y, totalWidth, rowHeight).fill(LIGHT_GRAY);
    }
    x = startX;
    row.forEach((cell, i) => {
      doc.fillColor(GRAY).fontSize(8).font("Helvetica");
      const text = String(cell);
      doc.text(text, x + 4, y + 6, { width: colWidths[i] - 8, align: i === 0 ? "left" : "right" });
      x += colWidths[i];
    });
    y += rowHeight;
  });

  doc.y = y + 10;
}

function drawInsight(icon, text) {
  const y = doc.y;
  doc.fillColor(GREEN).fontSize(12).font("Helvetica-Bold");
  doc.text(icon, 50, y);
  doc.fillColor(GRAY).fontSize(9).font("Helvetica");
  doc.text(text, 70, y, { width: 475 });
  doc.moveDown(0.5);
}

// ==================== BUILD THE PDF ====================

drawHeader();

// KPIs
sectionTitle("KPIs Globaux");
drawKPIBoxes();

// Top Headlines
sectionTitle("Top Headlines (par conversions)");
drawTable(
  ["Headline", "Impr.", "Clics", "Conv.", "Cout EUR"],
  [
    ["Luxury Villa in Saint Martin", "17,270", "578", "212", "195.10"],
    ["Anse Marcel Beach Villa", "4,475", "136", "52", "60.86"],
    ["Newly Renovated Villa 2024", "2,037", "44", "2", "22.75"],
    ["Spacious 4-Bedroom Villa", "156", "13", "4", "13.08"],
    ["2m-Wide Beds (Super King)", "425", "10", "2", "11.54"],
    ["Luxury Villa, Total Privacy", "186", "8", "2", "7.76"],
    ["Luxury Living in Anse Marcel", "67", "9", "2", "8.74"],
    ["Private Heated Pool & Sea View", "94", "6", "2", "7.75"],
    ["Enjoy a Private Heated Pool", "48", "5", "2", "7.55"],
  ],
  [210, 65, 55, 55, 70]
);

// Top Descriptions
sectionTitle("Top Descriptions (par conversions)");
drawTable(
  ["Description", "Impr.", "Clics", "Conv.", "Cout EUR"],
  [
    ["4 bedrooms with super king beds (2m) + 5 bathrooms", "10,796", "373", "137", "147.18"],
    ["Private heated pool, sea-view terrace & outdoor kitchen", "7,433", "249", "87", "95.72"],
    ["Renovated 2024 luxury villa, 5 min from beach", "3,613", "104", "30", "42.29"],
    ["Calm, private retreat with premium amenities", "1,748", "38", "16", "14.15"],
    ["Enjoy prime location in Anse Marcel (Google AI)", "332", "22", "6", "24.23"],
    ["100 Mbps WiFi, office space, printer & gym", "603", "19", "2", "7.04"],
  ],
  [210, 65, 55, 55, 70]
);

// New page for sitelinks and images
doc.addPage();
drawHeader();

// Sitelinks
sectionTitle("Performance des Sitelinks");
drawTable(
  ["Sitelink", "Impr.", "Clics", "Conv.", "Cout EUR"],
  [
    ["View Rooms - 4 Bedrooms - 5 Bathrooms", "430", "23", "4", "21.51"],
    ["Book Now - Exclusive Anse Marcel Villa", "413", "22", "4", "20.10"],
    ["Amenities Offered - WiFi + Office + Gym", "389", "19", "4", "15.44"],
    ["Contact Us - Check Availability & Rates", "363", "16", "0", "11.97"],
  ],
  [240, 60, 50, 50, 55]
);

// Images performance
sectionTitle("Performance des Images (top 5)");
drawTable(
  ["Format", "Impr.", "Clics", "Conv.", "Cout EUR"],
  [
    ["Square image #1 (piscine vue aerienne)", "8,465", "221", "84", "90.31"],
    ["Square image #2", "7,386", "282", "100", "86.65"],
    ["Square image #3", "5,048", "167", "48", "62.35"],
    ["Horizontal image #1", "1,619", "51", "24", "23.98"],
    ["Square image #4", "455", "15", "0", "3.13"],
  ],
  [240, 60, 50, 50, 55]
);

// Key Insights
doc.moveDown(1);
sectionTitle("Enseignements Cles & Recommandations");

const insights = [
  '>> "Luxury Villa in Saint Martin" = 81% des conversions headlines. Renforcer ce positionnement sur le site.',
  '>> "4 bedrooms + super king beds + 5 bathrooms" est la description #1 (137 conv). Les super king beds (2m) sont un differenciateur fort.',
  '>> "Heated pool + outdoor kitchen + sunset dining" convertit tres bien (87 conv). Mettre en avant la cuisine exterieure.',
  '>> "Renovated 2024" genere de l\'interet (2,037 impr). Ajouter un badge visible sur le site.',
  ">> Le sitelink /rooms/ pointe vers une page inexistante. Creer une redirection vers /villa.",
  '>> "Parking for up to 6 cars" mentionne dans les ads mais absent du site. Harmoniser.',
  ">> Les videos YouTube n'ont quasi aucune conversion (0). Budget negligeable (1.14 EUR).",
  ">> Le sitelink Contact Us a 0 conversion malgre 363 impressions. Optimiser la page contact.",
];

insights.forEach((insight) => {
  const isAction = insight.startsWith(">>");
  doc.fillColor(isAction ? BLUE : GRAY).fontSize(9).font(isAction ? "Helvetica-Bold" : "Helvetica");
  doc.text(insight.replace(">> ", ""), 55, doc.y, { width: 480 });
  doc.moveDown(0.4);
});

// Actions taken
doc.addPage();
drawHeader();
sectionTitle("Actions Implementees sur le Site");

const actions = [
  { action: "Badge 'Renove en 2024' ajoute", where: "Hero homepage + Hero page villa", status: "FAIT" },
  { action: "Super king beds (2m) mentionne", where: "Descriptions chambres (3 langues)", status: "FAIT" },
  { action: "5 salles de bain (corrige de 4)", where: "Features villa + JSON-LD + llms.txt", status: "FAIT" },
  { action: "Cuisine exterieure mise en avant", where: "Equipements piscine & exterieur", status: "FAIT" },
  { action: "Parking (jusqu'a 6 vehicules)", where: "Equipements piscine & exterieur", status: "FAIT" },
  { action: "Redirection /rooms/ -> /villa", where: "next.config.ts (301 permanent)", status: "FAIT" },
  { action: "Canonical URLs dynamiques", where: "Toutes les pages (10 pages)", status: "FAIT" },
  { action: "Metadonnees SEO completes", where: "10 pages x 3 langues", status: "FAIT" },
  { action: "Image OG generee (1200x630)", where: "public/images/og-image.jpg", status: "FAIT" },
  { action: "JSON-LD corrige et enrichi", where: "Schemas: LodgingBusiness, FAQ, Breadcrumb, Reviews", status: "FAIT" },
  { action: "llms.txt pour ChatGPT/Perplexity", where: "public/llms.txt", status: "FAIT" },
  { action: "Hierarchie headings corrigee", where: "VillaContent, AmenitiesContent, Gallery, Reviews", status: "FAIT" },
  { action: "Alt texts descriptifs", where: "AmenitiesContent (3 images)", status: "FAIT" },
];

drawTable(
  ["Action", "Localisation", "Statut"],
  actions.map((a) => [a.action, a.where, a.status]),
  [200, 210, 45]
);

// Next steps
doc.moveDown(1);
sectionTitle("Prochaines Etapes Recommandees");

const nextSteps = [
  "1. Mettre a jour les sitelinks Google Ads : /rooms/ -> /villa, /contact/ -> /en/contact",
  "2. A/B tester les headlines : garder 'Luxury Villa in Saint Martin' comme principal",
  "3. Desactiver les headlines a 0 conversion avec cout (economiser ~30 EUR)",
  "4. Ajouter des images horizontales performantes (les carrees dominent actuellement)",
  "5. Surveiller les conversions post-modifications SEO (attendre 2-4 semaines)",
  "6. Considerer l'ajout d'un prix d'appel dans les ads ('From 350 EUR/night')",
  "7. Creer une landing page dediee pour les ads (avec formulaire simplifie)",
];

nextSteps.forEach((step) => {
  doc.fillColor(GRAY).fontSize(9).font("Helvetica");
  doc.text(step, 55, doc.y, { width: 480 });
  doc.moveDown(0.4);
});

// Footer
doc.moveDown(2);
doc.fillColor("#999").fontSize(8).font("Helvetica");
doc.text("Rapport genere le 17 fevrier 2026 par StrawTech pour Villa Lily Blue", 50, doc.y, { align: "center" });

doc.end();
console.log(`PDF generated: ${outputPath}`);
