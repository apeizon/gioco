# Errata — formato Start Mobile

> Le carte sono **condivise** col formato Leader. Questo file definisce **come si comportano nel formato Start Mobile**, senza modificare le schede in `carte/` e `leader/`. Dove una carta non è elencata qui, vale il testo stampato.
> Dopo le decisioni su reattività piena (§6.5) e blocco (§6), le carte divergenti tra i due formati sono pochissime: sotto l'elenco completo.

---

## Regole generali (valgono per tutte le carte)

1. **Costi in "mana ⟨fazione⟩" = energia.** Un costo come "2 mana Nord" si paga con **2 energia** (l'energia non ha colore in Start Mobile; il colore resta solo identità di fazione — `DESIGN_V1.md` §2). Questo **non** è un'errata, è il funzionamento base: nessuna carta va cambiata per il colore del costo.
2. **Leader — Evoluzione ignorata.** Il campo *Evoluzione* di ogni Leader **non si applica** in Start Mobile (l'evoluzione del Leader è tagliata, §4.3).
3. **Leader — solo Rientro A.** Quando il Leader muore e torna in Zona di Comando, per rigiocarlo vale **solo il Rientro A** (costo base **+ incremento cumulativo** per ogni morte). Il *Rientro B* ("aspetta N turni → costo originale") **non si applica** (niente attesa gratuita, §4.3).

---

## Errata per carta (mana colorato → energia)

| Carta | Tipo | Testo stampato | In Start Mobile |
|---|---|---|---|
| **Marika, Radice Eterna** | Leader (Ovest) | Passiva: "All'inizio di ogni tuo turno, genera 1 mana Ovest aggiuntivo." | Passiva: "All'inizio di ogni tuo turno hai **+1 energia** (oltre la rigenerazione normale)." |
| **Shai, Lama del Conclave** | Leader (Sud) | Passiva: "La prima volta che una tua unità infligge danno diretto in un turno, guadagni 1 mana Sud." | Passiva: "La prima volta che una tua unità infligge danno diretto in un turno, guadagni **1 energia**." |
| **Tessitore del Nexus** | Creatura (Centro) | Keyword Nexus: "puoi tapparlo per generare 1 mana di qualsiasi fazione; rimane in campo". Effetto: "Ogni volta che generi mana tramite Nexus, recupera 1 HP." | Nexus: "puoi **tapparlo per ottenere 1 energia** utilizzabile questo turno; rimane in campo". Effetto: "Ogni volta che usi il Nexus, recupera 1 HP." |

---

## Chiarimenti (nessuna modifica al testo, solo come leggerlo in Start Mobile)

- **Xirlia, Custode di Sohl** — Hero Power "Annulla una spell o abilità avversaria prima che si risolva": **pienamente legale**, grazie allo stack/priorità (§6.5). Funziona come un controincantesimo.
- **Resistenza** (Leviatano di Ghiaccio, Soldato del Gelo) — "immune ai danni da combattimento nel turno in cui entra in campo": resta valida; col danno persistente significa che i danni di quel turno semplicemente non vengono inflitti (non che vengano rimossi dopo).
- **Lanciafiamme** — abilità attivata "tappalo: infliggi 1 danno": è un'abilità attivata della fase azioni; tapparlo come costo è valido (come per gli Hero Power). Non confondere col tap da attacco.
- **Incendio** (Cendrath il Bruciante) — il danno ritardato "alla prossima End Step" si riferisce all'unica **fase di fine turno** del modello a fase singola (§3).

---

## Tutto il resto

Le altre carte (creature, magie, leader) funzionano **così come stampate**: keyword di blocco (Volo, Portata, Inafferrabile, Frenesia, Travolta, Gelo) e Magie reattive (counterspell, copie) sono valide grazie a blocco (§6) e stack (§6.5). Vedi `CENSIMENTO_CARTE.md` per il dettaglio carta per carta.
