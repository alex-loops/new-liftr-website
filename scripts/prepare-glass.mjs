/**
 * Builds the responsive glass sculpture images from the transparent master
 * render in assets-src/. The master already has a real alpha channel, so no
 * matting or blend tricks are applied — we only trim to the visible glass and
 * export WebP at a few widths.
 *
 *   npm run prepare:glass            (uses the first image in assets-src/)
 *   node scripts/prepare-glass.mjs assets-src/<file>.png
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const srcDir = 'assets-src'
const input =
  process.argv[2] ?? join(srcDir, readdirSync(srcDir).find((f) => /\.(png|webp|tiff?)$/i.test(f)))
const outDir = 'public/assets/glass'
mkdirSync(outDir, { recursive: true })

// trim fully transparent margins (keeps the cut-off base flush with the bottom)
const trimmed = await sharp(input).ensureAlpha().trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = trimmed.info

const widths = [800, 1200, 1800, 2400].filter((w) => w <= W)
for (const w of widths) {
  await sharp(trimmed.data)
    .resize({ width: w })
    .webp({ quality: 84, alphaQuality: 92, effort: 6, smartSubsample: true })
    .toFile(join(outDir, `liftr-glass-${w}.webp`))
}
writeFileSync(
  join(outDir, 'manifest.json'),
  JSON.stringify({ width: W, height: H, widths }, null, 2) + '\n',
)
console.log(`glass: ${input} → trimmed ${W}×${H} → ${widths.map((w) => `liftr-glass-${w}.webp`).join(', ')}`)
