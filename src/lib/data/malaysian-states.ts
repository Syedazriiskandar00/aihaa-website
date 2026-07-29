// Canonical Malaysian state / federal-territory list + input normalisation.
//
// WHY THIS EXISTS
// The chatbot's connectToAdmin tool receives `state` as free text produced by
// an LLM from a Malay conversation. Before this module, admins.ts compared
// that raw string against a hardcoded list containing "penang" — so a
// customer (or the model) writing "Pulau Pinang", the official Malay name,
// failed every lookup and fell through to the out-of-coverage branch. Pulau
// Pinang IS covered; the customer was told otherwise. Same class of bug for
// "KL", "N9", "Melaka" vs "Malacca", and every "WP …" prefix.
//
// normalizeState() is the single funnel every state string must pass through.
// It returns a canonical MalaysianState or null — never a guess.
//
// Canonical spellings are the ones already used across the codebase (notably
// "penang", not "pulau pinang") so existing coverage lists keep working
// unchanged. MalaysianState is also the key type for the CS state map, which
// makes an incomplete map a build error rather than a silent routing hole.

export const MALAYSIAN_STATES = [
  "johor",
  "kedah",
  "kelantan",
  "melaka",
  "negeri sembilan",
  "pahang",
  "penang",
  "perak",
  "perlis",
  "sabah",
  "sarawak",
  "selangor",
  "terengganu",
  "kuala lumpur",
  "labuan",
  "putrajaya",
] as const;

export type MalaysianState = (typeof MALAYSIAN_STATES)[number];

// Aliases safe to match anywhere inside a longer string. A customer rarely
// answers with a bare state — "Shah Alam, Selangor" and "saya dekat Johor"
// are both normal — so these are also checked as whole-word substrings.
const LONG_ALIASES: Record<string, MalaysianState> = {
  johor: "johor",
  johore: "johor",
  "johor bahru": "johor",
  "johor baharu": "johor",
  "johor baru": "johor",
  "johor darul takzim": "johor",
  kedah: "kedah",
  "kedah darul aman": "kedah",
  kelantan: "kelantan",
  "kelantan darul naim": "kelantan",
  melaka: "melaka",
  malacca: "melaka",
  "negeri sembilan": "negeri sembilan",
  "n sembilan": "negeri sembilan",
  sembilan: "negeri sembilan",
  pahang: "pahang",
  "pahang darul makmur": "pahang",
  "pulau pinang": "penang",
  "p pinang": "penang",
  pinang: "penang",
  penang: "penang",
  perak: "perak",
  "perak darul ridzuan": "perak",
  perlis: "perlis",
  "perlis indera kayangan": "perlis",
  sabah: "sabah",
  sarawak: "sarawak",
  selangor: "selangor",
  "selangor darul ehsan": "selangor",
  terengganu: "terengganu",
  trengganu: "terengganu",
  "kuala lumpur": "kuala lumpur",
  "wp kuala lumpur": "kuala lumpur",
  labuan: "labuan",
  "pulau labuan": "labuan",
  "wp labuan": "labuan",
  putrajaya: "putrajaya",
  "wp putrajaya": "putrajaya",
};

// Aliases too short to match safely inside a longer string — "ns" appears in
// "means", "pg" in "pergi", "kl" in "klang" (which is Selangor, not KL).
// These resolve on an exact match only, never as a substring.
const SHORT_ALIASES: Record<string, MalaysianState> = {
  jb: "johor",
  ns: "negeri sembilan",
  n9: "negeri sembilan",
  pg: "penang",
  kl: "kuala lumpur",
  pj: "selangor",
};

// Longest first, so "pulau pinang" is tested before "pinang" and
// "negeri sembilan" before "sembilan". Both routes agree here, but the
// ordering keeps the scan honest if a future alias pair disagrees.
const SUBSTRING_ALIASES = Object.keys(LONG_ALIASES).sort(
  (a, b) => b.length - a.length
);

// Lowercase, drop punctuation, collapse whitespace. Turns "W.P. Kuala
// Lumpur" into "wp kuala lumpur" and "N. Sembilan" into "n sembilan", which
// is why the alias tables above store the already-stripped forms.
function canonicalise(input: string): string {
  return input
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=_`~()'"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// "negeri sembilan" must survive the "negeri " strip, so the full string is
// always resolved before any prefix is removed.
const PREFIXES = ["wilayah persekutuan ", "wp ", "negeri ", "daerah "];

function stripPrefix(value: string): string | null {
  for (const prefix of PREFIXES) {
    if (value.startsWith(prefix)) {
      const rest = value.slice(prefix.length).trim();
      if (rest.length > 0) return rest;
    }
  }
  return null;
}

function lookupExact(value: string): MalaysianState | null {
  return LONG_ALIASES[value] ?? SHORT_ALIASES[value] ?? null;
}

/**
 * Resolve free-text user input to a canonical Malaysian state.
 * Returns null when nothing matches — callers decide the fallback, so an
 * unrecognised state is never silently rounded to a real one.
 */
export function normalizeState(input: string): MalaysianState | null {
  if (!input) return null;

  const cleaned = canonicalise(input);
  if (!cleaned) return null;

  // 1. Whole string, including "negeri sembilan" and every "wp …" form.
  const direct = lookupExact(cleaned);
  if (direct) return direct;

  // 2. Same string with a leading qualifier removed.
  const stripped = stripPrefix(cleaned);
  if (stripped) {
    const viaPrefix = lookupExact(stripped);
    if (viaPrefix) return viaPrefix;
  }

  // 3. Embedded in a longer answer — "Shah Alam, Selangor", "saya di Johor".
  //    Whole-word only, so "klang" never resolves to "kl".
  for (const alias of SUBSTRING_ALIASES) {
    const pattern = new RegExp(`(^|\\s)${alias}($|\\s)`);
    if (pattern.test(cleaned)) return LONG_ALIASES[alias];
  }

  return null;
}
