import { type MalaysianState, normalizeState } from "@/lib/data/malaysian-states";

// Admin team for the chatbot's complaint/issue triage handoff, split by
// state coverage. Single source of truth for admin WhatsApp numbers —
// never hardcode these elsewhere.
//
// `satisfies` pins every entry in `states` to a canonical MalaysianState, so
// a typo like "pulau pinang" or "kualalumpur" fails the build instead of
// quietly routing that state to the out-of-coverage fallback forever.
type AdminEntry = {
  name: string;
  display: string;
  waNumber: string;
  states: readonly MalaysianState[];
};

export const ADMINS = {
  hakiim: {
    name: "Hakiim",
    display: "+60 11-2998 7890",
    waNumber: "601129987890",
    states: ["johor", "negeri sembilan", "kedah", "perlis", "perak", "penang"],
  },
  afiq: {
    name: "Afiq",
    display: "+60 16-277 3211",
    waNumber: "60162773211",
    states: ["kuala lumpur", "selangor", "kelantan", "terengganu", "pahang", "melaka"],
  },
} as const satisfies Record<string, AdminEntry>;

export type ResolvedAdmin = {
  name: string;
  display: string;
  waNumber: string;
  states: readonly string[];
  isOutOfCoverage?: boolean;
};

export function getAdminByState(state: string): ResolvedAdmin {
  // normalizeState() absorbs spelling, alias and prefix variation before the
  // coverage lookup — "Pulau Pinang", "P. Pinang" and "penang" all arrive
  // here as "penang". It returns null rather than guessing, so anything
  // unrecognised takes the same out-of-coverage path as an uncovered state.
  const normalized = normalizeState(state);

  if (normalized) {
    if ((ADMINS.hakiim.states as readonly string[]).includes(normalized)) {
      return ADMINS.hakiim;
    }
    if ((ADMINS.afiq.states as readonly string[]).includes(normalized)) {
      return ADMINS.afiq;
    }
  }

  // Sabah, Sarawak, Putrajaya, Labuan, or unrecognised → default Hakiim with
  // an out-of-coverage flag so the UI/agent can soften the handoff.
  return { ...ADMINS.hakiim, isOutOfCoverage: true };
}
