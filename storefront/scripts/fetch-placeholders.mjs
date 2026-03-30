#!/usr/bin/env node
/**
 * Downloads Pollinations images into public/images/placeholders for deterministic builds.
 * Run: node scripts/fetch-placeholders.mjs (from storefront/)
 *
 * Palette-aware prompts — no brand trademarks; generic luxury editorial only.
 */
import {createWriteStream} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import https from 'node:https';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/images/placeholders');

const jobs = [
  {
    file: 'lifestyle-1.jpg',
    prompt:
      'Editorial fashion photograph woman in silk blouse muted sage green and warm beige background soft window light film grain luxury minimalist no logo',
    seed: 41,
    width: 1920,
    height: 1080,
  },
  {
    file: 'lifestyle-2.jpg',
    prompt:
      'Cinematic fashion portrait silk fabric detail dusty mauve and cream tones natural light luxury magazine style no text no logo',
    seed: 42,
    width: 1920,
    height: 1080,
  },
  {
    file: 'product-teaser.jpg',
    prompt:
      'Flat lay silk blouse ivory on beige linen editorial still life soft shadow luxury no brand',
    seed: 43,
    width: 1600,
    height: 1200,
  },
  {
    file: 'story-image.jpg',
    prompt:
      'Fashion design studio mood board silk swatches sage green beige aesthetic natural light',
    seed: 44,
    width: 1920,
    height: 1080,
  },
  {
    file: 'hero-poster.jpg',
    prompt:
      'Abstract flowing silk fabric in shadow charcoal and champagne highlights cinematic',
    seed: 45,
    width: 1920,
    height: 1080,
  },
  {
    file: 'styling-1.jpg',
    prompt:
      'Woman tailored trousers silk blouse office window light editorial beige palette',
    seed: 46,
    width: 1200,
    height: 1500,
  },
  {
    file: 'styling-2.jpg',
    prompt:
      'Evening wear silk blouse midi skirt soft mauve wall editorial fashion',
    seed: 47,
    width: 1200,
    height: 1500,
  },
  {
    file: 'styling-3.jpg',
    prompt:
      'Resort lifestyle silk coverup natural light ocean breeze editorial calm',
    seed: 48,
    width: 1200,
    height: 1500,
  },
  {
    file: 'product-hero.jpg',
    prompt:
      'Silk blouse product photography ivory on pale sage backdrop luxury e-commerce',
    seed: 49,
    width: 1600,
    height: 2000,
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error('Redirect without location'));
          res.resume();
          return download(loc, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return res.resume();
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', reject);
  });
}

await mkdir(OUT_DIR, {recursive: true});

for (const job of jobs) {
  const encoded = encodeURIComponent(job.prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${job.width}&height=${job.height}&model=flux&seed=${job.seed}&nologo=true`;
  const dest = join(OUT_DIR, job.file);
  process.stdout.write(`Fetching ${job.file}... `);
  try {
    await download(url, dest);
    process.stdout.write('ok\n');
  } catch (e) {
    process.stdout.write(`fail: ${e.message}\n`);
    process.exitCode = 1;
  }
}
