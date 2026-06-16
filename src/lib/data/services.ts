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
// Categorization rule:
//   - indoor (all models, incl. Ultra One)         → RM 160 filter service
//   - outdoor UF Double Backwash                   → RM 390 (UF membrane)
//   - outdoor Fiber 9x42 / 10x44 / Steel
//       (air kerajaan, 5-layer sand)               → RM 250
//   - outdoor PVDF                                 → RM 490 (membrane)
//   - outdoor PVDF Plus                            → RM 590 (membrane)
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

const OUTDOOR_SAND_STANDARD: ServiceInfo = {
  servicePrice: "RM 250",
  yearlyEstimate: "RM 500",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_UF_DOUBLE_BACKWASH: ServiceInfo = {
  servicePrice: "RM 390",
  yearlyEstimate: "RM 780",
  warrantyKey: "product_detail_service_warranty_uf",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_PVDF: ServiceInfo = {
  // PVDF membrane — same default service cadence as the other membrane
  // products, priced for the larger professional-grade cartridge.
  servicePrice: "RM 490",
  yearlyEstimate: "RM 980",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

const OUTDOOR_PVDF_PLUS: ServiceInfo = {
  // PVDF Plus — same membrane service profile as PVDF, higher price tier.
  servicePrice: "RM 590",
  yearlyEstimate: "RM 1,180",
  warrantyKey: "product_detail_service_warranty_default",
  frequencyKey: "product_detail_service_frequency_default",
};

// Slug-based routing map for outdoor products (more explicit than
// keyword-sniffing in the function body). Ultra One is no longer here —
// it was reclassified to indoor, so it resolves via INDOOR_DEFAULT.
const OUTDOOR_SERVICE_MAP: Record<string, ServiceInfo> = {
  "uf-double-backwash": OUTDOOR_UF_DOUBLE_BACKWASH,
  "fiber-9x42": OUTDOOR_SAND_STANDARD,
  "fiber-10x44": OUTDOOR_SAND_STANDARD,
  steel: OUTDOOR_SAND_STANDARD,
  pvdf: OUTDOOR_PVDF,
  "pvdf-plus": OUTDOOR_PVDF_PLUS,
};

export const getServiceInfo = (product: Product): ServiceInfo => {
  if (product.category === "indoor") return INDOOR_DEFAULT;
  return OUTDOOR_SERVICE_MAP[product.slug] ?? INDOOR_DEFAULT;
};
