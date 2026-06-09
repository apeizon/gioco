# TCG – Regole Base del Gioco
> Documento di specifica per lo sviluppo dell'app mobile

---

## 1. STRUTTURA DEL MAZZO

| Parametro | Valore |
|---|---|
| Mazzo totale | 60 carte (incluso il Leader) |
| Mazzo principale (escluso Leader) | 59 carte |
| Leader | 1 carta — sempre nella Zona di Comando, fuori dal mazzo principale |
| Carte nel mazzo Obiettivi | 35 carte |
| Mano iniziale | 6 carte |
| Limite massimo in mano | 7 carte |
| Pesca per turno | 1 carta (all'inizio del turno) |

Se a fine turno un giocatore ha più di 7 carte in mano, deve scartare fino a raggiungere il limite di 7 (scelta del giocatore).

---

## 2. PUNTI VITA

- **Modalità da testare:** 30 HP (partite più rapide, consigliata per 1v1) oppure 50 HP (più adatta al multiplayer)
- L'app deve supportare entrambe le opzioni selezionabili a inizio partita o in fase di creazione della lobby

---

## 3. SISTEMA MANA (ispirato a Magic: The Gathering, con personalizzazioni)

- Esistono carte **Avamposto** dedicate nel mazzo principale
- Ogni giocatore può giocare **1 carta Avamposto per turno** (nella Main Phase 1 o 2), posizionandola nel proprio campo permanente
- Le Terre **non generano necessariamente 1 solo mana**: ogni Avamposto specifica sulla propria carta quanti e quali tipi di mana produce (es. una Avamposto rara potrebbe generare 2 mana, o mana di tipo doppio, o mana condizionale)
- Le Terre non possono essere "tappate" (girate/usate) di nuovo dopo essere state utilizzate nello stesso turno — si resettano nella fase Untap del turno successivo
- Il mana non usato **non si accumula tra i turni** (si azzera a fine turno)
- **Espansione originale rispetto a Magic:** da definire nella fase 2 (possibili idee: terre con doppio tipo, terre con abilità attivabile, mana "condizionale" legato al Santuario attivo, ecc.)

---

## 4. STRUTTURA DEL TURNO (stile Magic: The Gathering)

Ogni turno è composto dalle seguenti fasi, nell'ordine:

### 4.1 — UNTAP (Sveglia)
- Tutte le carte del giocatore attivo che erano state "tappate" (girate, usate) tornano nella posizione verticale (untapped)
- Questa fase avviene automaticamente, senza azioni da parte del giocatore

### 4.2 — UPKEEP (Mantenimento)
- Si risolvono gli effetti automatici a inizio turno (es. danni continuati, contatori, effetti di Benedizioni/Tragedie)
- Nessun giocatore pesca in questa fase
- Gli avversari possono giocare carte **Istante** (vedi Tipi di Carte) in risposta agli effetti

### 4.3 — DRAW (Pesca)
- Il giocatore attivo pesca 1 carta dal proprio mazzo
- **Eccezione:** Il giocatore che va **primo** NON pesca nel suo primo turno (regola anti-vantaggio, come in Magic)
- Se il mazzo è vuoto, il giocatore che non può pescare subisce una penalità da definire (es. perde HP ogni turno, oppure perde immediatamente — da configurare)

### 4.4 — MAIN PHASE 1 (Fase Principale 1)
- Il giocatore può:
  - Giocare **1 carta Avamposto** (se non l'ha già fatto in questo turno)
  - Giocare carte dal costo in mana affordabile (Unità, Magie Sorcery, Artefatti, Santuario, Tragedia, Satellite, Benedizione, ecc.)
  - Attivare abilità di carte già in campo
  - Giocare la propria carta **Leader/Eroe** se disponibile (vedi sezione dedicata)
- Gli avversari possono rispondere con carte **Istante**

### 4.5 — COMBAT PHASE (Fase di Combattimento)
Suddivisa in sotto-fasi:

1. **Beginning of Combat** – Effetti che si attivano "all'inizio del combattimento"
2. **Declare Attackers** – Il giocatore attivo sceglie quali unità attaccano e i bersagli (giocatori avversari o Alleati/Partner avversari); le unità che attaccano vengono "tappate"
3. **Declare Blockers** – Ogni giocatore attaccato sceglie quali proprie unità bloccano gli attaccanti (1 bloccante per attaccante, salvo abilità speciali)
4. **Damage Resolution** – Il danno viene calcolato simultaneamente: ATK dell'attaccante vs DEF del bloccante. Se nessun bloccante: il danno va direttamente ai HP del giocatore (o dell'Alleato bersaglio)
5. **End of Combat** – Effetti che si attivano "a fine combattimento"; le unità con 0 DEF o meno vanno al Cimitero

### 4.6 — MAIN PHASE 2 (Fase Principale 2)
- Come la Main Phase 1 (eccetto giocare terre: si può giocare 1 sola terra per turno)
- Utile per giocare carte dopo aver valutato l'esito del combattimento

### 4.7 — END STEP (Fine Turno)
- Il giocatore attivo dichiara la fine del turno
- Se ha più di 7 carte in mano, scarta fino al limite
- Si risolvono effetti "a fine turno"
- Il turno passa al giocatore successivo (in senso orario nel multiplayer)

---

## 5. TIPI DI CARTE

### REGOLA UNIVERSALE — UTILIZZI LIMITATI
Tutte le carte del gioco (senza eccezioni per tipo) possono avere uno dei due seguenti regimi di utilizzo, specificato sulla carta stessa:

- **Utilizzo Illimitato:** La carta può essere usata/attivata **1 volta per turno** per tutta la durata della partita (es. una Avamposto normale che genera mana ogni turno senza fine)
- **Utilizzo Limitato:** La carta ha un **contatore di utilizzi** (es. 3, 5, 10 volte). Ogni volta che viene usata/attivata, il contatore scala di 1. Quando raggiunge 0, la carta va automaticamente al **Cimitero** o in **Esilio** in base a quanto indicato sulla carta stessa

Questa regola permette di bilanciare carte molto potenti imponendo un numero massimo di utilizzi. Ad esempio, una Avamposto che genera 3 mana potrebbe avere solo 5 utilizzi totali prima di esaurirsi. Il contatore di utilizzi restante deve essere visibile sull'interfaccia (es. badge numerico sulla carta).

---

### 5.1 — UNITÀ / CREATURA
- Carta permanente che rimane in campo fino a quando non viene distrutta
- Ha valori di **ATK** (attacco) e **DEF** (difesa/resistenza)
- Deve aspettare 1 turno prima di poter attaccare (regola "summoning sickness", come in Magic), salvo abilità speciali (es. *Velocità*)
- Può bloccare attacchi avversari nel turno dell'avversario

### 5.2 — MAGIA / SPELL
- Carta a uso singolo: viene giocata, l'effetto si risolve, poi va al Cimitero
- Esistono due sottotipi:
  - **Sorcery:** Giocabile solo durante le proprie Main Phase (non durante il turno avversario)
  - **Istante:** Giocabile in qualsiasi momento, anche durante il turno avversario o in risposta a un'azione (come gli "instant" di Magic)

### 5.3 — ARTEFATTO

Categoria di carte permanenti non legate a un'identità di fazione. Tre sottotipi distinti:

#### 5.3.a — Artefatto (classico)
- Carta permanente non-creatura. Non si attacca a nessuna unità.
- Può avere effetti passivi (innescati a un evento o continui), abilità attivabili (es. tappa, paga mana, sacrifica) o entrambi.
- Non ha valori di ATK/DEF — non attacca, non blocca.
- Può essere bersaglio di effetti che cercano "artefatto".

#### 5.3.b — Artefatto — Equipaggiamento
- Sottotipo di Artefatto. Carta permanente che si attacca a una propria creatura tramite l'azione **Equipaggia**.
- Quando entra in campo non è attaccato a nulla: l'azione Equipaggia va eseguita separatamente.
- **Equipaggia: X mana** — azione di velocità Sorcery (giocabile solo nelle proprie Main Phase a stack vuoto) che attacca l'Equipaggiamento a una propria creatura, pagando X mana qualsiasi (valore stampato sulla carta).
- L'Equipaggiamento conferisce alla creatura equipaggiata bonus statistici, keyword, abilità innescate o attivabili (a seconda della carta).
- **Default detach:** quando la creatura equipaggiata viene distrutta o lascia il campo, l'Equipaggiamento **resta in campo non equipaggiato**. Può essere ri-attaccato a un'altra propria creatura pagando di nuovo il costo Equipaggia.
- Eventuali eccezioni al default (es. Equipaggiamento che torna in mano o si auto-sacrifica) sono scritte esplicitamente sulla carta.

#### 5.3.c — Artefatto — Creatura
- Sottotipo combinato. Carta permanente che è **simultaneamente Artefatto e Creatura**.
- Ha valori di ATK/DEF, attacca e blocca come una creatura normale (incluso il rispetto della summoning sickness, salvo Velocità).
- È bersagliabile sia da effetti che cercano creature sia da effetti che cercano artefatti.
- Sotto-tipi creatura tipici: Costrutto, Golem, Colosso (le carte Nomadi rappresentano la maggioranza degli Artefatti Creatura, in quanto costrutti senza fazione).

### 5.4 — LEADER / EROE
- **1 carta Leader per mazzo**, tenuta fuori dal mazzo principale nella **Zona di Comando** (sempre visibile a tutti i giocatori, come il Commander in Magic)
- **Non viene pescata:** è disponibile da subito a inizio partita
- Ha una **Stat block** come le unità (ATK/DEF)
- Ha una **Abilità Passiva** attiva per tutta la partita (anche quando è nella Zona di Comando, non in campo)
- Ha una **Abilità Attiva (Hero Power):** utilizzabile **una volta ogni X turni** (il valore X è scritto sulla carta), pagando un costo in mana — attivabile sia dalla Zona di Comando che dal campo

**Messa in campo:** Il Leader può essere giocato in campo come unità pagando il suo costo mana. Una volta in campo si comporta come una **creatura normale**: può attaccare, bloccare, essere bersaglio di effetti.

**In campo — regola di attacco:** Il Leader avversario in campo vale come una **creatura normale**: non può essere attaccato direttamente (a differenza dei Planeswalker di Magic). Per danneggiarlo è necessario che non abbia bloccanti oppure che sia l'unica creatura rimasta sul campo del giocatore avversario senza difesa.

**Morte e rientro (meccanica Commander):** Quando il Leader in campo scende a 0 DEF, **non va al Cimitero**: torna automaticamente nella propria **Zona di Comando**. Per rimandarlo in campo, il giocatore sceglie tra due opzioni:
- **Opzione A – Costo aggiuntivo:** paga il costo mana originale del Leader **più un incremento cumulativo** (es. +2 mana per ogni volta che è morto)
- **Opzione B – Attesa gratuita:** aspetta X turni senza pagare il costo aggiuntivo (il valore X è scritto sulla carta del Leader)

Le due opzioni sono **mutuamente esclusive per ogni rientro**: il giocatore sceglie una delle due ogni volta che il Leader torna nella Zona di Comando.

**Evoluzione del Leader:** Il Leader può **evolvere** al raggiungimento di condizioni specifiche scritte sulla carta (es. "quando questo Leader ha inflitto almeno 10 danni, rivela la forma evoluta"). Non tutti i Leader evolvono. L'evoluzione trasforma la carta in una versione potenziata con nuove abilità e stat più elevate. L'evoluzione è permanente anche dopo la morte e il rientro dalla Zona di Comando.

### 5.5 — SANTUARIO
- Carta permanente che influenza l'**intero campo di battaglia** (entrambi i giocatori)
- Può solo essere presente **1 Santuario alla volta** sul campo globale
- Per giocare un nuovo Santuario quando ce n'è già uno attivo: il Santuario precedente viene **distrutto automaticamente** prima che il nuovo entri in campo
- Gli effetti del Santuario si applicano a tutti finché è in campo
- Può avere effetti come: modificare regole di combattimento, cambiare il costo delle carte, applicare buff/debuff globali, ecc.

### 5.6 — TRAGEDIA / MALEDIZIONE
- Carta permanente che si attacca **al proprio giocatore** (non alle unità)
- Applica simultaneamente un **malus** e un **bonus** allo stesso giocatore
- Quando giocata, l'effetto (malus + bonus) si attiva **subito** una prima volta
- Gli effetti possono essere **permanenti** (fino a quando la Tragedia è in campo) oppure **immediati/one-shot** (subiti una volta), a seconda della carta
- **Meccanica Eco**: una volta per turno, il proprietario può pagare il **costo Eco** della Tragedia per applicare una **nuova istanza** di malus + bonus (effetti continui si cumulano; effetti immediati si ripetono)
  - Il costo Eco può essere **mana** (uguale, inferiore o superiore al costo della carta in base alla potenza dell'effetto)
  - Il costo Eco può essere **non-mana** (es. "metti una carta in fondo al mazzo", "scarta una carta", "sacrifica una creatura")
  - Il costo Eco può essere **assente** (la Tragedia non è ripetibile e applica l'effetto una sola volta in modo permanente)
- Esempio: *"Dimezza i tuoi HP attuali. Per i prossimi 3 turni, hai 2 fasi di combattimento per turno."*
- Si possono avere più Tragedie attive contemporaneamente (da verificare in fase di bilanciamento)
- Il giocatore sceglie consapevolmente di giocarle — sono carte ad alto rischio/alto rendimento

### 5.7 — ALLEATO / PARTNER
- Carta permanente, ispirata al Planeswalker di Magic, con meccaniche originali
- Puoi avere **quanti Alleati vuoi** in campo contemporaneamente (come i Planeswalker in Magic — senza limite di unicità)
- **Può essere attaccato** dagli avversari come bersaglio diretto
- **Può difendersi e contrattaccare** attivamente (a differenza del Planeswalker di Magic, che non attacca)
- Ha un sistema di **Punti Fedeltà / Livello** che cresce durante la partita attraverso azioni specifiche (es. attaccare, bloccare, risolvere effetti)
- Ha **3 abilità** legate al livello: una base (livello 1), una intermedia (livello 2), una avanzata (livello 3)
- **Progressione senza evoluzione:** gli Alleati crescono di potere tramite i livelli ma **non evolvono in forme diverse** (l'evoluzione è meccanica esclusiva del Leader/Eroe)
- Se un Alleato viene distrutto, va al Cimitero come una creatura normale (non ha la meccanica Commander del Leader)

### 5.8 — SATELLITE
- Carta permanente **personale** (influenza solo il proprio campo/giocatore)
- Ogni giocatore può avere **massimo 1 Satellite** attivo nel proprio campo
- Per giocare un nuovo Satellite: il Satellite precedente viene **distrutto automaticamente** (senza bisogno di un'azione aggiuntiva)
- Simile al Santuario ma ad effetto personale, non globale
- Esempio di effetti: generare mana extra, modificare le regole di pesca, proteggere le proprie unità, ecc.

### 5.9 — BENEDIZIONE
- Carta permanente che si attacca al proprio giocatore o campo
- Fornisce **buff non esagerati ma permanenti** per tutta la partita
- Pensate per dare vantaggi cumulativi nel lungo periodo
- Esempio: *"Da questo momento, hai 1 mana aggiuntivo ogni turno." (Costo: 5 mana)*
- Si possono avere più Benedizioni attive contemporaneamente
- Non hanno malus associati (a differenza delle Tragedie)

---

## 6. SISTEMA OBIETTIVI SEGRETI

### 6.0 — Struttura del Mazzo Obiettivi
- Ogni giocatore costruisce il **proprio Mazzo Obiettivi** (35 carte) scegliendo liberamente le carte obiettivo che vuole includere
- Le carte obiettivo sono collezionabili e fanno parte del sistema di progressione/collezione del gioco
- Il Mazzo Obiettivi è separato dal mazzo principale e non viene mescolato con esso
- La composizione del Mazzo Obiettivi è **privata** (l'avversario non sa quali obiettivi hai in mazzo, solo quanti ne riceverai in base al formato scelto)

### 6.1 — Tipi di Obiettivo
Il Mazzo Obiettivi (35 carte) è diviso in due categorie:

- **Obiettivi Facili:** condizioni singole o semplici, raggiungibili in una partita normale con un po' di strategia
  - *"Infliggi danni da attacco allo stesso avversario per 3 turni consecutivi."*
  - *"Fai un totale di 15 danni in un singolo turno a uno o più giocatori (anche te stesso conta come giocatore)."*
  - *"Non subire danni di nessun genere per 3 turni consecutivi."*
  - *"Mantieni il tuo Leader in campo per 3 turni consecutivi senza che attacchi, attivi abilità attive o subisca danni."*
  - *"Scarta 3 carte per aver superato il limite massimo di carte in mano (devono essere 3 scarti distinti da eccesso mano)."*
  - *"Ottieni una differenza di punti vita tra te e uno dei tuoi avversari di almeno 20 punti (sia in più che in meno)."*
  - *"Il totale di carte nei cimiteri di tutti i giocatori supera le 20 carte contemporaneamente."*
  - *"Sul campo sono presenti contemporaneamente almeno 10 carte tappate in totale (valgono tutti i tipi di carta)."*
- **Obiettivi Difficili:** condizioni concatenate e precise, richiedono una strategia dedicata e che più condizioni si allineino deliberatamente durante la partita
  - *"Muori 2 volte. Al tuo secondo e ultimo respawn, sopravvivi per 3 turni consecutivi con 3 o meno HP e vinci la partita."*
  - *"Vinci la partita avendo esattamente 1 carta per tipo sul campo nel momento della vittoria."*
  - *"Per vincere, il tuo avversario deve aver subito 10 attacchi diretti totali durante la partita: ogni attacco deve essere non bloccato e condotto con almeno 3 creature."*
  - *"Non hai mai messo il tuo Leader in campo fino al tuo secondo e ultimo respawn. Dal momento in cui lo giochi, deve restare in campo per 5 turni consecutivi senza morire. Vinci la partita in questo stato."*

### 6.2 — Setup: assegnazione degli obiettivi
- Gli obiettivi **non vengono scelti dal giocatore stesso**, ma dal proprio **avversario** (o, nel multiplayer, dal giocatore alla propria destra)
- L'avversario pesca casualmente dal Mazzo Obiettivi e assegna le carte senza vederle (il sistema sceglie a caso tra la categoria appropriata in base alla scelta del step 6.3)
- L'obiettivo assegnato è **segreto**: solo il proprietario può vederlo

### 6.3 — Scelta del formato obiettivo
Prima di inizio partita (o durante il setup della lobby), ogni giocatore sceglie **il proprio formato vittoria**:

- **Formato Difficile:** ricevi **1 solo Obiettivo Difficile** da completare
- **Formato Facile:** ricevi **3 Obiettivi Facili** da completare (tutti e tre, non solo uno)

La scelta del formato è **pubblica** (gli avversari sanno quanti obiettivi hai), ma il contenuto degli obiettivi rimane segreto.

### 6.4 — Vittoria ed Eliminazione
**Vittoria:** Il giocatore che **completa per primo** il proprio set di obiettivi **vince la partita** e li rivela pubblicamente.
- Nel **Formato Difficile:** basta completare il singolo obiettivo
- Nel **Formato Facile:** tutti e 3 gli obiettivi devono essere completati (anche non simultaneamente)
- Se più giocatori completano nello stesso turno, si valuta un sistema di spareggio (es. chi ha meno HP vince per "aver lottato di più" — da bilanciare)

**Eliminazione e Respawn:** Azzerare gli HP di un avversario non è immediatamente definitivo. Si applica il seguente sistema a 3 vite:

- **1ª morte:** l'avversario respawna con **metà degli HP iniziali** di quella vita (es. se iniziava con 30 HP, respawna con 15)
- **2ª morte:** l'avversario respawna con **metà degli HP iniziali della vita precedente** (es. 15 → 7, arrotondato per difetto)
- **3ª morte:** l'avversario è **eliminato definitivamente**

**Vittoria per HP:** Uccidere un avversario per la **3ª volta** è una condizione di vittoria alternativa al completamento dell'obiettivo. Vale in 1v1 e in FFA (in FFA, elimini definitivamente quel giocatore, ma devi comunque vincere la partita completando il tuo obiettivo o eliminando tutti gli altri avversari allo stesso modo).

**Cosa succede al respawn:**
- Il giocatore torna in gioco all'inizio del proprio turno successivo
- **Creature:** tutte le creature in campo muoiono e vanno al Cimitero
- **Leader:** torna nella Zona di Comando (con il costo incrementale già accumulato intatto); il giocatore può rimandarlo in campo scegliendo tra Opzione A o B come di consueto
- **Permanenti non-creatura** (Terre, Santuario, Satellite, Benedizioni, Tragedie, Artefatti non equipaggiati): **rimangono in campo** invariati
- **Mano e mazzo:** rimangono invariati
- **Avanzamento obiettivi:** si conserva integralmente

> Questa meccanica crea una tensione strategica a lungo termine: uccidere un avversario è utile (lo indebolisce progressivamente), ma completare il proprio obiettivo rimane sempre la via più diretta alla vittoria.

### 6.5 — Note strategiche
- In **1v1**, la scelta del formato avversario è un'informazione pubblica: sapere che l'avversario ha 3 obiettivi facili ti dice che probabilmente punta a condizioni multiple e versatili
- In **multiplayer FFA**, l'assegnazione casuale da parte del giocatore alla destra introduce dinamiche sociali: potresti "sabotare" un avversario specifico con un obiettivo più difficile da raggiungere (se il sistema lo permette — meccanica opzionale da configurare)

---

## 7. COMBATTIMENTO – REGOLE DETTAGLIATE

### 7.1 — Attacco
- Il giocatore attivo dichiara i propri attaccanti nella fase "Declare Attackers"
- Le unità tappate (usate in precedenza) non possono attaccare
- Gli attacchi possono essere diretti verso: **giocatori avversari** o **Alleati/Partner avversari**
- Il **Leader avversario in campo è trattato come una creatura normale**: non può essere scelto come bersaglio diretto di un attacco. Per danneggiarlo occorre che non abbia bloccanti davanti (come qualsiasi altra creatura)

### 7.2 — Blocco
- Ogni giocatore che viene attaccato può assegnare proprie Unità come bloccanti
- Il blocco è **1 bloccante per attaccante** (salvo abilità speciali)
- Le unità che bloccano non vengono tappate
- Un'unità può bloccare solo 1 attaccante per volta (salvo abilità speciali)

### 7.3 — Calcolo danno
- **Danno da combattimento:** ATK dell'attaccante vs DEF del bloccante
  - Se ATK > DEF del bloccante: il bloccante viene distrutto, il danno in eccesso NON va al giocatore (salvo abilità *Travolta*)
  - Se ATK = DEF: entrambe le unità vengono distrutte
  - Se ATK < DEF del bloccante: l'attaccante subisce il danno; se DEF del bloccante > ATK dell'attaccante, l'attaccante viene distrutto
- **Danno diretto (nessun blocco):** il danno dell'ATK dell'attaccante va direttamente agli HP del giocatore/Alleato bersaglio

### 7.4 — Cimitero
- Le unità distrutte vanno nel **Cimitero** (zona visibile a tutti i giocatori)
- Alcune carte possono interagire con il Cimitero (recuperare carte, contare carte, ecc.)

---

## 8. MODALITÀ DI GIOCO

### 8.1 — 1v1 Duello
- 2 giocatori si sfidano direttamente
- Ogni giocatore ha il proprio mazzo da 60 carte (incluso il Leader, che resta in Zona di Comando) + obiettivi assegnati dall'avversario
- HP consigliati: 30 per partite rapide

### 8.2 — Multiplayer Free-For-All (FFA)
- 3 o 4 giocatori, tutti contro tutti
- Turni in senso orario
- Ogni giocatore riceve i propri obiettivi dal giocatore alla propria destra
- HP consigliati: 50 per partite più durature
- **Attacchi in FFA:** un'unità può attaccare **qualsiasi avversario** a scelta del giocatore attivo (non solo il giocatore adiacente)
- Possibilità di formare alleanze temporanee (da implementare come meccanica opzionale)

---

## 9. NOTE PER LO SVILUPPO (Claude Code)

- Tutti i valori numerici (HP, dimensione mazzo, limite mano, ecc.) devono essere **configurabili** tramite costanti/parametri per facilitare il bilanciamento futuro
- Il sistema degli Obiettivi Segreti richiede uno strato di logica nascosta: le carte obiettivo non devono mai essere trasmesse agli altri client in chiaro; solo lo stato di completamento (quanti completati su quanti totali) è pubblico
- Il formato obiettivo scelto da ogni giocatore (Difficile = 1 carta / Facile = 3 carte) è **informazione pubblica** e deve essere visibile nell'UI a tutti i giocatori
- L'assegnazione casuale degli obiettivi dal giocatore alla destra deve essere gestita lato server, non lato client, per prevenire cheating
- Il **contatore utilizzi** delle carte a utilizzo limitato deve essere tracciato in tempo reale e visibile sull'interfaccia (badge numerico sulla carta o indicatore visivo)
- Il **Leader** richiede una zona UI dedicata separata (**Zona di Comando**), sempre visibile a tutti; deve avere stato "in campo" / "in zona di comando" / "in cooldown (turni rimanenti)" / "evolvibile"
- Il sistema di **Evoluzione del Leader** richiede un tracking di condizioni multiple in tempo reale; l'evoluzione deve essere permanente anche dopo morte/rientro dalla Zona di Comando
- La struttura a turni con sotto-fasi deve supportare un sistema di **priorità e stack** per la risoluzione di Istanti e abilità, seguendo il sistema di Magic: The Gathering:
  - Lo **stack** è una pila LIFO (Last In, First Out): l'ultima carta/abilità aggiunta si risolve per prima
  - La **priorità** passa in senso orario dopo ogni azione; un giocatore può rispondere con un Istante o abilità prima che lo stack si risolva
  - Lo stack si risolve solo quando **tutti i giocatori passano la priorità** consecutivamente senza aggiungere nulla
  - Le carte **Sorcery** non possono essere aggiunte allo stack durante il turno avversario o quando lo stack non è vuoto
- Zone di gioco per ogni giocatore: **Mano**, **Campo** (unità, alleati, artefatti), **Cimitero**, **Esilio**, **Zona di Comando** (Leader), **Zona Santuario** (globale, condivisa), **Zona Satellite** (personale), **Zona Tragedie/Benedizioni** (personale), **Zona Obiettivi** (nascosta)
- Il **costo Commander** del Leader (costo base + incremento per ogni morte) deve essere tracciato e visibile al giocatore proprietario nell'UI della Zona di Comando
