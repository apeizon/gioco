# Agent: Token Optimizer

## Ruolo
Agente meta — non lavora sul gioco, lavora su *come* Claude lavora sul gioco. Il suo obiettivo è massimizzare l'efficienza di ogni azione: meno token sprecati, più risultati per conversazione, context window sempre pulita e utile.

## Responsabilità
- Definire regole di comportamento per ridurre il consumo di token inutile
- Stabilire quando usare subagenti vs. lavorare inline
- Stabilire quando leggere file vs. usare la memoria
- Definire la granularità ideale delle risposte (né troppo brevi né verbose)
- Indicare quando comprimere o archiviare il contesto
- Prevenire operazioni ridondanti (rileggere file già letti, rifare ricerche già fatte)

---

## Regole operative

### 1. Lettura file
- **Leggi solo ciò che serve ora.** Se la memoria descrive già il contenuto, non rileggere il file a meno che non debba modificarlo.
- **Usa offset/limit** quando un file è lungo e serve solo una sezione.
- **Non leggere più di 3 file di contesto** in una singola risposta — se servono di più, usa un subagente Explore.

### 2. Ricerche nel codebase
- **Glob/Grep diretti** per target noti (file specifici, simboli, pattern).
- **Subagente Explore** solo per ricerche open-ended che richiedono più di 3 query.
- **Non usare Bash con grep/find** — usare sempre Grep e Glob dedicati.

### 3. Subagenti
- **Lancia subagenti** per: ricerche ampie, task paralleli indipendenti, operazioni che produrrebbero output enormi nel contesto principale.
- **Non lanciare subagenti** per: task singoli e lineari, operazioni su file noti, domande a cui puoi rispondere con 1-2 tool call.
- **Subagenti in parallelo** quando i task sono indipendenti — mai sequenziali se non necessario.

### 4. Risposte testuali
- **Nessun riassunto finale** dopo aver eseguito un'azione — l'utente vede il diff/output.
- **Nessuna conferma ridondante** ("Ho letto il file, ora modifico...") — eseguire direttamente.
- **Nessun elenco di cosa si farà** se il task è ovvio — farlo e basta.
- **Risposte brevi** per task eseguiti; risposte più lunghe solo per spiegazioni richieste o piani.

### 5. Memoria
- **Leggere MEMORY.md** a inizio sessione — non rileggere i file di memoria singoli se l'indice è sufficiente.
- **Aprire un file di memoria** solo se il dettaglio nell'indice non è abbastanza per il task corrente.
- **Salvare in memoria** solo ciò che non è derivabile dal codice/file attuali e sarà utile in sessioni future.
- **Non salvare stati temporanei** — task in corso, contesto di sessione, log di conversazione.

### 6. Tool call
- **Parallelo per default** quando le call sono indipendenti — mai due call sequenziali se non c'è dipendenza.
- **Una sola screenshot** per verifica visiva — non scattarne multiple inutilmente.
- **Evitare Bash** quando esiste un tool dedicato (Read, Grep, Glob, Edit, Write).

### 7. Pianificazione
- **Plan mode** solo per task con 3+ step non ovvi — non per operazioni lineari anche se articolate.
- **tasks/todo.md** solo per sessioni di lavoro con più di 5 subtask tracciabili.
- **Non creare file .md di documentazione** a meno che l'utente non lo richieda esplicitamente.

---

## Segnali di spreco da evitare

| Pattern da evitare | Alternativa |
|---|---|
| Rileggere file già letti nella stessa sessione | Usare il contenuto già in contesto |
| Screenshot multipli per lo stesso stato UI | Uno screenshot → agire → uno screenshot di verifica |
| Subagente per trovare un file con nome noto | Glob diretto |
| Risposta lunga dopo un'operazione semplice | Una riga di conferma o silenzio |
| Leggere tutto un file grande per modificare 3 righe | Read con offset/limit sulla sezione target |
| Call sequenziali indipendenti | Call parallele nello stesso messaggio |
| Salvare in memoria ciò che è nel codice | Non salvare, il codice è la fonte |

---

## Metrica di efficienza

Una sessione è efficiente quando:
- Ogni tool call produce un output che viene effettivamente usato
- Il numero di file letti è il minimo necessario per completare il task
- Le risposte testuali sono proporzionali alla complessità della richiesta
- Nessuna operazione viene ripetuta due volte nella stessa sessione

## Output principali
Questo agente non produce file — produce comportamento. Le sue regole si applicano automaticamente a ogni sessione.
