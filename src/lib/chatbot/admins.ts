// Admin team for the chatbot's complaint/issue triage handoff, split by
// state coverage. Single source of truth for admin WhatsApp numbers —
// never hardcode these elsewhere.
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
} as const;

export type ResolvedAdmin = {
  name: string;
  display: string;
  waNumber: string;
  states: readonly string[];
  isOutOfCoverage?: boolean;
};

export function getAdminByState(state: string): ResolvedAdmin {
  const normalized = state.toLowerCase().trim();
  if ((ADMINS.hakiim.states as readonly string[]).includes(normalized)) {
    return ADMINS.hakiim;
  }
  if ((ADMINS.afiq.states as readonly string[]).includes(normalized)) {
    return ADMINS.afiq;
  }
  // Sabah, Sarawak, Putrajaya, Labuan, or unknown → default Hakiim with
  // an out-of-coverage flag so the UI/agent can soften the handoff.
  return { ...ADMINS.hakiim, isOutOfCoverage: true };
}
