# TCG – Economia e Sistema di Progressione
> Documento di specifica per lo sviluppo dell'app mobile

---

## 1. MODELLO DI BUSINESS

- **App gratuita** — nessun costo di download
- **Free to play** con shop integrato e Battle Pass stagionale
- **Filosofia anti-pay-to-win:** tutte le carte sono ottenibili gratuitamente attraverso gioco, sfide e missioni. Il pagamento accelera la progressione e sblocca cosmetici, non vantaggi competitivi esclusivi

---

## 2. RARITÀ DELLE CARTE

| Rarità | Nome | Colore bordo | Drop rate pack |
|--------|------|--------------|----------------|
| ★ | Comune | Grigio argento | 58% |
| ★★ | Non Comune | Verde smeraldo | 27% |
| ★★★ | Rara | Viola cosmico | 12% |
| ★★★★ | Eterno | Oro con glow | 3% |

### Note rarità
- Le **Eterne** hanno animazioni speciali (bordo animato, effetto foil, particelle al gioco)
- Le **Rare** hanno un bordo luminoso statico
- Ogni carta ha rarità fissa — non esistono versioni alternate della stessa carta a rarità diversa (salvo skin cosmetiche, vedi §6)
- Le carte **Obiettivo** hanno un sistema di rarità separato (vedi §5)

---

## 3. VALUTE DI GIOCO

| Valuta | Nome | Come si ottiene | A cosa serve |
|--------|------|-----------------|--------------|
| 💠 Frammenti | Frammenti | Missioni giornaliere, partite, Battle Pass gratuito | Pack Comuni, crafting carte Comuni/Non Comuni |
| 🔮 Essenza | Essenza | Sfide settimanali, Battle Pass, traguardi stagionali | Pack misti, crafting carte Rare |
| ✦ Stelle Eterne | Stelle Eterne | Acquisto con valuta reale, Battle Pass premium, eventi speciali | Pack Eterni, crafting carte Eterne, shop cosmetici |

### Conversione valute
- Le valute **non si convertono tra loro** direttamente
- I Frammenti non possono comprare Essenza — mantengono sfere di utilizzo separate
- Le Stelle Eterne sono l'unica valuta premium acquistabile con denaro reale

### Pacchetti Stelle Eterne (prezzi lancio)

| Pacchetto | Stelle Eterne | Prezzo |
|-----------|--------------|--------|
| Piccolo | 600 | €3,49 |
| Medio | 1.400 | €6,99 |
| Grande | 3.000 | €13,99 |
| XL | 7.000 | €34,99 |

**Prodotti diretti**

| Prodotto | Prezzo | Note |
|----------|--------|------|
| Battle Pass (8 settimane) | €4,89 | — |
| Starter Pack | €1,99 | Solo D1-D7, una tantum, valore esagerato per convertire free player |

> Pack Eterno (500 SE) equivale a **€2,91** al prezzo entry — strategia di lancio aggressiva, sotto Marvel Snap.

### Limite crafting settimanale (anti-OP al lancio)
Per impedire che chi spende subito costruisca mazzi dominanti, è attivo un limite di crafting settimanale per rarità:
- Max **2 carte Eterne** craftabili per settimana
- Max **4 carte Rare** craftabili per settimana

Il limite non blocca la spesa ma diluisce la velocità di acquisizione. Rivedibile dopo la fase di lancio.

---

## 4. PACK

### 4.1 — Tipi di Pack

| Pack | Costo | Contenuto garantito |
|------|-------|---------------------|
| Pack Comune | 100 💠 Frammenti | 5 carte: min. 3 Comuni, 1 Non Comune garantita |
| Pack Misto | 300 🔮 Essenza | 5 carte: min. 2 Non Comuni, 1 Rara garantita |
| Pack Eterno | 500 ✦ Stelle Eterne | 5 carte: min. 2 Rare, 1 Eterno garantita |
| Pack Fazione | 250 🔮 Essenza | 5 carte di una fazione specifica a scelta |
| Pack Obiettivi | sistema separato (vedi §5) | — |

### 4.2 — Pity System (sistema garanzia)
- **Rara garantita** ogni 5 Pack Comuni senza Rara
- **Eterno garantito** ogni 10 Pack Misti senza Eterno
- **Eterno garantito** ogni 4 Pack Eterni senza Eterno
- Il contatore pity si azzera quando si ottiene la carta garantita
- Il contatore è **persistente** tra le sessioni e visibile al giocatore

### 4.3 — Pack duplicati
- Se si ottiene una carta già posseduta al massimo delle copie consentite, viene automaticamente convertita in **frammenti di quella rarità** (utilizzabili per il crafting)

---

## 5. COPIE PER MAZZO

| Rarità | Copie massime per mazzo |
|--------|------------------------|
| Comune | 4 |
| Non Comune | 3 |
| Rara | 2 |
| Eterno | 1 |

---

## 6. CRAFTING (CREAZIONE CARTE)

Il giocatore può creare carte specifiche spendendo valuta, senza affidarsi alla casualità dei pack.

| Rarità carta | Costo crafting | Valuta |
|-------------|----------------|--------|
| Comune | 50 | 💠 Frammenti |
| Non Comune | 150 | 💠 Frammenti |
| Rara | 200 | 🔮 Essenza |
| Eterno | 400 | ✦ Stelle Eterne |

### Disincanto (smantellamento)
Smantellare carte in eccesso restituisce frammenti della loro rarità:

| Rarità | Frammenti ottenuti |
|---------|--------------------|
| Comune | 10 💠 |
| Non Comune | 35 💠 |
| Rara | 60 🔮 |
| Eterno | 100 ✦ |

---

## 7. SBLOCCO CARTE SENZA PAGARE

Il sistema garantisce che ogni carta sia ottenibile gratuitamente attraverso il gioco.

### 7.1 — Missioni Giornaliere
- 3 missioni giornaliere disponibili ogni giorno, si resettano a mezzanotte
- Esempi: *"Vinci 2 partite"*, *"Gioca 5 carte Rare"*, *"Infliggi 15 danni in una partita"*
- Ricompensa: **50–150 💠 Frammenti** per missione

### 7.2 — Sfide Settimanali
- 5 sfide disponibili ogni settimana, più impegnative delle giornaliere
- Esempi: *"Vinci 10 partite ranked"*, *"Completa 3 obiettivi di tipo Difficile"*, *"Gioca 3 partite FFA"*
- Ricompensa: **100–300 🔮 Essenza** per sfida + 1 Pack Comune bonus

### 7.3 — Obiettivi Permanenti (Traguardi)
- Obiettivi a lungo termine che non scadono
- Ricompensa: **carte singole specifiche** (garantite, non casuali)
- Esempi: *"Gioca 100 partite totali → Rara garantita a scelta"*, *"Vinci il tuo primo torneo → 1 Eterno garantita"*
- Permettono al giocatore di puntare a carte specifiche desiderate

### 7.4 — Prime Vittorie del Giorno
- Prima vittoria di ogni giorno: +50 💠 Frammenti bonus
- Prima vittoria ranked di ogni giorno: +75 🔮 Essenza bonus

---

## 8. BATTLE PASS

Il Battle Pass ha durata stagionale (ogni stagione = 8 settimane).

### Traccia Gratuita (tutti i giocatori)
- 30 livelli di ricompense ottenibili giocando
- Contenuto: Frammenti, Essenza, Pack Comuni, 2 carte Rare garantite, 1 cosmetic base

### Traccia Premium (acquisto con Stelle Eterne)
- Stessa traccia + traccia parallela premium
- Contenuto aggiuntivo: Pack Eterni, Stelle Eterne, skin carte esclusive, avatar, effetti campo, 1 Eterno garantita per stagione
- Costo Battle Pass: **€4,89**

### Livellamento Battle Pass
- XP ottenuti giocando partite, completando missioni e sfide
- Partite ranked danno più XP delle casual
- Il livello Battle Pass non scade a fine stagione: si porta avanti solo il livello, non le ricompense non riscattate

---

## 9. SHOP

### Shop Rotante (aggiornamento settimanale)
- 6–8 carte singole disponibili per acquisto diretto con Stelle Eterne
- Include sempre almeno 1 Eterno e 2 Rare
- Ruota ogni settimana — garantisce visibilità su carte specifiche senza affidarsi solo ai pack

### Shop Cosmetici (permanente)
- **Skin carte:** varianti visive di carte esistenti (arte alternativa, frame diverso) — solo cosmetiche, stesse statistiche
- **Avatar:** immagine profilo del giocatore
- **Effetti campo:** animazioni del campo di battaglia
- **Dorso carte:** design alternativo per le carte in mano/mazzo
- **Effetti Leader:** animazioni speciali per l'abilità attiva del Leader

### Bundle stagionali
- Pacchetti tematici legati alla stagione corrente
- Contengono: pack + cosmetici + valuta bonus a prezzo scontato rispetto all'acquisto separato

---

## 10. STAGIONI

- Ogni stagione dura **8 settimane**
- Ogni stagione introduce un nuovo set di carte (espansione)
- A fine stagione: reset del rank competitivo con ricompense in base al grado raggiunto
- Le carte non diventano mai illegali/rotanti — non esiste un formato Standard con scadenza (almeno nella fase iniziale)

---

## 11. NOTE PER LO SVILUPPO (Claude Code)

- Tutte le valute devono essere tracciate server-side — mai lato client
- Il **pity system** deve essere persistente nel database per utente, mai resettato per errore
- Il crafting deve validare server-side che il giocatore abbia la valuta sufficiente prima di creare la carta
- La **conversione duplicati** deve avvenire automaticamente all'apertura del pack se si supera il limite di copie
- Il **Battle Pass level** deve essere calcolato con XP server-side; l'XP per partita deve essere assegnato solo a partite completate (prevenire abbandoni abusivi)
- Lo **shop rotante** deve essere determinato server-side con seed settimanale — non modificabile lato client
- Mostrare sempre il **contatore pity** visibile al giocatore nell'UI di apertura pack
- Il sistema missioni/sfide deve validare il completamento server-side prima di assegnare ricompense
