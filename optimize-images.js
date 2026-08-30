import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('public/assets/images');
const files = fs.readdirSync(imgDir);

async function optimize() {
  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.png')) continue;
    if (file.startsWith('opt_')) continue;

    const fullPath = path.join(imgDir, file);
    const webpPath = path.join(imgDir, file.replace(/\.(jpg|jpeg|png)$/, '.webp'));

    console.log(`Optimizing ${file}...`);
    const inputBuffer = fs.readFileSync(fullPath);

    // High quality mobile WebP
    await sharp(inputBuffer)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(webpPath);

    // Optimized JPEG
    const optJpgBuffer = await sharp(inputBuffer)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(fullPath, optJpgBuffer);

    const stat = fs.statSync(fullPath);
    const webpStat = fs.statSync(webpPath);
    console.log(`✓ ${file}: JPG ${(stat.size / 1024).toFixed(1)} KB | WebP ${(webpStat.size / 1024).toFixed(1)} KB`);
  }
}

optimize();
