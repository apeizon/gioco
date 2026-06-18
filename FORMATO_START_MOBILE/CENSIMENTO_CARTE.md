# Censimento carte — legalità formato Start Mobile

> Esito della validazione delle carte dei 3 tipi legali (Creatura, Magia, Leader) contro il regolamento `DESIGN_V1.md`.
> Le carte sono **condivise** col formato Leader: questo file NON modifica le schede, ne definisce solo il comportamento/adattamento nel formato Start Mobile.

> **AGGIORNAMENTO 2026-06-18 — reattività piena.** Decisione: il formato Start Mobile mantiene la distinzione **Istante / Sorcery** e reintroduce **stack + priorità + Istanti giocabili nel turno avversario** (vedi `DESIGN_V1.md` §6.5). Conseguenze sul censimento:
> - Sparisce il problema "etichetta Istante/Sorcery da rimuovere": la distinzione **si tiene**.
> - L'intero **cluster reattivo** (counterspell e copie di Magie avversarie) **torna legale**: con lo stack ha di nuovo senso.
> - **Resta tagliato il blocco** (combat ad attacco diretto): le keyword/reminder che dipendono dal blocco restano da bonificare.

## Riepilogo (aggiornato)

| Tipo | Analizzate | ✅ Compatibili | ⚠️ Da adattare | ❌ Da riprogettare |
|---|---|---|---|---|
| Leader mono | 5 | 1 | 4 | 0 |
| Creature mono | 41 | 30 | 11 | 0 |
| Magie mono | 35 | 30 | 5 | 0 |
| **Totale** | **81** | **61** | **20** | **0** |

- Carte multi-fazione (bi/tri/quad/penta): **nessuna esiste ancora** come carta giocabile → legali solo nel formato Leader quando verranno create.
- Carte Nomadi (incolori) di tipo Creatura/Magia: **non esistono ancora**. Sarebbero molto utili in Start Mobile (sempre legali in ogni mazzo) → candidate da creare.

---

## I problemi residui (dopo la decisione sulla reattività)

Tutti gli adattamenti rimasti ruotano attorno a **3 temi**, nessuno è più una vera incompatibilità di design:

1. **Keyword/clausole dipendenti dal blocco = inerti.** Il blocco resta tagliato: **Volo**, **Portata** (Cacciatrice Artica), **Inafferrabile** (Ombra Silenziosa), clausola "non può essere bloccato" di **Frenesia**. Le carte restano giocabili (spesso come vanilla); le reminder vanno riscritte e a Volo serve un nuovo significato.
2. **Reminder che citano il blocco.** Reminder di **Gelo** ("può ancora bloccare") e di **Travolta** ("danno al bloccante"): correzioni testuali, l'effetto sottostante è compatibile.
3. **Generazione di mana colorato → energia.** Passiva di **Marika** e keyword **Nexus** (Tessitore del Nexus): da rileggere come "energia" o rimuovere.

**Risolti dalla decisione sulla reattività:** counterspell e copie reattive (Eco di Vael, Specchio del Nexus, Riflesso del Permafrost, Mano di Vael, keyword Riflesso, Hero Power di Xirlia) → ora **legali** grazie allo stack. Le etichette Istante/Sorcery → **si tengono**, nessun intervento.

**In linea perfettamente:** tutto il pacchetto Est (mill, Lamento, Revoca, rianimazione), la cura (valorizzata dal danno persistente), i contatori permanenti, Provocazione/Velocità/Travolta, il rispetto del cap board 6, e ora l'intero pacchetto di Magie reattive del Centro/Nord.

---

## Pulizia comune ai 5 Leader

Tutti e 5 i Leader mono portano il campo **Evoluzione** e il doppio **Rientro A/B**, entrambi tagliati da v1 (§4.3). È una pulizia sistematica, indipendente dalla reattività.

| Leader | Fazione | Esito | Nota |
|---|---|---|---|
| Shai, Lama del Conclave | Sud | ✅ | Più vicino al pronto. Volo inerte (niente blocco). Solo pulizia comune. |
| Vaelos, l'Equilibrio | Centro | ⚠️ | Rimuovere Evoluzione + doppio Rientro. Hero Power ok. |
| Kazet, il Corrotto | Est | ⚠️ | Rimuovere Evoluzione. Sanguinamento ok col danno persistente (verificare keyword). |
| Marika, Radice Eterna | Ovest | ⚠️ | Passiva genera mana Ovest → convertire in +1 energia o altro beneficio. |
| Xirlia, Custode di Sohl | Nord | ⚠️ | Hero Power counter ora **legale** (stack). Resta solo la pulizia comune (Evoluzione + Rientro). |

---

## Creature — esito per carta

| Carta | Fazione | Esito | Adattamento |
|---|---|---|---|
| Guardiano della Foresta | Ovest | ✅ | — |
| Driade delle Radici | Ovest | ✅ | — |
| Druido Apprendista | Ovest | ✅ | — |
| Elfo Cacciatore | Ovest | ✅ | — |
| Folletto del Bosco | Ovest | ✅ | — |
| Grande Bestia Ancestrale | Ovest | ✅ | — |
| Sylvara, Custode di Faelorn | Ovest | ✅ | — |
| Lyren, Anziana del Bosco | Ovest | ✅ | — |
| Soldato delle Braci | Sud | ✅ | Velocità |
| Urian, Lama di Uria | Sud | ✅ | Velocità + Travolta |
| Fiammifera | Sud | ✅ | — |
| Berserker di Caleth | Sud | ✅ | — |
| Evocatore di Fiamme | Sud | ✅ | token nel cap 6 |
| Custode Glaciale | Nord | ✅ | — |
| Elar, Sovrano del Permafrost | Nord | ✅ | Vedetta |
| Vryn del Permafrost | Nord | ✅ | — |
| Strega Lamentante | Est | ✅ | Lamento |
| Leth il Prosciugato | Est | ✅ | Revoca + mill |
| Lich Minore | Est | ✅ | — |
| Scheletro Errante | Est | ✅ | Revoca |
| Necromante di Endal | Est | ✅ | — |
| Mordeth, il Falcemortis | Est | ✅ | — |
| Vampiro della Cripta | Est | ✅ | cura |
| Serafino di Mid Vael | Centro | ✅ | Volo inerte, Scudo ok |
| Angelo Custode | Centro | ✅ | Volo inerte |
| Accolito di Vael | Centro | ✅ | cura |
| Giudice Eterno | Centro | ✅ | — |
| Paladino Novizio | Centro | ✅ | Scudo |
| Aelith, Voce di Vael | Centro | ✅ | Riflesso ora **legale** (stack). Protezione ok. |
| Vaelos il Silenzioso | Centro | ✅ | Riflesso ora **legale** (stack). Buff passivo ok. |
| Signore delle Fiamme | Sud | ⚠️ | Frenesia: rimuovere clausola "non bloccabile" → "attacca due volte" |
| Lanciafiamme | Sud | ⚠️ | abilità attivata col tap: chiarire fase azioni |
| Drago di Caleth | Sud | ⚠️ | reminder Volo cita il blocco |
| Cendrath il Bruciante | Sud | ⚠️ | Incendio: riallineare alla fase di fine turno unica |
| Aelth della Tormenta | Nord | ⚠️ | reminder Volo cita il blocco |
| Leviatano di Ghiaccio | Nord | ⚠️ | reminder Resistenza da verificare |
| Cacciatrice Artica | Nord | ⚠️ | Portata priva di funzione (niente blocco) → rimuovere/riprogettare keyword |
| Soldato del Gelo | Nord | ⚠️ | reminder Resistenza da verificare |
| Muro di Ghiaccio Vivo | Nord | ⚠️ | muro senza blocco: valutare aggiunta Provocazione |
| Ombra Silenziosa | Est | ⚠️ | Inafferrabile priva di funzione (niente blocco) → rimuovere/riprogettare |
| Tessitore del Nexus | Centro | ⚠️ | Nexus genera mana colorato → convertire in energia |

---

## Magie — esito per carta

> La distinzione Istante/Sorcery **si mantiene**: le carte conservano il loro sottotipo. Restano ⚠️ solo quelle con reminder che citano il blocco.

| Carta | Fazione | Sottotipo | Esito | Adattamento |
|---|---|---|---|---|
| Apoteosi di Mid Vael | Centro | Sorcery | ✅ | — |
| Benedizione di Vael | Centro | Sorcery | ✅ | cura valorizzata dal danno persistente |
| Riallineamento del Nexus | Centro | Sorcery | ✅ | — |
| Editto del Centro | Centro | Sorcery | ✅ | — |
| Eco di Vael | Centro | Istante | ✅ | copia Magia avversaria: **legale** con lo stack |
| Specchio del Nexus | Centro | Istante | ✅ | counterspell: **legale** con lo stack |
| Mano di Vael | Centro | Istante | ✅ | protezione reattiva: **legale**, giocabile in risposta |
| Editto Glaciale | Nord | Istante | ✅ | — |
| Visione del Nord | Nord | Istante | ✅ | — |
| Scudo di Brina | Nord | Istante | ✅ | trick difensivo ora pienamente sensato (reattivo) |
| Riflesso del Permafrost | Nord | Istante | ✅ | counterspell: **legale** con lo stack |
| Lancia di Fiamme | Sud | Istante | ✅ | — |
| Cataclisma di Cendrath | Sud | Sorcery | ✅ | — |
| Incendio Doloso | Sud | Sorcery | ✅ | — |
| Doppia Fiamma | Sud | Istante | ✅ | copia TUA Magia Sud |
| Furia delle Braci | Sud | Istante | ✅ | — |
| Sussurro di Endal | Est | Istante | ✅ | — |
| Voce dei Sepolti | Est | Sorcery | ✅ | mill |
| Patto col Falcemortis | Est | Sorcery | ✅ | — |
| Tocco del Prosciugatore | Est | Istante | ✅ | — |
| Maledizione del Lich | Est | Istante | ✅ | contatore permanente |
| Veglia di Mordeth | Est | Sorcery | ✅ | mill + gioca dal cimitero |
| Ritorno dalle Ombre | Est | Sorcery | ✅ | rianimazione |
| Sussurro delle Foglie | Ovest | Istante | ✅ | scry |
| Eco del Vecchio Bosco | Ovest | Istante | ✅ | copia TUA Magia |
| Convergenza Arcana | Ovest | Sorcery | ✅ | pesca + sconto energia |
| Risveglio di Faelorn | Ovest | Sorcery | ✅ | rispettare cap board 6 (eccesso fizzle) |
| Patto delle Radici | Ovest | Istante | ✅ | — |
| Germoglio di Faelorn | Ovest | Sorcery | ✅ | — |
| Visione di Lyren | Ovest | Sorcery | ✅ | — |
| Raffica Gelida | Nord | Istante | ⚠️ | reminder Gelo "può ancora bloccare" → correggere |
| Tempesta di Brina | Nord | Sorcery | ⚠️ | reminder Gelo → correggere |
| Inverno Eterno | Nord | Sorcery | ⚠️ | reminder Gelo → correggere |
| Sigillo di Caleth | Sud | Sorcery | ⚠️ | reminder Frenesia (anti-blocco) → correggere |
| Carica Vulcanica | Sud | Sorcery | ⚠️ | reminder Travolta ("danno al bloccante") → correggere |
