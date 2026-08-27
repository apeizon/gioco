# Spec — Motore carte: parser prosa→JSON + validatore

**Data:** 2026-06-10
**Slice:** Formato carte + grammatica + parser + validatore (NO runtime)
**Stato:** approvato (design), pronto per piano implementazione

---

## 1. Obiettivo

Sbloccare il socio sulle ~100 carte ancora da scrivere (su 317 attuali) definendo un
formato che il **motore legge in automatico**, senza ricodifica manuale carta-per-carta.

Il socio continua a scrivere carte in **prosa italiana** (markdown), ma seguendo una
**grammatica di frasi-template**. Un **parser** converte la prosa in **JSON strutturato**
che il futuro motore di gioco eseguirà. Le carte troppo strane per la grammatica vengono
**flaggate (CAT3)** e finiscono in un file condiviso, senza mai bloccare il socio.

### Cosa NON include questo slice (slice futuri)
- Esecuzione effetti in partita (runtime: turni, stack, combattimento)
- Handler codice custom per le carte CAT3 (si scrivono dopo, una per una)
- UI / collegamento all'app

In una riga: **traduttore prosa→JSON + validatore**. Il gioco non si gioca ancora.

---

## 2. Decisioni prese (brainstorming)

| Tema | Decisione |
|---|---|
| Chi scrive i dati motore | Socio scrive **prosa vincolata**; un **parser** converte. Niente YAML a mano. |
| Edge case non parsabili (~12%, CAT3) | **Flag automatico** + voce in file condiviso `MOTORE-DA-FARE.md`. Socio non si blocca. |
| Scope | Solo formato + grammatica + parser + validatore. Runtime dopo. |
| Feedback al socio | File `MOTORE-DA-FARE.md` **tracciato in git**, aggiornato in automatico. |
| Chi aggiorna il file | **CI GitHub Action** su push/PR. Zero passaggi manuali, zero dipendenze locali. |
| Regola targeting | Proprietario **omesso** nel testo ("tutte le creature", "ogni creatura") ⇒ `TUTTI` (entrambi i campi). Solo "tua/e" o "avversaria/e" restringe. |

---

## 3. Architettura

### 3.1 Pipeline

```
carta .md (campo | Effetto | / | Keyword | / | Bonus | in prosa vincolata)
        │
        ▼
   PARSER  ── legge frasi-template, mappa su ~53 verbi
        │
        ├─► CAT1/CAT2 riconosciute → struttura JSON valida
        └─► non riconosciuta       → flag CAT3
        │
        ▼
  VALIDATORE  ── classifica ogni carta: OK / CAT3 / ERRORE-sintassi
        │
        ▼
  2 output:
   1. dist-motore/carte.json   (dati strutturati, pronti per motore futuro)
   2. MOTORE-DA-FARE.md         (lista CAT3 + errori sintassi)
        │
        ▼
  CI GitHub Action (push/PR): gira validatore, committa i 2 output
```

### 3.2 Componenti (unità isolate)

| Unità | File | Cosa fa | Dipende da |
|---|---|---|---|
| Estrattore | `motore/src/estrai-carta.ts` | Legge un .md, estrae campi tabella (Tipo, Costo, Effetto, Keyword, Bonus, ATK/DEF…) | — |
| Grammatica | `motore/src/grammatica.ts` | Tabelle dati: trigger, verbi (~53), keyword, target | — |
| Schema | `motore/src/schema.ts` | Tipi TypeScript dello schema strutturato | — |
| Parser | `motore/src/parser.ts` | prosa effetto → JSON strutturato, o flag CAT3 | grammatica, schema |
| Validatore | `motore/src/validatore.ts` | gira parser su tutte le carte, classifica, produce i 2 output | estrattore, parser |
| CLI | `motore/src/cli.ts` | entrypoint `npm run valida` | validatore |

Ogni unità testabile in isolamento. Il parser è il cuore; ha la suite test più grossa (TDD).

### 3.3 Tech
- **Node + TypeScript** (stesso ecosistema dello stack app Expo/RN del repo).
- Modulo isolato in `motore/` con proprio `package.json` (non interferisce con l'app).
- Test con il runner già in uso nel repo (o `vitest` se assente — da confermare in fase piano).

---

## 4. Grammatica (la parte che il socio segue)

Ogni effetto si scrive come una o più frasi nella forma:

```
TRIGGER: AZIONE su TARGET [valore]
```

Effetti multipli = frasi separate da `. ` o `;`. Vive come cheat-sheet in
`docs/motore/grammatica.md` (fonte di verità).

### 4.1 TRIGGER (vocabolario chiuso)

| Frase socio | trigger |
|---|---|
| "Quando entra in campo:" | `etb` |
| "Quando muore:" / "Quando va al Cimitero:" | `morte` |
| "Mentre è in campo:" | `passiva` |
| "All'inizio del Mantenimento [di ogni giocatore]:" | `upkeep` |
| "Quando attacca:" | `attacco` |
| "Quando blocca:" | `blocco` |
| "Quando viene attivata:" / "{T}:" | `attivata` |

(Lista completa formalizzata in fase implementazione, estesa dai pattern osservati sulle 317 carte.)

### 4.2 TARGET — con regola default proprietario

```
[quantificatore] [tipo] [filtro] [proprietario]

  quantificatore : una | ogni | tutte le | X
  tipo           : creatura | giocatore | avamposto | carta | …
  filtro         : attaccante | con costo ≤N | di tipo Driade | con DEF≥N | …
  proprietario   : tua/e | avversaria/e | (OMESSO → TUTTI)
```

**Regola chiave:** quando il proprietario è omesso, `proprietario = "TUTTI"` (creature di
entrambi i campi). Vale identica per "tutte le creature" e "ogni creatura".

### 4.3 AZIONE — ~53 verbi (vocabolario catalogato)

Frasi-template fisse mappate 1:1 su verbi. Esempi:

| Frase socio | verbo |
|---|---|
| "infliggi N danni a [target]" | `infliggi_danno` |
| "[target] guadagna +N ATK/DEF" | `modifica_stat` |
| "genera un token Nome X/Y [sotto controllo di Z]" | `genera_token` |
| "pesca N carte" | `pesca` |
| "distruggi [target]" | `distruggi` |
| "congela [target] per N turni" | `congela` |
| "cerca nel mazzo [filtro]" | `cerca_mazzo` |

**Vocabolario completo = i ~53 verbi catalogati nell'analisi precedente**, formalizzati
nello spec grammatica. Lista iniziale (da rifinire):
`infliggi_danno, modifica_stat, genera_token, pesca, distruggi, congela,
cerca_mazzo, evoca_token_tipizzato, rimanda_in_mano (bounce), genera_mana,
genera_mana_fazione, guadagna_hp, perdi_hp, milla, scry, carica_segnalino,
sanguinamento_segnalino, converti_stat, intercetta_attacco, annulla_spell,
evoluzione, non_può_attaccare, extra_combat_attack, reset_globale_counter,
aggiungi_scudo_counter, riduci_danno_globale, preveni_velocita,
non_stapparsi_sveglia_avversario, tappa_con_skip_sveglia, eco_stack,
rimetti_in_fondo, reset_stat_a_valore_stampato, blocca_cura, delayed_damage,
auto_equip_ETB, gioca_da_cimitero_avversario, …` (~53 totali)

### 4.4 KEYWORD (CAT1) — vocabolario chiuso, nessuna logica da parsare
`Vedetta, Frenesia, Velocità, Protezione, Travolta, Resilienza, Lamento, …`
Mappate 1:1; la carta è CAT1 se ha solo keyword + stat (nessun effetto componibile).

### 4.5 Regole di scrittura per il socio
- Una frase = un trigger + le sue azioni; effetti multipli = frasi separate.
- Usare **solo** verbi/keyword del vocabolario (cheat-sheet 1 pagina).
- Numeri come cifre (`+1`, `3 danni`).
- Meccanica fuori vocabolario → scrive comunque in prosa; il validatore la flagga CAT3
  (non si blocca).

---

## 5. Schema strutturato (output JSON)

Per ogni effetto:

```json
{
  "trigger": "etb",
  "condizione": null,
  "azioni": [
    {
      "verbo": "modifica_stat",
      "target": { "tipo": "creatura", "filtro": "attaccante", "proprietario": "TUTTI" },
      "stat": "ATK",
      "valore": 1
    }
  ],
  "categoria": "CAT2"
}
```

Una carta nel `carte.json` finale:

```json
{
  "id": "FORGIA_DELLA_FIAMMA",
  "file": "carte/santuari/santuari-sud/FORGIA_DELLA_FIAMMA.md",
  "nome": "Forgia della Fiamma",
  "tipo": "Santuario",
  "fazione": "Sud",
  "costo": "2 Sud + 1",
  "keyword": [],
  "effetti": [ { "...": "..." } ],
  "categoria": "CAT2"
}
```

`categoria ∈ { CAT1, CAT2, CAT3 }`. CAT3 = nessun campo `effetti` parsato; conserva la
prosa grezza + il motivo del flag.

### 5.1 Esempi reali end-to-end

**FORGIA** — `"Tutte le creature attaccanti guadagnano +1 ATK."`
```json
{ "trigger":"passiva", "azioni":[{ "verbo":"modifica_stat",
  "target":{"tipo":"creatura","filtro":"attaccante","proprietario":"TUTTI"},
  "stat":"ATK","valore":1 }], "categoria":"CAT2" }
```

**MORDETH** (parte 2) — `"ogni creatura che muore genera un token Non-Morto 1/1 sotto il tuo controllo."`
```json
{ "trigger":"morte",
  "target":{"tipo":"creatura","proprietario":"TUTTI"},
  "azioni":[{ "verbo":"genera_token",
    "token":{"nome":"Non-Morto","atk":1,"def":1,"controllore":"tu"} }],
  "categoria":"CAT2" }
```
Nota: con la regola `TUTTI` + verbo `genera_token`, Mordeth (prima ipotizzata CAT3)
diventa **CAT2** esprimibile.

**KETH** (leader — conversione danno→segnalino con soglia mobile) → nessuna frase-template
combacia → **flag CAT3** → voce in `MOTORE-DA-FARE.md`.

---

## 6. Output e file

### 6.1 Struttura repo

```
gioco/
├─ carte/ … leader/ …            ← carte .md (invariate, fonte)
├─ motore/                       ← NUOVO, tooling slice
│  ├─ src/
│  │  ├─ estrai-carta.ts
│  │  ├─ grammatica.ts
│  │  ├─ schema.ts
│  │  ├─ parser.ts
│  │  ├─ validatore.ts
│  │  └─ cli.ts
│  ├─ test/
│  └─ package.json               ← script: valida, build, test
├─ docs/motore/
│  └─ grammatica.md              ← cheat-sheet socio (fonte di verità)
├─ dist-motore/
│  └─ carte.json                 ← output dati strutturati (committato)
├─ MOTORE-DA-FARE.md             ← output lista CAT3 + errori (committato, auto)
└─ .github/workflows/
   └─ valida-carte.yml           ← CI
```

### 6.2 `MOTORE-DA-FARE.md` (auto-generato)

```markdown
# Motore — carte da fare a mano
<!-- AUTO-GENERATO dal validatore. Non modificare a mano. -->
Ultimo aggiornamento: commit abc1234

## ⚠️ CAT3 — serve codice custom (N)
| Carta | File | Motivo |
|---|---|---|
| Keth | leader/quad-.../KETH.md | conversione danno→segnalino soglia mobile |

## ❌ Errori sintassi — il socio deve correggere (N)
| Carta | File | Riga | Problema |
|---|---|---|---|
| Forgia | carte/.../FORGIA.md | 9 | verbo "potenzia" non in vocabolario → usa "guadagna +N ATK" |

## ✅ Riepilogo
317 carte · 280 OK · 4 CAT3 · 1 errore
```

Distinzione netta:
- **CAT3** = ok ma serve codice custom (lavoro Luca/Claude). NON blocca la CI.
- **Errore sintassi** = il socio ha usato una frase fuori grammatica, deve correggere. BLOCCA la CI.

### 6.3 CI — `.github/workflows/valida-carte.yml`

Su `push` e `pull_request`:
1. `npm ci` in `motore/`
2. `npm run valida` → rigenera `dist-motore/carte.json` + `MOTORE-DA-FARE.md`
3. Se i file cambiano → **commit automatico** ("🤖 aggiorna motore") sul branch
4. Se ci sono **errori sintassi** → CI **rossa** (PR bloccata finché corretti).
   Solo CAT3 → CI **verde** (non blocca).

→ Il socio pusha, dopo ~1 min vede file aggiornati + spunta verde/rossa.

### 6.4 Validazione locale (opzionale)
Stesso `npm run valida` lanciabile a mano per feedback istantaneo. Non obbligatorio
(la CI fa da rete), ma disponibile.

---

## 7. Criteri di successo

1. Un socio, leggendo solo `docs/motore/grammatica.md`, scrive una carta nuova e — se usa
   il vocabolario — la vede parsata `OK` senza intervento di Luca.
2. `npm run valida` su tutte le 317 carte esistenti produce `carte.json` + `MOTORE-DA-FARE.md`
   coerenti, con classificazione CAT1/CAT2/CAT3 + errori.
3. La regola targeting `TUTTI` (proprietario omesso) è applicata correttamente.
4. Una carta con frase fuori vocabolario produce **errore sintassi** con file+riga+suggerimento.
5. Una carta con meccanica fuori grammatica produce **flag CAT3** (non errore) e finisce nel file.
6. CI su push aggiorna i file in automatico; errori sintassi rendono la CI rossa, CAT3 no.

---

## 8. Rischi e mitigazioni

| Rischio | Mitigazione |
|---|---|
| Le 317 carte esistenti non rispettano ancora la grammatica | Primo `valida` fa da censimento: gli scostamenti emergono come errori/CAT3; si normalizzano gradualmente. |
| Grammatica troppo rigida → troppi CAT3 | Vocabolario derivato dai pattern reali già osservati (88–95% copertura). Si estende quando un pattern ricorre. |
| Commit automatico CI in loop | La CI committa solo se il contenuto cambia; il commit bot è escluso dal trigger (`paths-ignore` / check autore). |
| Ambiguità frasi (es. "ogni" vs "tutte") | Trattate identiche dalla regola `TUTTI`; documentato nel cheat-sheet. |
```
