import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const srcDir = path.resolve('Product Pic')
const outDir = path.resolve('public/products')
const bannerSrc = path.resolve('Product Pic/Banner/gemini_generated_video_c20cb600.mp4')
const bannerDest = path.resolve('public/banner.mp4')

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Copy banner video to public
if (fs.existsSync(bannerSrc)) {
  fs.copyFileSync(bannerSrc, bannerDest)
  console.log('✓ Copied banner video to public/banner.mp4')
} else {
  console.warn('! Banner video not found at', bannerSrc)
}

// Convert all jpg/png to webp
const files = fs.readdirSync(srcDir)
for (const file of files) {
  const fullPath = path.join(srcDir, file)
  const stat = fs.statSync(fullPath)
  if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
    const baseName = path.parse(file).name
    const webpPath = path.join(outDir, `${baseName}.webp`)
    await sharp(fullPath)
      .webp({ quality: 85, effort: 5 })
      .toFile(webpPath)
    console.log(`✓ Converted ${file} -> ${baseName}.webp`)
  }
}

console.log('All images converted to WebP successfully!')
