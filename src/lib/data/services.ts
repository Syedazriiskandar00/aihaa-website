// Service-info logic per product — used by the ServiceInfo section on
// the /product/[slug] detail template.
//
// This module claims ONLY four data points per product: service price,
// warranty period, recommended frequency, and yearly cost estimate. We
// do NOT claim specific filter lifespans, parts schedules, or service
// inclusions that haven't been confirmed with Azri. When future data
// arrives (e.g. real filter lifespan per model), extend this module —
// never inline in components.
//
// Categorization rule (Phase 1 spec is source of truth, overrides Phase 6
// brief for Penapis Boring):
//   - indoor (all 5 models)                        → RM 160 filter service
//   - outdoor UF Double Backwash                   → RM 650 (10yr membrane)
//   - outdoor Penapis Boring 13x54 (air boring)    → RM 650 (6-layer sand)
//   - outdoor Fiber 9x42 / 10x44 (air kerajaan)    → RM 250 (5-layer sand)
//   - outdoor cartridge/membrane (PVDF, PVDF Plus,
//       Ultra One, Super Pleated)                  → RM 160
//
// Yearly estimate = service price × 2 (bi-annual cadence). Warranty
// and frequency values are i18n keys, resolved at render time.

import type { Product } from "./products";
import type { TranslationKeys } from "@/lib/i18n/translations";

export type ServiceInfo = {
  servicePrice: string; // hardcoded, never translated
  yearlyEstimate: string; // hardcoded
  warrantyKey: keyof TranslationKeys;
  frequencyKey: keyof TranslationKeys;
};

const INDOOR_DEFAULT: ServiceInfo = {
  servicePrice: "RM 160",
  yearlyEstimate: "RM 320",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_MEMBRANE: ServiceInfo = {
  // Same numeric profile as indoor — these outdoor cartridge/membrane
  // products are serviced like indoor filters.
  servicePrice: "RM 160",
  yearlyEstimate: "RM 320",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_SAND_STANDARD: ServiceInfo = {
  servicePrice: "RM 250",
  yearlyEstimate: "RM 500",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

// Boring-water tier: 6-layer sand service matches Phase 1 SPEC §4.8 pricing.
// Penapis Boring 13x54 is the sole SKU designed for underground water
// (air boring), so its service profile is the heavier 6-layer tier — not
// the 5-layer municipal profile shared by the fiber tanks.
const OUTDOOR_SAND_BORING: ServiceInfo = {
  servicePrice: "RM 650",
  yearlyEstimate: "RM 1,300",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_UF_DOUBLE_BACKWASH: ServiceInfo = {
  servicePrice: "RM 650",
  yearlyEstimate: "RM 1,300",
  warrantyKey: "product_detail_service_warranty_uf",
  frequencyKey: "product_detail_service_frequency_default",
};

// Slug-based routing map for outdoor products (more explicit than
// keyword-sniffing in the function body).
const OUTDOOR_SERVICE_MAP: Record<string, ServiceInfo> = {
  "uf-double-backwash": OUTDOOR_UF_DOUBLE_BACKWASH,
  "penapis-boring-13x54": OUTDOOR_SAND_BORING,
  "fiber-9x42": OUTDOOR_SAND_STANDARD,
  "fiber-10x44": OUTDOOR_SAND_STANDARD,
  pvdf: OUTDOOR_MEMBRANE,
  "pvdf-plus": OUTDOOR_MEMBRANE,
  "ultra-one": OUTDOOR_MEMBRANE,
  "super-pleated": OUTDOOR_MEMBRANE,
};

export const getServiceInfo = (product: Product): ServiceInfo => {
  if (product.category === "indoor") return INDOOR_DEFAULT;
  return OUTDOOR_SERVICE_MAP[product.slug] ?? INDOOR_DEFAULT;
};
