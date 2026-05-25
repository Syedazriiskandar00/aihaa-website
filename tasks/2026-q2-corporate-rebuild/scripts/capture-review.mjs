#!/usr/bin/env node
/**
 * Visual-review gallery capture script.
 *
 * What: captures 23 routes × 2 viewports (desktop 1440×900 + mobile 390×844)
 *       into ../review-screenshots/ for the visual-review.html gallery.
 *
 * Requires (one-time): `npm install --save-dev playwright` at the repo root.
 *
 * Usage:
 *   1. Start dev server in one terminal:   `npm run dev`
 *   2. In another terminal:                 `node tasks/2026-q2-corporate-rebuild/scripts/capture-review.mjs`
 *   3. Override base URL if needed:         `BASE_URL=http://localhost:3001 node …/capture-review.mjs`
 *
 * The initial set of screenshots for this branch was captured via the
 * Claude Code MCP Playwright tool — this script exists so future captures
 * (after real assets land) can be re-run without agent assistance.
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "review-screenshots");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const ROUTES = [
  // Rebuild pages — chronological by phase for Azri's review flow
  { phase: "4", slug: "home", path: "/" },
  { phase: "3", slug: "produk-dalam", path: "/produk-dalam" },
  { phase: "2", slug: "produk-luar", path: "/produk-luar" },
  { phase: "1", slug: "service", path: "/service" },
  { phase: "5", slug: "tentang-kami", path: "/tentang-kami" },

  // Legacy listing (kept live, cross-linked from premium landings)
  { phase: "legacy", slug: "water-purifier", path: "/water-purifier" },

  // Phase 6 — product detail template × 13
  { phase: "6", slug: "aihaa-bella", path: "/product/aihaa-bella" },
  { phase: "6", slug: "aihaa-big", path: "/product/aihaa-big" },
  { phase: "6", slug: "aihaa-ean", path: "/product/aihaa-ean" },
  { phase: "6", slug: "aihaa-fancy", path: "/product/aihaa-fancy" },
  { phase: "6", slug: "aihaa-winter", path: "/product/aihaa-winter" },
  { phase: "6", slug: "ultra-one", path: "/product/ultra-one" },
  { phase: "6", slug: "fiber-9x42", path: "/product/fiber-9x42" },
  { phase: "6", slug: "fiber-10x44", path: "/product/fiber-10x44" },
  { phase: "6", slug: "penapis-boring-13x54", path: "/product/penapis-boring-13x54" },
  { phase: "6", slug: "pvdf", path: "/product/pvdf" },
  { phase: "6", slug: "pvdf-plus", path: "/product/pvdf-plus" },
  { phase: "6", slug: "super-pleated", path: "/product/super-pleated" },
  { phase: "6", slug: "uf-double-backwash", path: "/product/uf-double-backwash" },

  // Untouched per IMPLEMENTATION_PLAN rule
  { phase: "u", slug: "faq", path: "/faq" },
  { phase: "u", slug: "galeri", path: "/galeri" },
  { phase: "u", slug: "promotions", path: "/promotions" },
  { phase: "u", slug: "contact", path: "/contact" },
];

async function capture(page, route, viewport, label) {
  await page.setViewportSize(viewport);
  await page.goto(`${BASE_URL}${route.path}`, {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  // Force scroll-reveal children visible so full-page capture shows real content
  await page.addStyleTag({
    content:
      `.scroll-reveal, .scroll-reveal-child { opacity: 1 !important; transform: none !important; }`,
  });
  // Scroll through to trigger lazy-loaded imagery
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  const file = resolve(OUT_DIR, `${route.phase}-${route.slug}-${label}.png`);
  await page.screenshot({ path: file, fullPage: true, timeout: 90000 });
  return file;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    // BM locale — homepage + product cards look up localStorage key
    // 'aihaa-lang' to pick language; initScript runs before the page script
    // so context is primed on first navigation.
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    localStorage.setItem("aihaa-lang", "bm");
  });

  for (const r of ROUTES) {
    process.stdout.write(`[${r.phase}] ${r.path.padEnd(32)}  …`);
    try {
      await capture(page, r, DESKTOP, "desktop");
      await capture(page, r, MOBILE, "mobile");
      process.stdout.write(" ok\n");
    } catch (err) {
      process.stdout.write(` FAIL: ${err.message}\n`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
