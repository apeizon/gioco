# Obiettivi Segreti — Formato Start Mobile

> Pool degli Obiettivi Segreti del **formato Start Mobile** (regolamento `DESIGN_V1.md`).
> Questo file vale **solo** per il formato Start Mobile. Il formato Leader usa il proprio sistema in `regole/OBIETTIVI.md` (Mazzo Obiettivi): i due non si toccano.

---

## Regole generali (formato Start Mobile)

- Ogni giocatore riceve **un solo Obiettivo Segreto**, pescato a caso da un **pool curato** (niente Mazzo Obiettivi costruito a mano).
- L'obiettivo viene **assegnato dall'avversario** (in 1 contro 1 lo fa pescare il sistema) — questo crea il mind-game.
- Il **contenuto** dell'obiettivo è **segreto**: solo il proprietario lo vede.
- Il **progresso è invece pubblico, in forma vaga e telegrafata** a 3 stati, visibile a entrambi i giocatori. È il punto numero uno di game-feel: dà counterplay (l'avversario vede che stai per completarlo e può spingere sugli punti vita o interferire), così perdere a un obiettivo non sembra ingiusto.
- **Telegrafo a 3 stati:** ○○○ Lontano → ●○○ Avviato → ●●○ Vicino → ●●● Quasi.
- **Doppia via di vittoria, in parallelo per tutta la partita:** vince il primo che porta i punti vita dell'avversario a **0** **oppure** completa il proprio Obiettivo Segreto.
- **Ranked:** tutti gli obiettivi del pool ranked hanno **difficoltà e tempo di completamento equivalenti** (niente facile contro difficile casuale in competitivo).
- **Casual:** può pescare anche dal pool casual, con varietà di difficoltà e obiettivi più scenografici.

> Nota di calibrazione: la difficoltà degli obiettivi ranked è **provvisoria** e va validata in playtest tramite telemetria (vedi `DESIGN_V1.md` §10 e §12).

---

## Pool RANKED (22)

Tutte le condizioni usano solo meccaniche del formato Start Mobile (punti vita 30, attacco diretto stile Hearthstone, danno persistente, campo massimo 6 creature, energia automatica con cap 8, fatigue su mazzo vuoto, Leader nella Zona di Comando, keyword Provocazione / Velocità / Travolta).

| # | Condizione | Telegrafo pubblico |
|---|---|---|
| R01 | Infliggi danno da attacco allo stesso avversario per 3 turni consecutivi. | barra sulla serie di turni consecutivi (0 → 3) |
| R02 | Porta l'avversario a 10 punti vita o meno. | barra sui punti vita avversari residui |
| R03 | Infliggi almeno 8 danni ai punti vita avversari in un solo turno. | barra sul miglior turno di danno fatto finora |
| R04 | Distruggi 5 creature avversarie in combattimento nel corso della partita. | barra sul conteggio (0 → 5) |
| R05 | Controlla 4 creature contemporaneamente per la durata di un tuo intero turno. | barra sul massimo numero di creature mantenuto |
| R06 | Controlla 6 creature contemporaneamente (campo pieno) in un qualsiasi momento. | barra sul massimo numero di creature raggiunto |
| R07 | Fai entrare in campo 7 creature nel corso della partita (i token contano). | barra sul conteggio (0 → 7) |
| R08 | Non subire danni ai tuoi punti vita per 3 turni consecutivi. | barra sulla serie di turni "puliti" |
| R09 | Ripristina almeno 8 punti salute complessivi alle tue creature curando il danno accumulato. | barra sulla cura accumulata |
| R10 | Termina 4 tuoi turni controllando almeno una creatura con Provocazione. | barra sul conteggio turni (0 → 4) |
| R11 | Abbi 8 o più carte nel tuo Cimitero. | barra sulla dimensione del tuo Cimitero |
| R12 | Porta l'avversario a pescare da mazzo vuoto, infliggendogli almeno 1 danno da fatigue. | barra sulle carte rimaste nel mazzo avversario |
| R13 | Fai sì che le carte nei due Cimiteri sommino almeno 15. | barra sul totale dei due Cimiteri |
| R14 | Gioca il tuo Leader in campo e tienilo vivo per 4 turni consecutivi senza che torni nella Zona di Comando. | barra sulla serie di turni del Leader in campo |
| R15 | Infliggi danno ai punti vita avversari con il tuo Leader in 3 turni distinti. | barra sul conteggio (0 → 3) |
| R16 | Attiva il tuo Hero Power 3 volte nel corso della partita. | barra sul conteggio (0 → 3) |
| R17 | Spendi almeno 6 energia in un solo turno. | barra sul miglior turno di spesa energia |
| R18 | Termina 3 tuoi turni consecutivi con 0 energia residua. | barra sulla serie di turni consecutivi |
| R19 | Lancia 6 Magie nel corso della partita. | barra sul conteggio (0 → 6) |
| R20 | Lancia 2 Magie nello stesso turno. | indicatore acceso per turno (vicino quando ne lanci una) |
| R21 | Controlla più creature dell'avversario alla fine di 3 tuoi turni consecutivi. | barra sulla serie di turni consecutivi |
| R22 | Inizia un tuo turno con 7 carte in mano (mano piena). | barra sulla dimensione della tua mano |

---

## Pool CASUAL (6)

Varietà di difficoltà, obiettivi più scenografici. Non bilanciati per il competitivo.

| # | Condizione | Telegrafo pubblico |
|---|---|---|
| C01 | Vinci la partita controllando esattamente 1 Creatura, con il tuo Leader in campo, avendo giocato 1 Magia in quel turno (uno per tipo). | "3 condizioni su 3" |
| C02 | Vinci nello stesso turno in cui riempi il campo con 6 creature. | barra sul numero di creature in campo |
| C03 | Porta l'avversario da 20 o più punti vita a 0 in un solo turno (one-shot). | barra sui punti vita avversari residui |
| C04 | Vinci la partita senza aver mai giocato il tuo Leader in campo. | indicatore acceso finché la condizione resta viva |
| C05 | Vinci la partita controllando solo token. | indicatore acceso quando il campo è di soli token |
| C06 | Sopravvivi 3 turni consecutivi a 3 punti vita o meno, poi vinci la partita. | barra sulla serie di turni a basso numero di punti vita |
