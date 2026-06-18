# Censimento carte — legalità formato Start Mobile

> Esito della validazione delle carte dei 3 tipi legali (Creatura, Magia, Leader) contro il regolamento `DESIGN_V1.md`.
> Le carte sono **condivise** col formato Leader: questo file NON modifica le schede, ne definisce solo il comportamento/adattamento nel formato Start Mobile.

> **AGGIORNAMENTO 2026-06-18 — reattività piena + blocco.** Due decisioni hanno avvicinato il combattimento di Start Mobile a quello classico:
> 1. **Reattività piena:** distinzione Istante/Sorcery mantenuta, stack + priorità + Istanti nel turno avversario (`DESIGN_V1.md` §6.5) → il cluster counterspell torna legale.
> 2. **Il blocco esiste** (§6): combattimento attacco/blocco, Provocazione = forza i blocchi (stile Richiamo). → tutte le keyword/reminder che dipendono dal blocco (Volo, Portata, Inafferrabile, Frenesia, Travolta, Gelo) tornano **valide e funzionanti**.
>
> Conseguenza: il **problema del file condiviso quasi sparisce**. Le uniche differenze reali tra i due formati restano: i 5 Leader (Evoluzione + doppio Rientro, tagliati in v1) e il **mana colorato → energia** (Marika, keyword Nexus).

## Riepilogo (aggiornato)

| Tipo | Analizzate | ✅ Compatibili | ⚠️ Da adattare | ❌ Da riprogettare |
|---|---|---|---|---|
| Leader mono | 5 | 1 | 4 | 0 |
| Creature mono | 41 | 36 | 5 | 0 |
| Magie mono | 35 | 35 | 0 | 0 |
| **Totale** | **81** | **72** | **9** | **0** |

- Carte multi-fazione (bi/tri/quad/penta): **nessuna esiste ancora** → legali solo nel formato Leader quando verranno create.
- Carte Nomadi (incolori) di tipo Creatura/Magia: **non esistono ancora** → candidate utili da creare (sempre legali in Start Mobile).

---

## I 9 adattamenti residui

Dopo reattività e blocco, restano solo **due temi**, nessuno è un'incompatibilità:

1. **Pulizia Leader (4 carte):** tutti i Leader portano **Evoluzione** + doppio **Rientro A/B**, tagliati da v1 (§4.3). Da rimuovere per il formato Start Mobile.
2. **Mana colorato → energia (Marika + Tessitore del Nexus):** la generazione di mana colorato non ha senso con l'energia automatica; va riletta come energia o rimossa.
3. *(minori)* alcune **reminder da verificare** non legate al blocco: Resistenza ("immune ai danni nel turno in cui entra" — coerenza col danno persistente), l'abilità col tap di Lanciafiamme, il timing di Incendio (fase di fine turno unica).

**Risolti dalle due decisioni:** counterspell/copie reattive (stack), e tutte le keyword/reminder di blocco (Volo, Portata, Inafferrabile, Frenesia, Travolta, Gelo) — ora valide in entrambi i formati, quindi **nessun testo divergente da gestire** su quelle carte.

---

## Leader mono

| Leader | Fazione | Esito | Nota |
|---|---|---|---|
| Shai, Lama del Conclave | Sud | ✅ | Volo ora funzionante. Solo pulizia comune (vedi sotto), nessun ridisegno. |
| Vaelos, l'Equilibrio | Centro | ⚠️ | Rimuovere Evoluzione + doppio Rientro. Hero Power ok. |
| Kazet, il Corrotto | Est | ⚠️ | Rimuovere Evoluzione + Rientro. Sanguinamento ok col danno persistente. |
| Marika, Radice Eterna | Ovest | ⚠️ | Passiva genera mana Ovest → convertire in +1 energia. Più pulizia comune. |
| Xirlia, Custode di Sohl | Nord | ⚠️ | Hero Power counter **legale** (stack). Resta solo la pulizia comune. |

> Pulizia comune ai 5 Leader: rimuovere **Evoluzione** e il doppio **Rientro A/B** (tagliati in v1). Shai è ✅ perché la pulizia è formale e condivisa, non un suo difetto.

---

## Creature — esito per carta

Tutte ✅ tranne le 5 indicate.

| Carta | Fazione | Esito | Adattamento |
|---|---|---|---|
| Guardiano della Foresta · Driade delle Radici · Druido Apprendista · Elfo Cacciatore · Folletto del Bosco · Grande Bestia Ancestrale · Sylvara · Lyren | Ovest | ✅ | — |
| Soldato delle Braci · Urian · Fiammifera · Berserker di Caleth · Evocatore di Fiamme | Sud | ✅ | Velocità/Travolta/token ok |
| Signore delle Fiamme | Sud | ✅ | Frenesia ora funzionante (blocco esiste) |
| Drago di Caleth | Sud | ✅ | Volo ora funzionante |
| Custode Glaciale · Elar · Vryn del Permafrost | Nord | ✅ | — |
| Aelth della Tormenta | Nord | ✅ | Volo ora funzionante |
| Cacciatrice Artica | Nord | ✅ | Portata ora funzionante (può bloccare Volo) |
| Muro di Ghiaccio Vivo | Nord | ✅ | muro ora sensato (il blocco esiste) |
| Strega Lamentante · Leth il Prosciugato · Lich Minore · Scheletro Errante · Necromante di Endal · Mordeth · Vampiro della Cripta | Est | ✅ | mill/Lamento/Revoca/cura ok |
| Ombra Silenziosa | Est | ✅ | Inafferrabile ora funzionante (bloccabile da max 1) |
| Serafino di Mid Vael · Angelo Custode · Accolito di Vael · Giudice Eterno · Paladino Novizio | Centro | ✅ | Volo/Scudo/cura ok |
| Aelith, Voce di Vael · Vaelos il Silenzioso | Centro | ✅ | Riflesso ora legale (stack) |
| Lanciafiamme | Sud | ⚠️ | abilità attivata col tap: chiarire fase azioni |
| Cendrath il Bruciante | Sud | ⚠️ | Incendio: riallineare alla fase di fine turno unica |
| Leviatano di Ghiaccio | Nord | ⚠️ | reminder Resistenza da verificare col danno persistente |
| Soldato del Gelo | Nord | ⚠️ | reminder Resistenza da verificare col danno persistente |
| Tessitore del Nexus | Centro | ⚠️ | Nexus genera mana colorato → convertire in energia |

---

## Magie — esito per carta

**Tutte le 35 Magie sono ✅.** La distinzione Istante/Sorcery si mantiene; il blocco e lo stack rendono validi tutti i testi (reminder Gelo/Frenesia/Travolta, counterspell, copie reattive). Nessun adattamento necessario.

| Sottotipo | Carte |
|---|---|
| Istante | Eco di Vael, Specchio del Nexus, Mano di Vael, Editto Glaciale, Visione del Nord, Scudo di Brina, Riflesso del Permafrost, Raffica Gelida, Lancia di Fiamme, Doppia Fiamma, Furia delle Braci, Sussurro di Endal, Tocco del Prosciugatore, Maledizione del Lich, Sussurro delle Foglie, Eco del Vecchio Bosco, Patto delle Radici |
| Sorcery | Apoteosi di Mid Vael, Benedizione di Vael, Riallineamento del Nexus, Editto del Centro, Tempesta di Brina, Inverno Eterno, Cataclisma di Cendrath, Incendio Doloso, Sigillo di Caleth, Carica Vulcanica, Voce dei Sepolti, Patto col Falcemortis, Veglia di Mordeth, Ritorno dalle Ombre, Convergenza Arcana, Risveglio di Faelorn (rispettare cap board 6), Germoglio di Faelorn, Visione di Lyren |
