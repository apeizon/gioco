# Tipi di Carte Permanenti — Santuario, Satellite, Tragedia, Benedizione
*Documento di specifica per Claude Code — approfondimento sui 4 tipi di carte permanenti non-creatura*

---

## PREMESSA

Questi 4 tipi di carte sono tutti **permanenti**: restano in campo dopo essere stati giocati e hanno effetti continui. Non vanno al Cimitero quando vengono giocati (come invece fanno le Magie Sorcery/Istante). Si comportano come "incantesimi di campo" con regole proprie per ognuno.

---

## 1. SANTUARIO

### Cos'è
Una carta permanente che modifica le regole globali del campo di battaglia. Si ispira alle "Field Spell" di Yu-Gi-Oh: quando è attivo, i suoi effetti si applicano a **tutti i giocatori** contemporaneamente, non solo a chi lo ha giocato.

### Regole chiave
- **Slot globale unico:** esiste **una sola zona Santuario** sul campo, condivisa tra tutti i giocatori. Non ci possono essere 2 Santuari attivi contemporaneamente.
- **Sostituzione automatica:** se un giocatore gioca un Santuario mentre ce n'è già uno attivo, il Santuario precedente viene **distrutto immediatamente** (va al Cimitero del giocatore che lo possedeva) e il nuovo entra in campo.
- **Effetti globali:** i suoi effetti si applicano a tutti i giocatori finché rimane in campo. Nessun giocatore è immune automaticamente.
- **Giocabile in:** Main Phase 1 o Main Phase 2, come qualsiasi altro permanente.
- **Non ha ATK/DEF:** non è una creatura, non può attaccare né bloccare.
- **Può avere utilizzi limitati** (come tutte le carte del gioco): se ha un contatore, quando scende a 0 va al Cimitero.

### Esempi di effetti possibili
- Modificare il costo in mana di certi tipi di carte per tutti
- Cambiare regole di combattimento (es. tutte le unità guadagnano +1 ATK)
- Generare effetti a inizio/fine turno per tutti i giocatori
- Condizionare il mana disponibile

### Zona UI
- **Nome zona:** "Zona Santuario" — **globale e condivisa**
- **Posizione nel mockup:** lato sinistro del campo, all'altezza del divisore centrale (y≈309px, left:8px)
- **Dimensione UI:** mini-carta 42×58px (uguale ai pannelli laterali)
- **Visibile a:** tutti i giocatori
- **Stato possibili:** `attivo` / `slot_vuoto`

### Logica di sviluppo
```
- zonaGlobale: SanctuarySlot (una sola istanza per partita)
- onPlay(nuovoSantuario):
    if (zonaGlobale.occupato):
        distruggi(zonaGlobale.cartaAttuale) → CimiteroProprietario
    zonaGlobale.cartaAttuale = nuovoSantuario
    attiva(effetti del nuovo Santuario per tutti)
- onDistruzione():
    zonaGlobale.occupato = false
    rimuovi(effetti del Santuario da tutti)
```

---

## 2. SATELLITE

### Cos'è
Una carta permanente **personale**: funziona esattamente come il Santuario, ma i suoi effetti si applicano **solo al giocatore che lo possiede**. Ogni giocatore ha la propria Zona Satellite separata.

### Differenza fondamentale rispetto al Santuario
| | Santuario | Satellite |
|---|---|---|
| Effetto | Globale (tutti i giocatori) | Personale (solo il proprietario) |
| Slot | 1 globale, condiviso | 1 per giocatore, separato |
| Può coesistere con avversario | No (si sovrascrivono) | Sì (ogni giocatore ha il suo) |

### Regole chiave
- **Slot personale:** ogni giocatore ha la propria Zona Satellite, separata da quella degli avversari.
- **Sostituzione automatica:** se un giocatore gioca un nuovo Satellite mentre ne ha già uno attivo nel proprio campo, il Satellite precedente viene **distrutto automaticamente** (senza costi aggiuntivi).
- **Effetti solo personali:** il Satellite non interferisce con gli avversari direttamente (i suoi effetti non si applicano a loro).
- **Non ha ATK/DEF:** non è una creatura.
- **Può avere utilizzi limitati.**

### Esempi di effetti possibili
- Generare mana extra ogni turno
- Modificare le regole di pesca (es. pesca 2 carte invece di 1)
- Proteggere le proprie unità da certi effetti
- Ridurre il costo di certi tipi di carte nel proprio turno

### Zona UI
- **Nome zona:** "Zona Satellite" — **personale per ogni giocatore**
- **Posizione nel mockup:** mini-carta nel pannello SX del giocatore (insieme a Leader, Tragedia, ecc.)
- **Dimensione UI:** mini-carta 42×58px
- **Visibile a:** tutti i giocatori (la presenza del Satellite è pubblica, ma l'effetto specifico può essere letto da chiunque)
- **Stato possibili:** `attivo` / `slot_vuoto` (se slot vuoto, non mostrare la mini-carta nel pannello)

### Logica di sviluppo
```
- per ogni giocatore: zonaSatellite: SatelliteSlot (istanza separata)
- onPlay(nuovoSatellite, giocatore):
    if (giocatore.zonaSatellite.occupato):
        distruggi(giocatore.zonaSatellite.cartaAttuale) → CimiteroGiocatore
    giocatore.zonaSatellite.cartaAttuale = nuovoSatellite
    attiva(effetti del Satellite solo per giocatore)
- onDistruzione(giocatore):
    giocatore.zonaSatellite.occupato = false
    rimuovi(effetti del Satellite da giocatore)
```

---

## 3. TRAGEDIA / MALEDIZIONE

### Cos'è
Una carta permanente **ad alto rischio / alto rendimento** che si "attacca" al giocatore stesso (non a una creatura). Applica **contemporaneamente un malus E un bonus** al proprio giocatore. È una scelta consapevole: il giocatore decide di "danneggiare sé stesso" per ottenere un vantaggio.

### Regole chiave
- **Si attacca al giocatore:** non va su una creatura, va direttamente sul proprio "stato giocatore".
- **Doppio effetto simultaneo:** ogni Tragedia ha SEMPRE sia un malus che un bonus. Non esistono Tragedie con solo malus o solo bonus.
- **Permanente:** rimane attiva finché non viene rimossa (da un effetto, da una Magia, ecc.). Non si rimuove automaticamente dopo N turni salvo se l'effetto lo specifica esplicitamente.
- **Cumulabile:** si possono avere **più Tragedie attive contemporaneamente** sullo stesso giocatore. Tutti i malus e i bonus si sommano.
- **Giocata volontariamente:** solo il proprietario può giocare una Tragedia su sé stesso. Non può essere "lanciata" su un avversario.
- **Non ha ATK/DEF.**
- **Può avere utilizzi limitati** (il contatore rappresenta i turni/usi rimanenti dell'effetto).

### Esempio concreto
> *"Dimezza i tuoi HP attuali. Per i prossimi 3 turni, hai 2 fasi di combattimento per turno."*
> - Malus: perdi metà degli HP subito
> - Bonus: puoi attaccare due volte per 3 turni

### Design intent
Le Tragedie esistono per creare momenti drammatici e build aggressive. Un giocatore può decidere di sacrificare HP o risorse per sbloccare capacità offensive/difensive che normalmente non avrebbe.

### Zona UI
- **Nome zona:** "Zona Tragedie" — **personale per ogni giocatore**
- **Posizione nel mockup:** mini-carta nel pannello SX del giocatore (sotto Satellite, sopra Obiettivo)
- **Dimensione UI:** mini-carta 42×58px, border cremisi `#6a1a3a`
- **Badge:** mostrare il numero di Tragedie attive se più di 1 (es. `×2`)
- **Visibile a:** tutti i giocatori (la presenza e il numero sono pubblici; il contenuto è leggibile cliccando)
- **Stato possibili:** `nessuna` (slot nascosto) / `attiva` / `attive_multiple` (badge con contatore)

### Logica di sviluppo
```
- per ogni giocatore: lista zonaTragedie[] (nessun limite di slot, array)
- onPlay(nuovaTragedia, giocatore):
    giocatore.zonaTragedie.push(nuovaTragedia)
    applica(malus di nuovaTragedia a giocatore)
    applica(bonus di nuovaTragedia a giocatore)
- onRimozione(tragedia, giocatore):
    giocatore.zonaTragedie.remove(tragedia)
    rimuovi(effetti di tragedia da giocatore)
- UI: mostra una mini-carta con badge ×N se N > 1
```

---

## 4. BENEDIZIONE

### Cos'è
Una carta permanente che fornisce **buff permanenti e cumulativi** al proprio giocatore o campo. È il contrario della Tragedia: solo effetti positivi, nessun malus. Pensata per strategie a lungo termine.

### Differenza fondamentale rispetto alla Tragedia
| | Tragedia | Benedizione |
|---|---|---|
| Effetti | Malus + Bonus (entrambi obbligatori) | Solo Bonus |
| Rischio | Alto (il malus può essere pesante) | Nessuno (solo vantaggi) |
| Strategia | Aggressiva/disperata | Costruttiva/long game |

### Regole chiave
- **Si attacca al giocatore:** come la Tragedia, non va su una creatura.
- **Solo effetti positivi:** nessun malus associato.
- **Permanente:** rimane attiva per tutta la partita (salvo rimozione da effetti avversari).
- **Cumulabile:** si possono avere **più Benedizioni attive contemporaneamente**. Tutti i bonus si sommano.
- **Bilanciamento tramite costo mana:** essendo solo positive, hanno un costo in mana più elevato rispetto a effetti simili su altri tipi di carte.
- **Non ha ATK/DEF.**
- **Può avere utilizzi limitati.**

### Esempio concreto
> *"Da questo momento, hai 1 mana aggiuntivo ogni turno." (Costo: 5 mana)*

### Design intent
Le Benedizioni esistono per build "snowball": il giocatore investe mana ora per ottenere vantaggi composti più avanti nella partita. Spendere 5 mana per +1 mana/turno è un investimento che si ripaga dopo 5 turni.

### Zona UI
- **Nome zona:** "Zona Benedizioni" — **personale per ogni giocatore**
- **Posizione nel mockup:** mini-carta nel pannello SX del giocatore (sotto Tragedia, sopra Obiettivo)
- **Dimensione UI:** mini-carta 42×58px, border verde scuro `#1a4a2a`, glow `rgba(26,74,42,0.3)`
- **Badge:** mostrare il numero di Benedizioni attive se più di 1 (es. `×3`)
- **Visibile a:** tutti i giocatori (la presenza e il numero sono pubblici)
- **Stato possibili:** `nessuna` (slot nascosto) / `attiva` / `attive_multiple` (badge con contatore)

### Logica di sviluppo
```
- per ogni giocatore: lista zonaBenedizioni[] (nessun limite di slot, array)
- onPlay(nuovaBenedizione, giocatore):
    giocatore.zonaBenedizioni.push(nuovaBenedizione)
    applica(bonus di nuovaBenedizione a giocatore)
- onRimozione(benedizione, giocatore):
    giocatore.zonaBenedizioni.remove(benedizione)
    rimuovi(effetti di benedizione da giocatore)
- UI: mostra una mini-carta con badge ×N se N > 1
```

---

## 5. RIEPILOGO COMPARATIVO

| | Santuario | Satellite | Tragedia | Benedizione |
|---|---|---|---|---|
| **Scope** | Globale (tutti) | Personale | Personale | Personale |
| **Slot** | 1 globale | 1 per giocatore | Illimitati (array) | Illimitati (array) |
| **Sostituzione** | Automatica | Automatica | Non si sostituisce, si accumula | Non si sostituisce, si accumula |
| **Effetti** | Regole globali | Vantaggi personali | Malus + Bonus | Solo Bonus |
| **Rischio** | Neutro (dipende dalla carta) | Basso | Alto (malus obbligatorio) | Nessuno |
| **Rimane al respawn** | ✅ Sì | ✅ Sì | ✅ Sì | ✅ Sì |
| **Ha ATK/DEF** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Può avere utilizzi limitati** | ✅ Sì | ✅ Sì | ✅ Sì | ✅ Sì |

---

## 6. COMPORTAMENTO AL RESPAWN

Quando un giocatore muore e respawna (vedi REGOLE_BASE_TCG.md §6.4):
- **Santuario:** rimane in campo invariato (è globale, non appartiene al giocatore morto)
- **Satellite:** rimane in campo invariato nel campo del giocatore che è morto
- **Tragedie attive:** rimangono attive sul giocatore che respawna
- **Benedizioni attive:** rimangono attive sul giocatore che respawna

Solo le **creature** muoiono al respawn. Tutti i permanenti non-creatura sopravvivono.

---

## 7. FILE CORRELATI

- `regole/REGOLE_BASE_TCG.md` — sezione 5 (tutti i tipi di carte), sezione 6.4 (respawn)
- `regole/KEYWORD.md` — abilità speciali applicabili anche a questi tipi
- `regole/FAZIONI.md` — ogni fazione ha accesso a certi tipi di Santuario/Satellite/ecc.
- `UI/UI_CAMPO_BATTAGLIA.md` — posizioni UI e stili visivi di questi elementi
- `UI/campo_battaglia_mockup.html` — mockup interattivo del campo
