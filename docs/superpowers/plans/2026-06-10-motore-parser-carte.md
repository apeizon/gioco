# Motore Parser Carte — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Costruire un traduttore che converte le carte scritte in prosa vincolata (markdown) in JSON strutturato, classifica ogni carta CAT1/CAT2/CAT3, e produce un file condiviso con le carte che servono codice custom — così il socio scrive carte compatibili col futuro motore senza intervento manuale.

**Architecture:** Modulo TypeScript standalone in `motore/`. Pipeline: estrattore (markdown→record) → parser data-driven (prosa→effetti JSON, guidato da tabelle in `grammatica.ts`) → classificatore (CAT1/2/3) → validatore (gira su tutte le carte) → 2 output (`dist-motore/carte.json` + `MOTORE-DA-FARE.md`). Il parser è generico: il vocabolario (trigger, verbi, keyword) vive in dati, quindi aggiungere un verbo = aggiungere una riga senza toccare il codice del parser. CI GitHub Action rigenera gli output su push.

**Tech Stack:** TypeScript, Node 24, vitest (test), tsx (run CLI). Nessuna dipendenza dall'app Expo (modulo isolato con proprio `package.json`).

---

## File Structure

```
gioco/
├─ motore/
│  ├─ package.json              # deps: typescript, vitest, tsx; scripts valida/test/build
│  ├─ tsconfig.json
│  ├─ src/
│  │  ├─ schema.ts              # tipi: Carta, Effetto, Azione, Target, Categoria
│  │  ├─ estrai-carta.ts        # markdown .md → RecordCarta (campi tabella grezzi)
│  │  ├─ target.ts              # stringa "tutte le creature avversarie" → Target (regola TUTTI)
│  │  ├─ grammatica.ts          # tabelle dati: TRIGGER, VERBI, KEYWORD
│  │  ├─ parser.ts              # testo effetto → {effetti[]} | CAT3 ; usa grammatica + target
│  │  ├─ classifica.ts          # RecordCarta + risultato parse → Categoria
│  │  ├─ validatore.ts          # gira su tutte le carte → modello output
│  │  ├─ report.ts              # modello → testo MOTORE-DA-FARE.md
│  │  └─ cli.ts                 # entrypoint: legge carte, scrive carte.json + report
│  └─ test/
│     ├─ fixtures/              # carte .md di test
│     ├─ estrai-carta.test.ts
│     ├─ target.test.ts
│     ├─ parser.test.ts
│     ├─ classifica.test.ts
│     ├─ validatore.test.ts
│     └─ report.test.ts
├─ docs/motore/grammatica.md    # cheat-sheet socio
├─ dist-motore/carte.json       # OUTPUT (committato)
├─ MOTORE-DA-FARE.md            # OUTPUT (committato, auto)
└─ .github/workflows/valida-carte.yml
```

---

## Task 1: Scaffold modulo `motore/`

**Files:**
- Create: `motore/package.json`
- Create: `motore/tsconfig.json`
- Create: `motore/test/smoke.test.ts`

- [ ] **Step 1: Crea `motore/package.json`**

```json
{
  "name": "gioco-motore",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "valida": "tsx src/cli.ts"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vitest": "^2.1.0",
    "tsx": "^4.19.0"
  }
}
```

- [ ] **Step 2: Crea `motore/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vitest/globals"]
  },
  "include": ["src", "test"]
}
```

- [ ] **Step 3: Crea smoke test `motore/test/smoke.test.ts`**

```ts
import { test, expect } from "vitest";

test("toolchain funziona", () => {
  expect(1 + 1).toBe(2);
});
```

- [ ] **Step 4: Installa e lancia**

Run: `cd motore && npm install && npm test`
Expected: 1 test PASS (`toolchain funziona`).

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/Gioco\ Alessandro/gioco
echo "motore/node_modules/" >> .gitignore
git add motore/package.json motore/package-lock.json motore/tsconfig.json motore/test/smoke.test.ts .gitignore
git commit -m "chore(motore): scaffold modulo parser (ts + vitest)"
```

---

## Task 2: Tipi schema (`schema.ts`)

**Files:**
- Create: `motore/src/schema.ts`

- [ ] **Step 1: Scrivi i tipi**

```ts
// Proprietario di un bersaglio. TUTTI = regola: quando il testo non specifica.
export type Proprietario = "TUE" | "AVVERSARIO" | "TUTTI";

export type Categoria = "CAT1" | "CAT2" | "CAT3";

export interface Target {
  tipo: string;               // "creatura" | "giocatore" | "avamposto" | ...
  filtro?: string;            // "attaccante" | "costo<=3" | "tipo:Driade" | "def>=4"
  proprietario: Proprietario;
  quantificatore?: "una" | "ogni" | "tutte";
}

export interface Azione {
  verbo: string;              // es. "modifica_stat", "genera_token"
  target?: Target;
  // parametri liberi specifici del verbo (stat, valore, token, durata, ...)
  [param: string]: unknown;
}

export interface Effetto {
  trigger: string;            // "etb" | "morte" | "passiva" | "upkeep" | ...
  azioni: Azione[];
}

export interface CartaParsata {
  id: string;                 // nome file senza estensione
  file: string;               // path relativo repo
  nome: string;
  tipo: string;
  fazione?: string;
  costo?: string;
  keyword: string[];
  effetti: Effetto[];
  categoria: Categoria;
  motivoCat3?: string;        // se CAT3: perché non parsata
}
```

- [ ] **Step 2: Verifica compilazione**

Run: `cd motore && npx tsc --noEmit`
Expected: nessun errore.

- [ ] **Step 3: Commit**

```bash
git add motore/src/schema.ts
git commit -m "feat(motore): tipi schema strutturato carte"
```

---

## Task 3: Estrattore markdown (`estrai-carta.ts`)

Legge un file .md carta e restituisce i campi grezzi della tabella + nome.

**Files:**
- Create: `motore/src/estrai-carta.ts`
- Create: `motore/test/estrai-carta.test.ts`
- Create: `motore/test/fixtures/forgia.md`

- [ ] **Step 1: Crea fixture `motore/test/fixtures/forgia.md`**

```markdown
# Forgia della Fiamma

| Campo | Valore |
|---|---|
| **Tipo** | Santuario |
| **Fazione** | Sud |
| **Costo** | 2 Sud + 1 |
| **Effetto** | Tutte le creature attaccanti guadagnano +1 ATK. |
```

- [ ] **Step 2: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { estraiCarta } from "../src/estrai-carta.js";
import { readFileSync } from "node:fs";

test("estrae nome e campi tabella", () => {
  const md = readFileSync(new URL("./fixtures/forgia.md", import.meta.url), "utf8");
  const r = estraiCarta(md, "carte/santuari/santuari-sud/FORGIA.md");
  expect(r.nome).toBe("Forgia della Fiamma");
  expect(r.file).toBe("carte/santuari/santuari-sud/FORGIA.md");
  expect(r.campi["Tipo"]).toBe("Santuario");
  expect(r.campi["Effetto"]).toBe("Tutte le creature attaccanti guadagnano +1 ATK.");
});

test("normalizza grassetto e spazi nei nomi campo", () => {
  const md = "# X\n\n| Campo | Valore |\n|---|---|\n| **Keyword** | Vedetta |\n";
  const r = estraiCarta(md, "x.md");
  expect(r.campi["Keyword"]).toBe("Vedetta");
});
```

- [ ] **Step 3: Run test (FAIL)**

Run: `cd motore && npx vitest run test/estrai-carta.test.ts`
Expected: FAIL — `estraiCarta is not a function`.

- [ ] **Step 4: Implementa**

```ts
export interface RecordCarta {
  nome: string;
  file: string;
  campi: Record<string, string>;
}

const RIGA_TABELLA = /^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/;

export function estraiCarta(markdown: string, file: string): RecordCarta {
  const righe = markdown.split(/\r?\n/);
  let nome = "";
  const campi: Record<string, string> = {};

  for (const riga of righe) {
    if (!nome) {
      const titolo = riga.match(/^#\s+(.+?)\s*$/);
      if (titolo) {
        nome = titolo[1];
        continue;
      }
    }
    const m = riga.match(RIGA_TABELLA);
    if (!m) continue;
    const chiave = pulisci(m[1]);
    const valore = m[2].trim();
    // salta header e separatori
    if (chiave === "Campo" || /^-+$/.test(chiave)) continue;
    campi[chiave] = valore;
  }

  return { nome, file, campi };
}

function pulisci(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}
```

- [ ] **Step 5: Run test (PASS)**

Run: `cd motore && npx vitest run test/estrai-carta.test.ts`
Expected: 2 test PASS.

- [ ] **Step 6: Commit**

```bash
git add motore/src/estrai-carta.ts motore/test/estrai-carta.test.ts motore/test/fixtures/forgia.md
git commit -m "feat(motore): estrattore campi tabella markdown"
```

---

## Task 4: Parser target con regola TUTTI (`target.ts`)

Cuore della regola di design: proprietario omesso ⇒ `TUTTI`.

**Files:**
- Create: `motore/src/target.ts`
- Create: `motore/test/target.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { parseTarget } from "../src/target.js";

test("proprietario omesso = TUTTI", () => {
  expect(parseTarget("tutte le creature").proprietario).toBe("TUTTI");
  expect(parseTarget("ogni creatura").proprietario).toBe("TUTTI");
});

test("avversaria/e = AVVERSARIO", () => {
  expect(parseTarget("tutte le creature avversarie").proprietario).toBe("AVVERSARIO");
  expect(parseTarget("una creatura avversaria").proprietario).toBe("AVVERSARIO");
});

test("tua/tue = TUE", () => {
  expect(parseTarget("le tue creature").proprietario).toBe("TUE");
});

test("estrae tipo e quantificatore", () => {
  const t = parseTarget("tutte le creature");
  expect(t.tipo).toBe("creatura");
  expect(t.quantificatore).toBe("tutte");
});

test("estrae filtro attaccante", () => {
  expect(parseTarget("tutte le creature attaccanti").filtro).toBe("attaccante");
});

test("estrae filtro costo", () => {
  expect(parseTarget("creature con costo totale pari o inferiore a 3").filtro).toBe("costo<=3");
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/target.test.ts`
Expected: FAIL — `parseTarget is not a function`.

- [ ] **Step 3: Implementa**

```ts
import type { Target, Proprietario } from "./schema.js";

export function parseTarget(testo: string): Target {
  const t = testo.toLowerCase();

  const proprietario: Proprietario =
    /\bavversari[ae]\b|\bnemic[hia]\b/.test(t) ? "AVVERSARIO" :
    /\btu[ae]\b|\btuo\b|\btuoi\b/.test(t) ? "TUE" :
    "TUTTI";

  const quantificatore =
    /\btutte le\b|\btutti i\b/.test(t) ? "tutte" :
    /\bogni\b|\bciascun[ao]?\b/.test(t) ? "ogni" :
    /\buna?\b/.test(t) ? "una" : undefined;

  const tipo =
    /creatur[ae]/.test(t) ? "creatura" :
    /giocator[ei]/.test(t) ? "giocatore" :
    /avampost[oi]/.test(t) ? "avamposto" :
    "creatura";

  const filtro = estraiFiltro(t);

  return { tipo, proprietario, quantificatore, ...(filtro ? { filtro } : {}) };
}

function estraiFiltro(t: string): string | undefined {
  if (/attaccant[ei]/.test(t)) return "attaccante";
  const costo = t.match(/costo (?:totale )?pari o inferiore a (\d+)/);
  if (costo) return `costo<=${costo[1]}`;
  const def = t.match(/def pari o superiore a (\d+)/);
  if (def) return `def>=${def[1]}`;
  const tipoCreatura = t.match(/di tipo ([a-zà-ù, eo]+?)(?: guadagn| ottien|$)/);
  if (tipoCreatura) return `tipo:${tipoCreatura[1].trim()}`;
  return undefined;
}
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/target.test.ts`
Expected: 6 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/target.ts motore/test/target.test.ts
git commit -m "feat(motore): parser target con regola TUTTI"
```

---

## Task 5: Tabelle grammatica (`grammatica.ts`)

Dati guidano il parser. Trigger come pattern; verbi come pattern→builder; keyword come set.

**Files:**
- Create: `motore/src/grammatica.ts`
- Create: `motore/test/grammatica.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { TRIGGER, KEYWORD, VERBI } from "../src/grammatica.js";

test("trigger morte riconosce 'quando muore'", () => {
  const hit = TRIGGER.find((tr) => tr.regex.test("quando muore"));
  expect(hit?.id).toBe("morte");
});

test("keyword set contiene Frenesia", () => {
  expect(KEYWORD.has("frenesia")).toBe(true);
});

test("esiste verbo modifica_stat", () => {
  expect(VERBI.some((v) => v.verbo === "modifica_stat")).toBe(true);
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/grammatica.test.ts`
Expected: FAIL — modulo non trovato.

- [ ] **Step 3: Implementa**

```ts
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
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/grammatica.test.ts`
Expected: 3 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/grammatica.ts motore/test/grammatica.test.ts
git commit -m "feat(motore): tabelle grammatica (trigger, keyword, verbi iniziali)"
```

---

## Task 6: Parser effetto (`parser.ts`)

Orchestrazione: testo effetto → `Effetto[]` o segnale CAT3.

**Files:**
- Create: `motore/src/parser.ts`
- Create: `motore/test/parser.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { parseEffetto } from "../src/parser.js";

test("FORGIA: passiva + modifica_stat TUTTI", () => {
  const r = parseEffetto("Tutte le creature attaccanti guadagnano +1 ATK.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(1);
  const e = r.effetti[0];
  expect(e.trigger).toBe("passiva");
  expect(e.azioni[0].verbo).toBe("modifica_stat");
  expect(e.azioni[0].target?.proprietario).toBe("TUTTI");
  expect(e.azioni[0].valore).toBe(1);
});

test("MORDETH parte 2: trigger morte + genera_token", () => {
  const r = parseEffetto("Quando muore: genera un token Non-Morto 1/1 sotto il tuo controllo.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  const e = r.effetti[0];
  expect(e.trigger).toBe("morte");
  expect(e.azioni[0].verbo).toBe("genera_token");
  expect((e.azioni[0].token as any).controllore).toBe("tu");
});

test("frase fuori vocabolario => CAT3", () => {
  const r = parseEffetto("Riavvolge il tempo di tre turni e inverte le sorti del fato.");
  expect(r.ok).toBe(false);
});

test("piu' frasi separate da punto", () => {
  const r = parseEffetto("Pesca 1 carta. Infliggi 2 danni a una creatura avversaria.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(2);
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/parser.test.ts`
Expected: FAIL — `parseEffetto is not a function`.

- [ ] **Step 3: Implementa**

```ts
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
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/parser.test.ts`
Expected: 4 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/parser.ts motore/test/parser.test.ts
git commit -m "feat(motore): parser effetto (trigger + verbi + multi-frase)"
```

---

## Task 7: Classificatore (`classifica.ts`)

Decide CAT1/CAT2/CAT3 da record + esito parse.

**Files:**
- Create: `motore/src/classifica.ts`
- Create: `motore/test/classifica.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { classifica } from "../src/classifica.js";
import { KEYWORD } from "../src/grammatica.js";

test("solo keyword, nessun effetto => CAT1", () => {
  const r = classifica({ effettoOk: true, numEffetti: 0, keyword: ["vedetta"] });
  expect(r.categoria).toBe("CAT1");
});

test("effetti parsati => CAT2", () => {
  const r = classifica({ effettoOk: true, numEffetti: 1, keyword: [] });
  expect(r.categoria).toBe("CAT2");
});

test("parse fallito => CAT3 con motivo", () => {
  const r = classifica({ effettoOk: false, numEffetti: 0, keyword: [], motivo: "frase X" });
  expect(r.categoria).toBe("CAT3");
  expect(r.motivoCat3).toBe("frase X");
});

test("KEYWORD esportato e usabile", () => {
  expect(KEYWORD.has("vedetta")).toBe(true);
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/classifica.test.ts`
Expected: FAIL — modulo non trovato.

- [ ] **Step 3: Implementa**

```ts
import type { Categoria } from "./schema.js";

export interface InputClassifica {
  effettoOk: boolean;
  numEffetti: number;
  keyword: string[];
  motivo?: string;
}

export interface EsitoClassifica {
  categoria: Categoria;
  motivoCat3?: string;
}

export function classifica(i: InputClassifica): EsitoClassifica {
  if (!i.effettoOk) {
    return { categoria: "CAT3", motivoCat3: i.motivo ?? "effetto non parsabile" };
  }
  if (i.numEffetti === 0) {
    return { categoria: "CAT1" }; // vanilla / solo keyword
  }
  return { categoria: "CAT2" };
}
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/classifica.test.ts`
Expected: 4 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/classifica.ts motore/test/classifica.test.ts
git commit -m "feat(motore): classificatore CAT1/CAT2/CAT3"
```

---

## Task 8: Validatore (`validatore.ts`)

Mette insieme estrattore + parser + classificatore su un record carta. Sceglie quali campi contengono effetti.

**Files:**
- Create: `motore/src/validatore.ts`
- Create: `motore/test/validatore.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { validaCarta } from "../src/validatore.js";

test("carta santuario => CAT2 con effetti", () => {
  const c = validaCarta({
    nome: "Forgia della Fiamma",
    file: "carte/x/FORGIA.md",
    campi: {
      Tipo: "Santuario",
      Fazione: "Sud",
      Costo: "2 Sud + 1",
      Effetto: "Tutte le creature attaccanti guadagnano +1 ATK.",
    },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.id).toBe("FORGIA");
  expect(c.effetti).toHaveLength(1);
  expect(c.fazione).toBe("Sud");
});

test("carta solo keyword => CAT1", () => {
  const c = validaCarta({
    nome: "Sentinella",
    file: "x/SENT.md",
    campi: { Tipo: "Creatura", Keyword: "Vedetta", "ATK / DEF": "2 / 3" },
  });
  expect(c.categoria).toBe("CAT1");
  expect(c.keyword).toContain("vedetta");
});

test("effetto strano => CAT3 con motivo", () => {
  const c = validaCarta({
    nome: "Keth",
    file: "leader/KETH.md",
    campi: { Tipo: "Leader", Effetto: "Converte ogni danno subito in segnalini soglia mobile." },
  });
  expect(c.categoria).toBe("CAT3");
  expect(c.motivoCat3).toBeTruthy();
});

test("legge effetti anche da Bonus e Malus", () => {
  const c = validaCarta({
    nome: "Tragedia X",
    file: "x/T.md",
    campi: { Tipo: "Tragedia", Bonus: "Pesca 1 carta.", Malus: "Infliggi 1 danno a una creatura avversaria." },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.effetti.length).toBeGreaterThanOrEqual(2);
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/validatore.test.ts`
Expected: FAIL — `validaCarta is not a function`.

- [ ] **Step 3: Implementa**

```ts
import type { RecordCarta } from "./estrai-carta.js";
import type { CartaParsata, Effetto } from "./schema.js";
import { parseEffetto } from "./parser.js";
import { classifica } from "./classifica.js";
import { KEYWORD } from "./grammatica.js";

// Campi che possono contenere effetti in prosa.
const CAMPI_EFFETTO = ["Effetto", "Bonus", "Malus", "Eco"];

export function validaCarta(rec: RecordCarta): CartaParsata {
  const id = rec.file.split("/").pop()!.replace(/\.md$/, "");
  const keyword = estraiKeyword(rec.campi["Keyword"]);

  const effetti: Effetto[] = [];
  let okTotale = true;
  let motivo: string | undefined;

  for (const campo of CAMPI_EFFETTO) {
    const testo = rec.campi[campo];
    if (!testo || testo === "—") continue;
    const r = parseEffetto(testo);
    if (r.ok) {
      effetti.push(...r.effetti);
    } else {
      okTotale = false;
      motivo = motivo ?? `[${campo}] ${r.motivo}`;
    }
  }

  const cls = classifica({
    effettoOk: okTotale,
    numEffetti: effetti.length,
    keyword,
    motivo,
  });

  return {
    id,
    file: rec.file,
    nome: rec.nome,
    tipo: rec.campi["Tipo"] ?? "",
    fazione: rec.campi["Fazione"],
    costo: rec.campi["Costo"],
    keyword,
    effetti: cls.categoria === "CAT3" ? [] : effetti,
    categoria: cls.categoria,
    ...(cls.motivoCat3 ? { motivoCat3: cls.motivoCat3 } : {}),
  };
}

function estraiKeyword(campo?: string): string[] {
  if (!campo) return [];
  // prima parola/e prima di una parentesi o ":" è il nome keyword
  const nome = campo.split(/[(:]/)[0].trim().toLowerCase();
  return KEYWORD.has(nome) ? [nome] : [];
}
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/validatore.test.ts`
Expected: 4 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/validatore.ts motore/test/validatore.test.ts
git commit -m "feat(motore): validatore carta (estrai+parse+classifica)"
```

---

## Task 9: Generatore report (`report.ts`)

Modello carte → testo `MOTORE-DA-FARE.md`.

**Files:**
- Create: `motore/src/report.ts`
- Create: `motore/test/report.test.ts`

- [ ] **Step 1: Scrivi il test (FAIL)**

```ts
import { test, expect } from "vitest";
import { generaReport } from "../src/report.js";
import type { CartaParsata } from "../src/schema.js";

const carte: CartaParsata[] = [
  { id: "FORGIA", file: "carte/FORGIA.md", nome: "Forgia", tipo: "Santuario", keyword: [], effetti: [{ trigger: "passiva", azioni: [] }], categoria: "CAT2" },
  { id: "KETH", file: "leader/KETH.md", nome: "Keth", tipo: "Leader", keyword: [], effetti: [], categoria: "CAT3", motivoCat3: "soglia mobile" },
];

test("report elenca CAT3 e riepilogo", () => {
  const txt = generaReport(carte, "abc1234");
  expect(txt).toContain("AUTO-GENERATO");
  expect(txt).toContain("abc1234");
  expect(txt).toContain("Keth");
  expect(txt).toContain("soglia mobile");
  expect(txt).toContain("2 carte");   // totale
  expect(txt).toContain("1 CAT3");
  expect(txt).not.toContain("Forgia"); // CAT2 non elencata nel dettaglio
});
```

- [ ] **Step 2: Run test (FAIL)**

Run: `cd motore && npx vitest run test/report.test.ts`
Expected: FAIL — modulo non trovato.

- [ ] **Step 3: Implementa**

```ts
import type { CartaParsata } from "./schema.js";

export function generaReport(carte: CartaParsata[], commit: string): string {
  const cat3 = carte.filter((c) => c.categoria === "CAT3");
  const cat1 = carte.filter((c) => c.categoria === "CAT1").length;
  const cat2 = carte.filter((c) => c.categoria === "CAT2").length;

  const righeCat3 = cat3.length
    ? cat3.map((c) => `| ${c.nome} | ${c.file} | ${c.motivoCat3 ?? ""} |`).join("\n")
    : "| — | — | nessuna |";

  return `# Motore — carte da fare a mano
<!-- AUTO-GENERATO dal validatore. Non modificare a mano. -->
Ultimo aggiornamento: commit ${commit}

## ⚠️ CAT3 — serve codice custom (${cat3.length})
| Carta | File | Motivo |
|---|---|---|
${righeCat3}

## ✅ Riepilogo
${carte.length} carte · ${cat1} CAT1 · ${cat2} CAT2 · ${cat3.length} CAT3
`;
}
```

- [ ] **Step 4: Run test (PASS)**

Run: `cd motore && npx vitest run test/report.test.ts`
Expected: 1 test PASS.

- [ ] **Step 5: Commit**

```bash
git add motore/src/report.ts motore/test/report.test.ts
git commit -m "feat(motore): generatore MOTORE-DA-FARE.md"
```

---

## Task 10: CLI (`cli.ts`)

Entrypoint: scansiona le carte, scrive `dist-motore/carte.json` + `MOTORE-DA-FARE.md`. Exit code 1 se ci sono errori sintassi (per far fallire la CI). CAT3 non fallisce.

**Files:**
- Create: `motore/src/cli.ts`

- [ ] **Step 1: Implementa la CLI**

```ts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { globSync } from "node:fs";
import { execSync } from "node:child_process";
import { estraiCarta } from "./estrai-carta.js";
import { validaCarta } from "./validatore.js";
import { generaReport } from "./report.js";
import type { CartaParsata } from "./schema.js";

const ROOT = new URL("../../", import.meta.url).pathname; // repo root
const PATTERN = ["carte/**/*.md", "leader/**/*.md"];

function trovaCarte(): string[] {
  return PATTERN.flatMap((p) => globSync(p, { cwd: ROOT })).sort();
}

function commitCorrente(): string {
  try { return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim(); }
  catch { return "sconosciuto"; }
}

function main(): void {
  const files = trovaCarte();
  const carte: CartaParsata[] = files.map((rel) => {
    const md = readFileSync(ROOT + rel, "utf8");
    return validaCarta(estraiCarta(md, rel));
  });

  mkdirSync(ROOT + "dist-motore", { recursive: true });
  writeFileSync(ROOT + "dist-motore/carte.json", JSON.stringify(carte, null, 2) + "\n");
  writeFileSync(ROOT + "MOTORE-DA-FARE.md", generaReport(carte, commitCorrente()));

  const cat3 = carte.filter((c) => c.categoria === "CAT3").length;
  console.log(`${carte.length} carte · ${cat3} CAT3 → dist-motore/carte.json + MOTORE-DA-FARE.md`);
}

main();
```

> Nota: `globSync` da `node:fs` è disponibile in Node 24. Se l'ambiente lo segnala instabile, sostituire con il pacchetto `glob` (aggiungere a `devDependencies`). Confermare al primo run.

- [ ] **Step 2: Run sulla collezione reale**

Run: `cd motore && npm run valida`
Expected: stampa "317 carte · N CAT3 → ..."; crea `dist-motore/carte.json` e `MOTORE-DA-FARE.md`.

- [ ] **Step 3: Ispeziona output**

Run: `cd ~/Desktop/Gioco\ Alessandro/gioco && head -40 MOTORE-DA-FARE.md`
Expected: header AUTO-GENERATO + tabella CAT3 + riepilogo con 317 carte.

- [ ] **Step 4: Commit**

```bash
git add motore/src/cli.ts dist-motore/carte.json MOTORE-DA-FARE.md
git commit -m "feat(motore): CLI valida + primo output su 317 carte"
```

---

## Task 11: Cheat-sheet socio (`docs/motore/grammatica.md`)

Documento che il socio legge per scrivere carte parsabili.

**Files:**
- Create: `docs/motore/grammatica.md`

- [ ] **Step 1: Scrivi il cheat-sheet**

```markdown
# Come scrivere gli effetti delle carte (per il motore)

Scrivi ogni effetto come frasi nella forma:  **TRIGGER: AZIONE su BERSAGLIO.**
Più effetti = più frasi separate da punto.

## Regola bersagli
- "tutte le creature" / "ogni creatura" = **tutte, tue + avversario**.
- Aggiungi "**avversarie**" o "**tue**" per restringere.

## Trigger (inizio frase)
| Scrivi | Significato |
|---|---|
| Quando entra in campo: | all'ingresso |
| Quando muore: | alla morte |
| Mentre è in campo: | continuo |
| All'inizio del Mantenimento: | a inizio turno |
| Quando attacca: / Quando blocca: | in combattimento |

Senza trigger esplicito = effetto continuo (passiva).

## Azioni disponibili (vocabolario)
| Scrivi così | Esempio |
|---|---|
| [bersaglio] guadagnano +N ATK/DEF | Tutte le creature guadagnano +1 ATK. |
| infliggi N danni a [bersaglio] | Infliggi 2 danni a una creatura avversaria. |
| pesca N carte | Pesca 1 carta. |
| genera N mana COLORE | Genera 1 mana Sud. |
| genera un token Nome X/Y [sotto il tuo controllo] | genera un token Spettro 1/1 sotto il tuo controllo. |
| distruggi [bersaglio] | Distruggi una creatura avversaria. |

(Lista in crescita: se ti serve un'azione che non c'è, scrivi comunque in italiano
normale — la carta verrà segnata in `MOTORE-DA-FARE.md` come "da fare a mano",
e tu vai avanti senza bloccarti.)

## Keyword (si scrivono nel campo Keyword)
Vedetta · Frenesia · Velocità · Protezione · Travolta · Resilienza · Lamento
```

- [ ] **Step 2: Commit**

```bash
git add docs/motore/grammatica.md
git commit -m "docs(motore): cheat-sheet grammatica per il socio"
```

---

## Task 12: CI GitHub Action

Su push/PR: installa, valida, committa output se cambiati, fallisce se errori sintassi.

**Files:**
- Create: `.github/workflows/valida-carte.yml`

- [ ] **Step 1: Scrivi il workflow**

```yaml
name: Valida carte motore

on:
  push:
    paths: ["carte/**", "leader/**", "motore/**"]
  pull_request:
    paths: ["carte/**", "leader/**", "motore/**"]

jobs:
  valida:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
      - name: Installa deps motore
        working-directory: motore
        run: npm ci
      - name: Test motore
        working-directory: motore
        run: npm test
      - name: Valida carte (rigenera output)
        working-directory: motore
        run: npm run valida
      - name: Committa output se cambiati
        if: github.event_name == 'push'
        run: |
          if [[ -n "$(git status --porcelain dist-motore MOTORE-DA-FARE.md)" ]]; then
            git config user.name "motore-bot"
            git config user.email "bot@users.noreply.github.com"
            git add dist-motore MOTORE-DA-FARE.md
            git commit -m "🤖 aggiorna motore (carte.json + MOTORE-DA-FARE.md)"
            git push
          fi
```

> Gli **errori di sintassi** fanno fallire `npm test` o producono CAT3? Per design, una frase fuori vocabolario = CAT3 (non blocca). Un vero errore strutturale (markdown rotto) farà eccezione nella CLI → step rosso. Se in futuro si vuole bloccare anche su categorie specifiche, aggiungere un check di soglia qui.

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/valida-carte.yml
git commit -m "ci(motore): GitHub Action valida + auto-commit output"
```

---

## Task 13: Run completo + triage CAT3

Verifica end-to-end sulla collezione reale e annota lo stato.

**Files:**
- Modify: `MOTORE-DA-FARE.md` (rigenerato)
- Modify: `dist-motore/carte.json` (rigenerato)

- [ ] **Step 1: Run completo + tutti i test**

Run: `cd motore && npm test && npm run valida`
Expected: tutti i test PASS; stampa riepilogo 317 carte.

- [ ] **Step 2: Conta le categorie**

Run: `cd ~/Desktop/Gioco\ Alessandro/gioco && tail -3 MOTORE-DA-FARE.md`
Expected: riga riepilogo `317 carte · X CAT1 · Y CAT2 · Z CAT3`.

- [ ] **Step 3: Verifica una CAT2 e una CAT3 nel JSON**

Run: `cd ~/Desktop/Gioco\ Alessandro/gioco && node -e "const c=require('./dist-motore/carte.json'); console.log(c.find(x=>x.id==='FORGIA_DELLA_FIAMMA')); console.log(c.filter(x=>x.categoria==='CAT3').slice(0,3).map(x=>x.nome))"`
Expected: Forgia con effetto `modifica_stat` / target `TUTTI`; lista di alcune CAT3.

- [ ] **Step 4: Commit finale output**

```bash
git add dist-motore/carte.json MOTORE-DA-FARE.md
git commit -m "chore(motore): output rigenerato su collezione completa"
```

- [ ] **Step 5: Push branch e apri PR**

```bash
git push -u origin feature/motore-parser-carte
```
Poi aprire PR verso `main` (workflow repo: branch + PR, mai push diretto su main).

---

## Self-Review (eseguita)

**Spec coverage:**
- Grammatica frasi-template → Task 5, 11 ✓
- Schema strutturato → Task 2 ✓
- Parser prosa→JSON → Task 4, 6 ✓
- Regola TUTTI → Task 4 (cuore) ✓
- Classificazione CAT1/2/3 → Task 7, 8 ✓
- Output carte.json → Task 10 ✓
- MOTORE-DA-FARE.md (CAT3) → Task 9 ✓
- CI auto-commit → Task 12 ✓
- Validazione locale → Task 10 (`npm run valida`) ✓
- Cheat-sheet socio → Task 11 ✓

**Note di scope:** il vocabolario verbi parte da ~6 verbi ad alta frequenza (Task 5) e cresce a dati. NON costruiamo tutti i ~53 in anticipo (YAGNI): il run su 317 carte (Task 13) rivela quali pattern ricorrono, e ogni verbo nuovo = una riga in `VERBI` + un test, seguendo il pattern di Task 5. Questo è esplicito nel cheat-sheet e nei rischi dello spec.

**Type consistency:** `parseTarget`, `parseEffetto`, `validaCarta`, `classifica`, `generaReport` usati coerentemente; tipi da `schema.ts` condivisi. `RisultatoParse.motivo` ↔ `InputClassifica.motivo` ↔ `motivoCat3` allineati.
```
