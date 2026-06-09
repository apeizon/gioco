import type { Azione } from "./schema.js";
import { parseTarget } from "./target.js";

export interface RegolaTrigger {
  id: string;
  regex: RegExp;     // riconosce la frase d'apertura (lowercase)
}

export const TRIGGER: RegolaTrigger[] = [
  { id: "etb",      regex: /quando entra in campo/ },
  { id: "morte",    regex: /quando muore|va al cimitero|che muore/ },
  { id: "passiva",  regex: /mentre è in campo/ },
  { id: "upkeep",   regex: /all'inizio del mantenimento/ },
  { id: "attacco",  regex: /quando attacca|che dichiara un attacco/ },
  { id: "blocco",   regex: /quando blocca|che dichiara un blocco/ },
  { id: "attivata", regex: /quando viene attivata|\{t\}/ },
];

// Default quando nessun trigger esplicito nella frase: passiva (effetto continuo).
export const TRIGGER_DEFAULT = "passiva";

export const KEYWORD = new Set<string>([
  "vedetta", "frenesia", "velocità", "protezione",
  "travolta", "resilienza", "lamento",
]);

export interface RegolaVerbo {
  verbo: string;
  regex: RegExp;                          // cattura i parametri
  build: (m: RegExpMatchArray) => Azione; // costruisce l'azione
}

export const VERBI: RegolaVerbo[] = [
  {
    verbo: "modifica_stat",
    regex: /(.+?)\s+guadagnano?\s+([+\-]\d+)\s+(atk|def)/i,
    build: (m) => ({
      verbo: "modifica_stat",
      target: parseTarget(m[1]),
      stat: m[3].toUpperCase(),
      valore: Number(m[2]),
    }),
  },
  {
    verbo: "infliggi_danno",
    regex: /infliggi\s+(\d+)\s+dann[oi]\s+a\s+(.+)/i,
    build: (m) => ({
      verbo: "infliggi_danno",
      valore: Number(m[1]),
      target: parseTarget(m[2]),
    }),
  },
  {
    verbo: "pesca",
    regex: /pesca\s+(\d+)\s+cart[ae]/i,
    build: (m) => ({ verbo: "pesca", valore: Number(m[1]) }),
  },
  {
    verbo: "genera_mana",
    regex: /genera\s+(\d+)\s+mana\s+([a-zà-ù]+)/i,
    build: (m) => ({ verbo: "genera_mana", valore: Number(m[1]), colore: m[2] }),
  },
  {
    verbo: "genera_token",
    regex: /genera\s+un\s+token\s+(.+?)\s+(\d+)\/(\d+)(?:\s+sotto il (tuo) controllo)?/i,
    build: (m) => ({
      verbo: "genera_token",
      token: {
        nome: m[1].trim(),
        atk: Number(m[2]),
        def: Number(m[3]),
        controllore: m[4] ? "tu" : "evocatore",
      },
    }),
  },
  {
    verbo: "distruggi",
    regex: /distruggi\s+(.+)/i,
    build: (m) => ({ verbo: "distruggi", target: parseTarget(m[1]) }),
  },
];
