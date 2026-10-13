// Single source of truth for the production site URL + name. Used by
// metadata (metadataBase, Open Graph) and JSON-LD in app/layout.tsx.
//
// NOTE: the static public/sitemap.xml + public/robots.txt cannot import
// this const (they're served as-is), so the domain is also hardcoded
// there — keep all three in sync if the domain ever changes.
export const SITE_URL = "https://aihaaofficial.com";
export const SITE_NAME = "AIHAA Marketing Sdn Bhd";

// Meta (Facebook) Pixel ID — public identifier, loaded site-wide from
// app/layout.tsx.
export const META_PIXEL_ID = "1384024506863493";
