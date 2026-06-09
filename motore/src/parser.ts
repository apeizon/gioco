import type { Effetto, Azione } from "./schema.js";
import { TRIGGER, TRIGGER_DEFAULT, VERBI } from "./grammatica.js";

export type RisultatoParse =
  | { ok: true; effetti: Effetto[] }
  | { ok: false; motivo: string };

export function parseEffetto(testo: string): RisultatoParse {
  const pulito = rimuoviParentesi(testo).trim();
  if (!pulito) return { ok: true, effetti: [] };

  const frasi = pulito.split(/(?<=[.;])\s+/).map((f) => f.trim()).filter(Boolean);
  const effetti: Effetto[] = [];

  for (const frase of frasi) {
    const e = parseFrase(frase);
    if (!e) return { ok: false, motivo: `frase non riconosciuta: "${frase}"` };
    effetti.push(e);
  }
  return { ok: true, effetti };
}

function parseFrase(frase: string): Effetto | null {
  const lower = frase.toLowerCase();

  // 1. trigger esplicito? (es. "Quando muore: ...")
  let trigger = TRIGGER_DEFAULT;
  let corpo = frase;
  const tr = TRIGGER.find((t) => t.regex.test(lower));
  if (tr) {
    trigger = tr.id;
    const duePunti = frase.indexOf(":");
    if (duePunti >= 0) corpo = frase.slice(duePunti + 1).trim();
  }

  // 2. il corpo matcha un verbo?
  const azione = matchVerbo(corpo);
  if (!azione) return null;

  return { trigger, azioni: [azione] };
}

function matchVerbo(corpo: string): Azione | null {
  const senzaPunto = corpo.replace(/[.;]\s*$/, "");
  for (const v of VERBI) {
    const m = senzaPunto.match(v.regex);
    if (m) return v.build(m);
  }
  return null;
}

// Rimuove le parentesi-promemoria che spiegano le keyword,
// es. "Frenesia (questa unità può attaccare due volte...)" -> "Frenesia"
function rimuoviParentesi(testo: string): string {
  return testo.replace(/\s*\([^)]*\)/g, "");
}
