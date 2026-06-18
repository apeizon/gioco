# Design v1 — TCG dark-fantasy (versione commerciale snella)

> **Scopo del documento:** definire il gioco **v1 spedibile**, tagliato per mobile, retention e monetizzazione → obiettivo **exit**.
> Sostituisce operativamente `regole/REGOLE_BASE_TCG.md` (che resta come **riferimento del design completo "v2 avanzato"**).
> Data: 2026-06-11.

---

## 0. Decisioni di prodotto (perché questo doc esiste)

- **Obiettivo:** prodotto commerciale F2P mobile con metriche sane (D1/D7/D30 + ARPDAU) → **exit** (vendita a publisher/acquirer). Per un TCG senza IP l'exit si fa sulle **metriche**, non sul volume di contenuto. Quindi **tagliare è la strategia**, non un compromesso.
- **Mira estetica:** mix Marvel Snap × Magic (carte juicy, dark-fantasy). 3D leggero (URP), deve girare su telefoni di ~7-8 anni fa → VFX/texture dosati.
- **Filosofia di design:** poche leve, profonde (lezione Snap). Una sola meccanica-firma differenziante; tutto il resto tagliato al minimo per restare leggibile e veloce.
- **Meccanica-firma (la nostra anima):** la **corsa all'Obiettivo Segreto** — nessun competitor ce l'ha.

---

## 1. Forma del gioco v1 (sintesi)

```
Formato:        1v1 (niente FFA in v1)
Durata target:  5-7 minuti a partita
HP:             30
Energia:        automatica, +1 a turno (NIENTE terre/mana manuale)
Tipi di carta:  3 — Creatura · Magia · Leader
Mazzo:          30 carte + 1 Leader (Zona di Comando)
Mano iniziale:  5 · limite mano 7 · pesca 1/turno
Board:          max 6 slot creatura per giocatore
Obiettivo:      1 Obiettivo Segreto a testa, pescato da un pool curato
Vittoria:       HP avversario a 0  OPPURE  completa il tuo Obiettivo
Combat:         deterministico ATK vs DEF, niente stack/priorità
Monetizzazione: crediti (gratis giocando + rewarded ads, o comprabili) →
                pack + craft + cosmetici + battle pass. No cash-out, no scambio P2P.
```

Complessità totale ≈ Snap, ma con un gancio (l'Obiettivo) che Snap non ha.

---

## 2. Risorse — energia automatica

- **Niente Avamposti/terre, niente tap/untap per il mana.**
- Ogni giocatore ha **energia che sale di +1 all'inizio del proprio turno** (turno 1 = 1, …), fino a un **cap = 8** (deciso: i turni 9-10 a curva piena allungano troppo; la curva costi va disegnata su 1-8, le carte 7-8 sono i finisher).
- **Energia trattenuta (DECISO 2026-06-18):** l'energia **non spesa resta disponibile** — anche nel turno dell'avversario, per giocare Istanti in risposta (vedi §6.5) — **fino al tuo prossimo upkeep**. All'upkeep si **rigenera** al valore pieno del turno (= `min(numero del turno, 8)`): **non si accumula** tra un tuo turno e il successivo. Esempio: nel tuo turno hai 4 energia e ne spendi 2 → ti restano **2** per reagire durante il turno avversario; al tuo upkeep successivo torni a **5** (non 5 + 2).
- **Motivo del cambiamento:** la reattività piena (Istanti giocabili nel turno avversario) richiede un carburante disponibile fuori dal proprio turno. Trattenere l'energia non spesa è il modo naturale per alimentarla; il "non accumulo tra turni" evita lo stockpiling.
- Le carte costano energia (= `ManaCosto.Totale`). Si gioca finché si ha energia.
- **Motivo:** rimuove mana-screw/flood, rimuove un intero tipo di carta, rimuove decisioni "amministrative". È la scelta deliberata che ha reso Snap veloce.
- *Identità colori:* i 5 colori restano come **identità di fazione** per deckbuilding/tematica, ma **non** governano il costo. **Deckbuilding (deciso):** mono-fazione del Leader + carte **Nomadi** (incolori, sempre legali). Multicolore = upsell v2.
- **Penalità mazzo vuoto (deciso): fatigue crescente** (1, 2, 3, … danno per ogni pesca a vuoto), non perdita immediata — così il `mill` resta pressione, non interruttore binario.

---

## 3. Struttura del turno (UNA fase azioni, stile Hearthstone)

**Deciso:** niente Main1/Combat/Main2 separate. Tre momenti:

1. **Inizio turno** (automatico): stappa + azzera summoning sickness, **rigenera energia** al valore pieno del turno (= `min(numero del turno, 8)`; l'energia trattenuta dal turno precedente viene **sostituita**, non sommata — vedi §2), trigger `upkeep`, **pesca 1** (il primo non pesca al turno 1; mazzo vuoto → fatigue).
2. **Fase azioni** (libera): gioca carte, attiva abilità, **dichiara attacchi singoli**, in **qualsiasi ordine**. Dopo ogni azione l'avversario riceve una finestra di risposta per gli Istanti (vedi §6.5).
3. **Fine turno** (automatico): scarta a 7, trigger di fine turno, passa.

**Motivo:** una sola fase azioni (niente Main1/Combat/Main2 separate) tiene i turni corti = target 5-7 min realistico. La reattività non richiede fasi separate: le finestre di risposta agli Istanti avvengono **dentro** la fase azioni e durante il turno avversario (vedi §6.5).

**REINTRODOTTO (DECISO 2026-06-18):** stack & priorità, Istante, finestre di risposta (§6.5) **e il blocco** (§6) — reattività e profondità difensiva sono scelte di design chiave. Il combattimento è il modello classico attacco/blocco con finestre di risposta.

---

## 4. Tipi di carta (3)

### 4.1 Creatura / Unità
- Permanente con **ATK** e **DEF**. Occupa **1 slot** (max 6).
- **Summoning sickness**: non attacca il turno in cui entra (salvo keyword *Velocità*).
- Attacca e **può bloccare** (§6). Può avere *Provocazione* (le creature avversarie che possono bloccarla devono bloccarla — §6).
- **DEF = salute**, il danno si accumula e persiste (§6).
- Può avere effetti a trigger (vedi §7).

### 4.2 Magia / Spell
- Uso singolo: gioca → effetto → Cimitero.
- **Due sottotipi (DECISO 2026-06-18):**
  - **Magia (Sorcery):** giocabile solo nella **tua fase azioni**, quando hai priorità e lo stack è vuoto.
  - **Istante:** giocabile **ogni volta che hai priorità**, anche nel **turno dell'avversario** e in risposta durante il combattimento (vedi §6.5). Pagato con l'energia trattenuta (§2).

### 4.3 Leader / Eroe
- **1 per mazzo**, nella **Zona di Comando** (sempre visibile), non si pesca, disponibile da subito.
- Ha **ATK/DEF** + **1 Abilità Passiva** (attiva sempre) + **1 Hero Power** (attivabile 1 volta ogni X turni, costa energia).
- Si può **giocare in campo** pagando il costo: lì è una creatura normale (attacca/bersagliabile), occupa uno slot.
- **Morte del Leader:** torna in Zona di Comando (non al Cimitero). Per rigiocarlo: paga costo base **+ incremento cumulativo** per ogni morte (semplice; niente "attesa gratuita" in v1).
- **Tagliato da v1:** evoluzione del Leader (→ v2).

### 4.4 Tagliati da v1 (→ "modalità avanzata" v2)
Artefatto / Equipaggiamento / Artefatto-Creatura, Santuario, Tragedia (+ costo Eco), Alleato (fedeltà a livelli), Satellite, Benedizione, Avamposto, contatori-utilizzi. Restano nel design completo (`REGOLE_BASE_TCG.md`) come espansione futura.

---

## 5. Limite di board

- **Max 6 slot creatura per giocatore.** Migliora leggibilità su schermo verticale + performance low-end + forza scelte.
- **Regola "board pieno":** se è pieno, **non puoi giocare** un'altra creatura; i **token in eccesso** (`genera_token`) **fizzles** (non entrano).

---

## 6. Combattimento — attacco e blocco (DECISO 2026-06-18: il blocco esiste)

**DECISO 2026-06-18 — il blocco esiste anche in Start Mobile** (revisione della bozza precedente, che lo aveva tagliato per velocità). Il combattimento è il modello classico attacco/blocco, integrato con le finestre di risposta agli Istanti (§6.5). Sequenza:

1. **Dichiarazione attaccanti.** Nella tua fase azioni dichiari uno o più **attaccanti** e, per ciascuno, il bersaglio (una **creatura avversaria** o gli **HP avversari**). Attaccante = creatura tua non tappata, senza summoning sickness (salvo *Velocità*). Attaccare la **tappa**.
2. **Finestra di risposta** (§6.5): l'avversario può giocare Istanti; poi può rispondere l'attaccante (stack LIFO).
3. **Dichiarazione bloccanti.** Il difensore può assegnare proprie creature non tappate come **bloccanti**, una per ciascun attaccante (salvo keyword che ne modificano il numero, es. *Inafferrabile*). Bloccare **non** tappa il bloccante.
4. **Finestra di risposta** dopo i blocchi (§6.5).
5. **Risoluzione del danno**, deterministica e simultanea:
   - attaccante **bloccato**: attaccante e bloccante si infliggono danno a vicenda (ATK contro ATK);
   - attaccante **non bloccato**: infligge il danno al bersaglio dichiarato (creatura o HP);
   - il danno si **accumula** sulle creature (modello danno persistente, sotto).
6. **Velocità:** ignora la summoning sickness. **Travolta:** se un attaccante uccide il bloccante, il danno in eccesso oltre la salute del bloccante passa agli HP del giocatore.

**Provocazione (DECISO 2026-06-18, opzione "Richiamo"):** le creature avversarie che **possono** bloccare una creatura con Provocazione **devono** bloccarla (forza i blocchi, stile *Lure*). Se più attaccanti hanno Provocazione o i bloccanti non bastano, il difensore sceglie come soddisfare il vincolo. Resta una keyword utile e distinta dal blocco ordinario.

**Keyword di blocco ora pienamente funzionanti:** *Volo* (bloccabile solo da creature con Volo o Portata), *Portata* (può bloccare creature con Volo), *Inafferrabile* (bloccabile da al massimo 1 creatura), *Frenesia* (il secondo attacco non può essere bloccato). Tutte tornano legali e con significato.

### Modello danno alla creatura (DECISO: persistente HS-style)
- La **DEF è la salute massima**. Il danno si **accumula** sulla creatura e **NON si resetta** a fine/inizio turno — resta finché non viene **curato** (effetti di cura, Hero Power difensivi).
- La creatura muore quando **danno accumulato ≥ DEF effettiva**.
- **Perché persistente e non reset-per-turno:** (1) coerenza col pool obiettivi (OB-08 "DEF non danneggiata" sarebbe degenere col reset); (2) bilanciamento del removal (v1 ha poche rimozioni → l'attrito da combat è necessario); (3) **un solo sistema danno** unificato con `infliggi_danno` da effetti; (4) abilita cura/heal come meccanica reale e il chip-damage come valuta. La leggibilità mobile è un problema risolto (HS mostra la salute corrente da 12 anni).

---

## 6.5 Reattività, Istanti e priorità (DECISO 2026-06-18)

> La reattività è una **scelta di design chiave** del formato Start Mobile. Reintroduce stack e priorità che le bozze precedenti (§3, §11) avevano tagliato. Si integra con il combattimento attacco/blocco (§6).

**Priorità.** Dopo ogni azione (giocare una carta, dichiarare un attacco, attivare un'abilità), l'avversario riceve **priorità**: può giocare uno o più **Istanti** (e abilità a velocità istante), oppure **passare**. Quando entrambi passano di fila, l'effetto in cima si risolve.

**Stack (LIFO).** Gli effetti in attesa formano uno **stack**: si risolvono in **ordine inverso** rispetto a come sono stati giocati (l'ultimo giocato si risolve per primo). Questo abilita i controincantesimi e le risposte alle risposte.

**Carburante.** Gli Istanti si pagano con l'**energia trattenuta** (§2): per reagire nel turno avversario devi aver lasciato energia non spesa nel tuo turno.

**Finestre di combattimento.** Il combattimento (§6) ha **due** finestre di risposta: una dopo la dichiarazione degli attaccanti, una dopo la dichiarazione dei bloccanti. In ciascuna i giocatori possono giocare Istanti (rimozione, buff, protezione) e rispondere sullo stack. Il danno si risolve sui bersagli/blocchi **come sono in quel momento** (una creatura uccisa o rimossa prima della risoluzione non infligge più danno).

**UX mobile.** Serve un **timer di risposta** + tasto **Passa**. Mitigazione obbligatoria: **auto-pass** quando il giocatore non ha Istanti giocabili (per costo o per assenza in mano), così il timer non rallenta i turni quando non c'è nulla da fare.

**Impatto motore.** Il motore deve guadagnare un sottosistema **stack + priorità + finestra di risposta + risoluzione LIFO** (oggi gestisce trigger ma non la priorità). Da coordinare con Luca: questo è un reverse esplicito di §11 ("E5 stack/priorità").

---

## 7. Sistema effetti (engine)

Le carte portano **effetti** = `{trigger, azioni[]}`. Trigger supportati: `etb` (entra in campo), `upkeep`, `attacco`, `morte`, `attivata`. Verbi (azioni) v1: pesca, genera_mana→energia, infliggi_danno, distruggi, mill, genera_token (altri in arrivo). Targeting per proprietario (Tue/Avversario/Tutti) e quantificatore. (Dettaglio implementazione: `engine-cs/`, vedi `HANDOFF.md`.)

---

## 8. Obiettivi Segreti (la meccanica-firma)

### 8.1 Struttura
- **1 Obiettivo Segreto per giocatore**, **pescato a caso da un POOL globale curato** (~20-30 obiettivi). Niente mazzo-obiettivi costruito a mano in v1.
- L'obiettivo viene **assegnato dall'avversario** (in 1v1: l'avversario fa pescare il sistema) → mind-game.
- Il **contenuto è segreto**; vedi §8.3 per la visibilità del progresso.

### 8.2 Fairness (critico)
- Con un solo obiettivo a testa, la difficoltà deve essere **bilanciata**: in **ranked** tutti gli obiettivi del pool sono di **difficoltà/tempo ~equivalente**. Niente "facile vs difficile" casuale in competitivo.
- Modalità casual può avere varietà di difficoltà.

### 8.3 Segreto MA telegrafato (decide se è figo o "ingiusto")
- L'obiettivo è nascosto **nel contenuto**, ma il **progresso è pubblico in forma vaga**: barra/indicatore "lontano → vicino → quasi" oppure "2 condizioni su 3".
- Motivo: dà **counterplay** (l'avversario vede che stai per completarlo e può spingere sugli HP / interferire) → skill, non gotcha. Senza telegrafo, perdere a un win-con nascosto sembra ingiusto. **Questo è il punto #1 di game-feel dell'intera meccanica.**

### 8.4 Esempi di obiettivi (semplici, fair)
- "Infliggi danno da attacco allo stesso avversario per 3 turni consecutivi."
- "Controlla 4 creature contemporaneamente per la durata di un tuo turno."
- "Porta l'avversario a 10 HP o meno."
- "Abbi 6+ carte nel tuo Cimitero."

(Esempi del doc base più complessi/concatenati = casual o v2.)

### 8.5 Vittoria
Due vie, in parallelo, per tutta la partita:
- **HP avversario a 0**, oppure
- **Obiettivo completato**.
Il primo che soddisfa una delle due **vince**.
**Tagliato da v1:** sistema a 3 vite / respawn, formato "3 obiettivi facili", eliminazione FFA (→ v2).

---

## 9. Monetizzazione (pulita, acquisibile)

- **Valuta crediti:** guadagnabili **gratis** (vincendo/giocando partite + **rewarded video ads** → ricompense), oppure **acquistabili** (pacchetti di crediti reali → crediti).
- **Spesa crediti:** **pacchetti di carte** (RNG) + **craft/polvere** per fabbricare la carta singola desiderata + **art alternative / cosmetici** (board, skin Leader).
- **Battle pass** stagionale.
- **NO cash-out, NO marketplace di scambio carte P2P, NO valore monetario trasferibile** → niente rischio loot-box/gambling, niente percezione pay-to-win pura (il craft permette di *puntare* una carta con grind, non saltare la progressione col solo wallet).
- **Perché così:** modello provato (Hearthstone-like), legalmente sicuro, **acquisibile** (un acquirente non eredita responsabilità regolatorie).

---

## 10. Roadmap verso l'exit

1. **MVP giocabile** (questa forma v1) — 1v1 vs bot / hot-seat. Verifica il *feel* e la durata partita.
2. **Soft-launch ristretto** — misura **D1/D7/D30**. Se la retention è morta → si itera sul **core**, non si aggiungono feature.
3. **Monetizzazione + pass + ads** — misura **ARPDAU**.
4. **Metriche sane → pitch** a publisher/acquirer. L'exit si fa qui.

Principio guida costante: ogni feature candidata va pesata contro **"allunga la partita o il carico cognitivo?"**. Se sì, su mobile probabilmente costa più retention di quanta profondità dia.

---

## 11. Riuso del lavoro engine + re-baseline v1

Il codice C# (`engine-cs/`) regge in parte, ma il pivot a combat-HS + fase unica richiede un **re-baseline**:
- **Sopravvive:** E1 core loop · E3 interprete effetti completo (motore carte) · `StatEffettive`/`KeywordEffettive` · trigger morte/etb/upkeep/attivata · loader carte.
- **Da rifare (E4):** il combat attacco/blocco (`DichiaraAttacco`/`DichiaraBlocchi`) → **attacco diretto** `Attacca(attaccante, bersaglio)` + Provocazione/Velocità/Travolta. Sopravvivono morte/eventi.
- **Da cambiare (E2):** mana colorato/Avamposti → **energia automatica** (intero, +1/turno, cap 8) con **energia trattenuta** (non spesa resta fino al proprio upkeep, poi si rigenera senza accumulo — §2); costo = `ManaCosto.Totale`.
- **DA FARE — reverse del 2026-06-18 (E5 stack/priorità):** prima tagliato, **ora richiesto**. Serve sottosistema **stack + priorità + finestra di risposta + risoluzione LIFO** per la reattività piena / Istanti (§6.5). Da coordinare con Luca.
- **Nuovo:** modello **danno persistente su `CartaIstanza`** + state-based death · **fase unica** (collassa Untap..End) ma con **finestre di priorità** dentro la fase e nel turno avversario · **fatigue** · **cap board 6** + board-pieno · **sistema Obiettivi** (pool, assegnazione, tracking, telegrafo 3-stati, win-check parallelo) · **Leader**.

Checklist engine completa: vedi `FEEDBACK_DESIGN_V1_E_OBIETTIVI.md` §6 (analisi Fable 5, 2026-06-12).

---

## 12. Decisioni — CHIUSE (2026-06-13, post-review Fable 5)
- **Combat:** ✅ (REVISIONE 2026-06-18) attacco **e blocco** (§6), no reveal simultaneo. Provocazione = forza i blocchi (stile Richiamo/Lure). ⚠️ Reverse della bozza "attacco diretto Hearthstone" → da coordinare con Luca (impatta il motore).
- **Danno creatura:** ✅ persistente HS-style, nessun reset (§6).
- **Struttura turno:** ✅ una sola fase azioni (§3), con finestre di risposta per gli Istanti.
- **Vincoli colore:** ✅ mono-fazione del Leader + Nomadi (§2).
- **Cap energia:** ✅ 8 (§2). **Mazzo vuoto:** ✅ fatigue crescente (§2).
- **Reattività / Istanti (NUOVO, 2026-06-18):** ✅ reattività piena — Istanti giocabili nel turno avversario, stack LIFO + priorità, finestra di risposta in combattimento (§6.5). **Energia trattenuta** per alimentarla (§2). ⚠️ Reverse di §3/§6/§11: **da coordinare con Luca** (impatta il motore).
- **Leader:** ✅ passiva debole, potenza nell'Hero Power.
- **Pool obiettivi:** ✅ 22 ranked + 6 casual, vedi `FEEDBACK_DESIGN_V1_E_OBIETTIVI.md` §3-4. Turni target da validare in playtest (telemetria §5 di quel doc).
- **Compliance:** pubblicare le probabilità pack in-app (Apple/Google).
- **Soft-launch:** mercati neutri (no audience Karmate); canale Karmate = moltiplicatore al lancio globale.
