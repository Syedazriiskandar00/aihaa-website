// Admin team for the chatbot's complaint/issue triage handoff, split by
// state coverage. Single source of truth for admin WhatsApp numbers —
// never hardcode these elsewhere.
export const ADMINS = {
  hakiim: {
    name: "Hakim",
    display: "+60 11-2998 7890",
    waNumber: "601129987890",
    states: ["johor", "kedah", "penang", "perak", "perlis"],
  },
  afiq: {
    name: "Afiq",
    display: "+60 16-277 4211",
    waNumber: "60162774211",
    states: ["kuala lumpur", "selangor", "melaka", "negeri sembilan"],
  },
  faihaa: {
    name: "Faihaa",
    display: "+60 11-4969 2407",
    waNumber: "601149692407",
    states: ["kelantan", "terengganu", "pahang"],
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
  if ((ADMINS.faihaa.states as readonly string[]).includes(normalized)) {
    return ADMINS.faihaa;
  }
  // Sabah, Sarawak, Putrajaya, Labuan, or unknown → default Hakim with
  // an out-of-coverage flag so the UI/agent can soften the handoff.
  return { ...ADMINS.hakiim, isOutOfCoverage: true };
}
