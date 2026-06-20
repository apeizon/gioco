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
Vita:           i Punti Vita del tuo Leader (varia per Leader) — niente HP del giocatore separati
Energia:        tipizzata, +1 a turno del colore scelto (identità del Leader), si accumula, niente cap
Tipi di carta:  3 — Creatura · Magia · Leader-avatar
Mazzo:          30 carte + 1 Leader (parte in campo, è il giocatore)
Mano iniziale:  5 · limite mano 7 · pesca 1/turno
Board:          max 6 slot creatura per giocatore
Obiettivo:      1 Obiettivo Segreto a testa, pescato da un pool curato
Vittoria:       Punti Vita del Leader avversario a 0  OPPURE  completa il tuo Obiettivo
Combat:         attacco/blocco + stack/priorità (Istanti) · danno resettato a fine turno (Magic-style)
Monetizzazione: crediti (gratis giocando + rewarded ads, o comprabili) →
                pack + craft + cosmetici + battle pass. No cash-out, no scambio P2P.
```

Il formato "senza terre" si è avvicinato molto a Magic (energia tipizzata, blocco, Istanti/stack, danno a fine turno, Leader-avatar), pur restando snello: pool di carte ridotto, niente terre da pescare, Obiettivi Segreti come gancio.

---

## 2. Risorse — energia tipizzata (DECISO 2026-06-19)

> Questa sezione **sostituisce** il vecchio modello "energia incolore automatica, conta solo il totale, cap 8". Il nuovo modello è una base di mana costruita una "terra" a turno, del colore scelto.

- **Niente Avamposti/terre da pescare.** All'inizio di ogni tuo turno **guadagni 1 energia** e **scegli il colore** di quell'energia.
- Il colore si sceglie **nell'identità di fazione del tuo Leader**; una volta scelto, quell'energia ha **colore fisso** per tutta la partita.
- **L'energia si accumula:** al turno N hai **N energie totali** (T1 = 1, T2 = 2, …). **Niente cap.**
- Le energie accumulate si **ricaricano ogni turno** (come terre che si stappano): ogni turno puoi spendere fino al tuo totale.
- **Il colore conta:** una carta che costa "2 Nord" si paga con **2 energie Nord**. Le carte **Nomadi** (incolori) si pagano con energia di **qualsiasi** colore.
- **Energia trattenuta per la reattività:** l'energia non spesa resta disponibile — anche nel **turno avversario** — per giocare **Istanti** (§6.5). Al tuo upkeep successivo tutte le energie si ricaricano e ne aggiungi 1 nuova.
- **Esempio (Leader Nord-Ovest):** T1 scegli Nord → `[Nord]`. T2 scegli Ovest → `[Nord, Ovest]`. T3 scegli Nord → `[Nord, Nord, Ovest]`. Con un Leader **mono** la scelta è automatica (una sola fazione).
- **Deckbuilding:** al lancio **solo Leader mono** + carte **Nomadi**. I **Leader multi-fazione esisteranno** ma arrivano **dopo**, per non complicare l'onboarding (gli utenti imparano prima il gioco).
- **Penalità mazzo vuoto:** fatigue crescente (1, 2, 3, … danno per ogni pesca a vuoto) — il `mill` resta pressione, non interruttore binario.

---

## 3. Struttura del turno (UNA fase azioni, stile Hearthstone)

**Deciso:** niente Main1/Combat/Main2 separate. Tre momenti:

1. **Inizio turno** (automatico): stappa + azzera summoning sickness, **ricarica tutte le energie** accumulate e **guadagni +1 energia del colore che scegli** (§2), trigger `upkeep`, **pesca 1** (il primo non pesca al turno 1; mazzo vuoto → fatigue).
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
- **DEF = salute**; il danno marcato dura **fino a fine turno** e poi si cancella (Magic-style, §6).
- Può avere effetti a trigger (vedi §7).

### 4.2 Magia / Spell
- Uso singolo: gioca → effetto → Cimitero.
- **Due sottotipi (DECISO 2026-06-18):**
  - **Magia (Sorcery):** giocabile solo nella **tua fase azioni**, quando hai priorità e lo stack è vuoto.
  - **Istante:** giocabile **ogni volta che hai priorità**, anche nel **turno dell'avversario** e in risposta durante il combattimento (vedi §6.5). Pagato con l'energia trattenuta (§2).

### 4.3 Leader / Avatar (DECISO 2026-06-19 — il Leader è il giocatore)

> Cambiamento fondamentale: il Leader **non** è più un comandante nella Zona di Comando. **È il giocatore stesso.** Sostituisce il modello precedente (Zona di Comando, costo di evocazione, Rientro, Evoluzione).

- Il Leader **è il giocatore**: i suoi **Punti Vita sono il tuo totale di vita** (non esiste un totale HP separato del giocatore). A **0 Punti Vita perdi**.
- **Parte in campo** all'inizio della partita, sempre presente. **Niente Zona di Comando, niente costo per evocarlo.**
- **Immune agli effetti di rimozione** (distruggi / esilia / rimbalza / prendi il controllo): è il tuo avatar. **NON** è immune al **danno** — una magia tipo "infliggi 3 danni" gli toglie 3 Punti Vita.
- **Tre valori:**
  - **Forza** e **Costituzione** = statistiche di **combattimento**, modificabili dalle carte (buff/debuff come ATK/DEF).
  - **Punti Vita** = il **totale vita permanente** (varia per Leader: più o meno secondo tipologia e potenza → varietà di gioco).
- **Combattimento:** attacca come una creatura (con la **Forza**), ma **non può bloccare/difendere**.
  - **In attacco (Assalto):** la **Costituzione conta SOLO qui.** Se bloccato, la Costituzione fa da corazza (assorbe il danno del bloccante) e l'**eccesso oltre la Costituzione passa ai Punti Vita**.
  - **In difesa:** il Leader **non difende con Forza/Costituzione**. Se viene attaccato e **non hai creature che lo bloccano**, il danno va **dritto ai Punti Vita**. Puoi proteggerlo solo facendo **bloccare le tue creature** oppure con **Magie/effetti che prevengono il danno**.
- **Assalto N (NUOVO 2026-06-20):** keyword propria di ogni Leader. Per **dichiarare il Leader come attaccante** devi pagare il suo **Assalto** = **N energia** (di qualsiasi colore, oppure colori specifici se indicato sulla carta, es. "Assalto 2 Nord"). Il Leader può assaltare **una sola volta per turno** (salvo carte specifiche che lo modificheranno in futuro). È il **gate anti-brawl**: nei primi turni l'energia scarseggia, quindi assaltare significa rinunciare a giocare altre carte.
- **Niente Velocità di base (NUOVO 2026-06-20):** il Leader è soggetto a **summoning sickness** all'inizio della partita → **nel primo turno di ciascun giocatore il Leader NON può attaccare**, a prescindere dall'Assalto. Da T2 in poi può attaccare pagando l'Assalto. (Secondo strato anti-brawl, oltre all'Assalto.)
- Può **riguadagnare e perdere Punti Vita** tramite effetti (cura/danno).
- **Fazioni:** il Leader porta le sue fazioni solo per **identità/tematica** del mazzo e per scegliere il colore dell'energia (§2). Nessun costo di evocazione.
- **Flip (DECISO 2026-06-20):** ogni Leader ha una **condizione di flip** stampata sulla carta. Appena la condizione è soddisfatta (**controllo di stato**, anche durante il turno avversario), il Leader si **trasforma automaticamente** nella sua forma flippata. Il flip è **permanente e una tantum** (irreversibile — anche se la condizione smette di valere, resta flippato; la forma flippata è quella finale), **non costa energia** (la condizione è il prezzo) e **mantiene i Punti Vita correnti** — cambiano solo **Forza/Costituzione e le abilità**. Le forme flippate hanno stat migliori e abilità potenziate.
- **Al lancio: solo Leader mono** (multi-fazione più avanti, §2).

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
   - attaccante **non bloccato**: infligge il danno al bersaglio dichiarato (creatura o Punti Vita del Leader avversario);
   - il danno marcato sulle creature dura **fino a fine turno** (modello sotto).
6. **Velocità:** ignora la summoning sickness. **Travolta:** se un attaccante uccide il bloccante, il danno in eccesso oltre la salute del bloccante passa ai Punti Vita del giocatore.

**Leader in combattimento (§4.3):** il Leader attacca con la **Forza** ma **non può bloccare**. Per dichiararlo attaccante paghi il suo **Assalto N** (N energia), **una volta per turno**. Non ha Velocità: **non attacca nel primo turno** (summoning sickness). La **Costituzione conta solo in attacco** (fa da corazza, l'eccesso passa ai Punti Vita); in difesa il Leader non usa Forza/Costituzione e il danno va dritto ai Punti Vita (lo proteggi con creature o Magie anti-danno). Il Leader è **immune alla rimozione** ma non al danno.

**Provocazione (DECISO 2026-06-18, opzione "Richiamo"):** le creature avversarie che **possono** bloccare una creatura con Provocazione **devono** bloccarla (forza i blocchi, stile *Lure*). Se più attaccanti hanno Provocazione o i bloccanti non bastano, il difensore sceglie come soddisfare il vincolo. Resta una keyword utile e distinta dal blocco ordinario.

**Keyword di blocco ora pienamente funzionanti:** *Volo* (bloccabile solo da creature con Volo o Portata), *Portata* (può bloccare creature con Volo), *Inafferrabile* (bloccabile da al massimo 1 creatura), *Frenesia* (il secondo attacco non può essere bloccato). Tutte tornano legali e con significato.

### Modello danno (DECISO 2026-06-19 — Magic-style, si resetta a fine turno)

> **Annulla** la decisione precedente ("danno persistente HS-style"). Ora il danno funziona come in Magic.

- La **DEF** (creature) e la **Costituzione** (Leader in attacco) sono la **salute massima in combattimento**. Il **danno marcato si cancella alla fine di ogni turno**: una creatura ferita ma non uccisa torna a piena DEF al turno successivo.
- Una creatura muore quando il danno marcato **≥ DEF effettiva** nello stesso turno.
- **L'unica vita permanente** sono i **Punti Vita del Leader** (§4.3): perdite e danni ai Punti Vita **non** si resettano.

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
- **E4 — combat attacco/blocco:** il modello originale (`DichiaraAttacco`/`DichiaraBlocchi`) **si mantiene** (in v1 il blocco esiste, §6). Aggiungere: Provocazione = Richiamo, Velocità, Travolta, e il **Leader-avatar in combattimento** (non blocca; Costituzione fa da corazza solo in attacco; eccesso → Punti Vita).
- **E2 — energia tipizzata (REVISIONE 2026-06-19):** mana colorato/Avamposti → **energia tipizzata accumulata** (+1/turno del colore scelto nell'identità del Leader, **niente cap**, si ricarica ogni turno, **il colore conta** per i costi; non spesa resta per gli Istanti nel turno avversario — §2). Nomadi = pagabili con qualsiasi colore.
- **DA FARE — reverse 2026-06-18 (E5 stack/priorità):** prima tagliato, **ora richiesto**. Serve sottosistema **stack + priorità + finestra di risposta + risoluzione LIFO** per Istanti/reattività (§6.5). Da coordinare con Luca.
- **Nuovo / REVISIONE 2026-06-19:** modello **danno Magic-style** (marcato, si resetta a fine turno; l'unica vita permanente sono i Punti Vita del Leader — §6) · **Leader-avatar** (è il giocatore: Forza/Costituzione/Punti Vita, parte in campo, immune a rimozione non al danno, niente Zona di Comando né costo evocazione, **flip** da rivedere — §4.3) · **fatigue** · **cap board 6** + board-pieno · **sistema Obiettivi** (pool, assegnazione, tracking, telegrafo 3-stati, win-check parallelo).

Checklist engine completa: vedi `FEEDBACK_DESIGN_V1_E_OBIETTIVI.md` §6 (analisi Fable 5, 2026-06-12).

---

## 12. Decisioni — CHIUSE (2026-06-13, post-review Fable 5)
- **Combat:** ✅ (REVISIONE 2026-06-18) attacco **e blocco** (§6), no reveal simultaneo. Provocazione = forza i blocchi (stile Richiamo/Lure). ⚠️ Reverse della bozza "attacco diretto Hearthstone" → da coordinare con Luca (impatta il motore).
- **Danno (REVISIONE 2026-06-19):** ✅ **Magic-style**, il danno marcato si resetta a fine turno (§6). Annulla il "persistente HS-style". L'unica vita permanente = Punti Vita del Leader.
- **Struttura turno:** ✅ una sola fase azioni (§3), con finestre di risposta per gli Istanti.
- **Energia (REVISIONE 2026-06-19):** ✅ **tipizzata, accumulata, +1/turno del colore scelto nell'identità del Leader, niente cap, il colore conta** (§2). Annulla "energia incolore, conta solo il totale, cap 8".
- **Deckbuilding:** ✅ al lancio **solo Leader mono** + Nomadi; multi-fazione più avanti (§2). **Mazzo vuoto:** ✅ fatigue crescente.
- **Reattività / Istanti (2026-06-18):** ✅ Istanti nel turno avversario, stack LIFO + priorità, finestra di risposta in combattimento (§6.5). Carburante = energia non spesa (§2).
- **Leader-avatar (REVISIONE 2026-06-19):** ✅ il Leader **è il giocatore** (Forza/Costituzione/Punti Vita, parte in campo, immune a rimozione non al danno, non blocca, niente Zona di Comando né costo evocazione). **Flip da rivedere.** Annulla il Leader-comandante con Zona di Comando/Hero Power/Evoluzione/Rientro.
- ⚠️ **Tutte le revisioni del 19/06 impattano il motore → da coordinare con Luca.**
- **Pool obiettivi:** ✅ 22 ranked + 6 casual, vedi `FEEDBACK_DESIGN_V1_E_OBIETTIVI.md` §3-4. Turni target da validare in playtest (telemetria §5 di quel doc).
- **Compliance:** pubblicare le probabilità pack in-app (Apple/Google).
- **Soft-launch:** mercati neutri (no audience Karmate); canale Karmate = moltiplicatore al lancio globale.
