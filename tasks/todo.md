# TASK — Lancio Set Mono Iniziale

> Mazzo: 60 carte totali (incluso Leader). Solo mono-fazione al primo lancio.

---

## Stato

- [x] 5 Leader mono (Xirlia/Shai/Kazet/Marika/Vaelos)
- [x] 41 Creature mono (8-9 per fazione)
- [x] Avamposti — tutte le tipologie mono coperte
- [ ] Magie mono
- [ ] Artefatti / Equipaggiamenti mono
- [ ] Santuari mono
- [ ] Satelliti mono
- [ ] Tragedie mono
- [ ] Benedizioni mono

---

## FASE 1 — Magie mono (in corso)

Target: 7 magie per fazione (mix Sorcery/Istante, mix rarità, mix Comune→Eterno).

- [x] **1.1 — Magie Nord** (7 carte: Raffica Gelida, Scudo di Brina, Tempesta di Brina, Riflesso del Permafrost, Editto Glaciale, Visione del Nord, Inverno Eterno)
- [x] **1.2 — Magie Sud** (7 carte: Lancia di Fiamme, Furia delle Braci, Incendio Doloso, Doppia Fiamma, Sigillo di Caleth, Carica Vulcanica, Cataclisma di Cendrath)
- [x] **1.3 — Magie Est** (7 carte: Sussurro di Endal, Tocco del Prosciugatore, Voce dei Sepolti, Ritorno dalle Ombre, Maledizione del Lich, Patto col Falcemortis, Veglia di Mordeth)
- [x] **1.4 — Magie Ovest** (7 carte: Sussurro delle Foglie, Germoglio di Faelorn, Eco del Vecchio Bosco, Visione di Lyren, Patto delle Radici, Convergenza Arcana, Risveglio di Faelorn)
- [x] **1.5 — Magie Centro** (7 carte: Mano di Vael, Benedizione di Vael, Eco di Vael, Riallineamento del Nexus, Specchio del Nexus, Editto del Centro, Apoteosi di Mid Vael)

## FASE 2 — Artefatti / Equipaggiamenti

- [x] **2.0 — Nomadi (incolori)** — 20 carte: 6 Artefatti classici + 8 Artefatti Creatura + 6 Equipaggiamenti
- [x] **2.1 — Nord** (5 carte: Cristallo Gelido, Stendardo del Baluardo, Sentinella Glaciale, Armatura Glaciale, Sigillo del Permafrost)
- [x] **2.2 — Sud** (5 carte: Carbone Ardente, Bandiera della Frenesia, Berserker di Bronzo, Lama Incandescente, Forgia di Caleth)
- [x] **2.3 — Est** (5 carte: Brandello di Sudario, Stendardo dei Lamenti, Lich-Costrutto, Cinto di Endal, Calice del Falcemortis)
- [x] **2.4 — Ovest** (5 carte: Pietra Rúnica, Stendardo del Bosco Antico, Custode Druida, Mantello del Druido, Anello Arcano del Bosco)
- [x] **2.5 — Centro** (5 carte: Frammento del Nexus, Stendardo dell'Assorbimento, Sentinella del Nexus, Mantello del Riflesso, Specchio Centrale)

## FASE 3 — Santuari + Satelliti

- [x] 3.1 — Nord (4 Santuari + 4 Satelliti)
- [x] 3.2 — Sud (4 Santuari + 4 Satelliti)
- [x] 3.3 — Est (4 Santuari + 4 Satelliti)
- [x] 3.4 — Ovest (4 Santuari + 4 Satelliti)
- [x] 3.5 — Centro (4 Santuari + 4 Satelliti)
- [x] 3.0 — Nomadi (8 Santuari + 8 Satelliti)
- **FASE 3 COMPLETA** — 56 carte totali (28 Santuari + 28 Satelliti)

## FASE 4 — Tragedie + Benedizioni

Struttura: **3 Tragedie + 3 Benedizioni per fazione**. Meccanica Eco introdotta per Tragedie (vedi REGOLE_BASE_TCG.md §5.6).

- [x] 4.0 — Nomadi (3 Tragedie + 3 Benedizioni)
- [x] 4.1 — Nord
- [x] 4.2 — Sud
- [ ] 4.3 — Est
- [ ] 4.4 — Ovest
- [ ] 4.5 — Centro

> ⏸️ Fase 4 in pausa (4.3 Est / 4.4 Ovest / 4.5 Centro mancanti): si lavora prima al formato Start Mobile. Da riprendere — vedi promemoria.

---

# FORMATO START MOBILE (regolamento di Luca — `FORMATO_START_MOBILE/DESIGN_V1.md`)

> Formato parallelo, snello, che esce per primo. Stesse carte del mondo, regole proprie (energia automatica, 3 tipi di carta, combat alla Hearthstone, Obiettivi Segreti). Non sovrascrive nulla del formato Leader.

## SM-1 — Regolamento e meccaniche-firma

- [x] **SM-1.1 — Pool Obiettivi v1** (`FORMATO_START_MOBILE/OBIETTIVI_START_MOBILE.md`): 22 ranked + 6 casual, telegrafo a 3 stati, doppia via di vittoria. Calibrazione difficoltà da validare in playtest.
- [x] **SM-1.2 — Reattività piena** (DESIGN_V1.md §6.5): Istanti nel turno avversario, stack LIFO + priorità, finestra di risposta in combattimento, energia trattenuta (§2). ⚠️ Reverse di §3/§6/§11 → **da coordinare con Luca** (impatta il motore).

## SM-2 — Validazione carte per la legalità Start Mobile

- [x] SM-2.1 — Censite Creature/Magie/Leader (81 carte). Esito in `FORMATO_START_MOBILE/CENSIMENTO_CARTE.md`: 44 ✅ / 33 ⚠️ / 4 ❌.
- [x] SM-2.2 — Segnate le carte da adattare e i 4 problemi sistematici.

## SM-3 — Adattamento carte (20 ⚠️; le carte sono CONDIVISE col formato Leader → decidere il modello)

- [ ] SM-3.1 — Decidere il modello: layer di rulings/errata Start Mobile (non tocca le schede) vs reprint dedicati vs campo per-formato.
- [x] ~~SM-3.2 — Riprogettare il cluster reattivo~~ → NON serve più: con la reattività piena counterspell/copie/Riflesso/Hero Power di Xirlia sono **legali**.
- [ ] SM-3.3 — Bonifica reminder che citano il blocco (Volo, Gelo, Travolta, Frenesia, Portata, Inafferrabile) — il blocco resta tagliato.
- [ ] SM-3.4 — Conversione mana colorato → energia (Marika, keyword Nexus).
- [ ] SM-3.5 — Pulizia Leader (rimuovere Evoluzione + doppio Rientro per il formato Start Mobile).
