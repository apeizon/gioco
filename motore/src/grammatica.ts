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
  { id: "upkeep",   regex: /all'inizio del mantenimento|all'inizio del (?:tuo |proprio )?turno/ },
  { id: "attacco",  regex: /quando attacca|che dichiara un attacco/ },
  { id: "blocco",   regex: /quando blocca|che dichiara un blocco/ },
  { id: "attivata", regex: /quando viene attivata|\{t\}|^\s*\*{0,2}tappa\b/ },
];

// Default quando nessun trigger esplicito nella frase: passiva (effetto continuo).
export const TRIGGER_DEFAULT = "passiva";

export const KEYWORD = new Set<string>([
  "volo", "velocità", "prescienza", "baluardo", "vedetta", "protezione",
  "lamento", "travolta", "scudo", "revoca", "inafferrabile", "compromesso",
  "surriscaldamento", "resistenza", "portata", "nexus", "frenesia", "eco",
  "riflesso", "incendio", "esplosione", "carica", "assorbimento", "arcano",
  "resilienza",
]);

const KEYWORD_ALT = [...KEYWORD].join("|");

export interface RegolaVerbo {
  verbo: string;
  regex: RegExp;                          // cattura i parametri
  build: (m: RegExpMatchArray) => Azione; // costruisce l'azione
}

export const VERBI: RegolaVerbo[] = [
  {
    verbo: "modifica_stat_combo",
    regex: /(.+?)\s+(?:guadagna(?:no)?|ricevono?|riceve|ottengono?|ottiene)\s+([+\-]\d+)\s*atk\s*\/\s*([+\-]\d+)\s*def/i,
    build: (m) => ({ verbo: "modifica_stat_combo", target: parseTarget(m[1]), atk: Number(m[2]), def: Number(m[3]) }),
  },
  {
    verbo: "segnalino_stat",
    regex: /(.+?)\s+guadagna(?:no)?\s+un\s+segnalino\s+([+\-]\d+)\s*\/\s*([+\-]\d+)\s*(permanente)?/i,
    build: (m) => ({ verbo: "segnalino_stat", target: parseTarget(m[1]), atk: Number(m[2]), def: Number(m[3]), permanente: !!m[4] }),
  },
  {
    verbo: "modifica_stat_combo",
    regex: /(.+?)\s+(?:guadagna(?:no)?|ricevono?|riceve)\s+([+\-]\d+)\s*\/\s*([+\-]\d+)(?!\s*\w)/i,
    build: (m) => ({ verbo: "modifica_stat_combo", target: parseTarget(m[1]), atk: Number(m[2]), def: Number(m[3]) }),
  },
  {
    verbo: "applica_stat",
    regex: /applica\s+([+\-]\d+)\s*\/\s*([+\-]\d+)\s+a\s+(.+)/i,
    build: (m) => ({ verbo: "applica_stat", atk: Number(m[1]), def: Number(m[2]), target: parseTarget(m[3]) }),
  },
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
    verbo: "concedi_keyword",
    regex: new RegExp(`(.+?)\\s+(?:guadagna(?:no)?|hanno|ottengono?|ottiene)\\s+(${KEYWORD_ALT})\\b`, "i"),
    build: (m) => ({
      verbo: "concedi_keyword",
      target: parseTarget(m[1]),
      keyword: m[2].toLowerCase(),
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
    verbo: "mill",
    regex: /milla(?:no)?\s+(\d+)\s+cart/i,
    build: (m) => ({ verbo: "mill", valore: Number(m[1]) }),
  },
  {
    verbo: "mill",
    regex: /mette le prime (\d+) carte[^.]*cimitero/i,
    build: (m) => ({ verbo: "mill", valore: Number(m[1]) }),
  },
  {
    verbo: "mill",
    regex: /mette la prima carta[^.]*cimitero/i,
    build: () => ({ verbo: "mill", valore: 1 }),
  },
  {
    verbo: "genera_mana",
    regex: /genera\s+(\d+)\s+mana\s+([a-zà-ù]+)/i,
    build: (m) => ({ verbo: "genera_mana", valore: Number(m[1]), colore: m[2] }),
  },
  {
    verbo: "genera_mana",
    regex: /aggiungi\s+(\d+)\s+mana\s+(generic[oi]|[a-zà-ù]+)/i,
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
