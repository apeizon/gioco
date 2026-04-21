# UI — Campo di Battaglia
*Documento di riferimento per l'implementazione mobile (React Native)*

---

## 1. FILOSOFIA VISIVA

Lo stile è **dark fantasy cosmico**: ispirato a Elden Ring, Dark Souls, Skyrim per l'estetica, e a Magic: The Gathering + Marvel Snap + Pokémon Pocket per la struttura del campo. L'interfaccia deve essere bella prima ancora che funzionale — ogni elemento ha glow, gradienti, animazioni sottili.

**Parole chiave visive:** oscuro, cosmico, dorato, mistico, pesante, elegante.

---

## 2. PALETTE COLORI

| Ruolo | Colore | Note |
|---|---|---|
| Sfondo base | `#050508` → `#0c0618` | Gradiente verticale |
| Oro (accenti, testo principale) | `#c9a84c` | Border, glow, font |
| Viola cosmico | `rgba(100,60,180,…)` | Glow creature, sfondo |
| Divisore | oro + viola | Linea centrale |
| HP giocatore | `#27ae60` (verde) | Barra HP |
| HP avversario | `#c0392b` (rosso) | Barra HP |
| Mana | `#7a4acc` → `#3d1a7a` | Sfere viola |

**Colori fazione** (dot e border carte):
- Nord → `#5588cc` (blu ghiaccio)
- Sud → `#cc4422` (rosso fuoco)
- Est → `#44aa66` (verde foresta)
- Ovest → `#8844aa` (viola ombra)
- Centro → `#aaaaaa` (grigio neutro)

---

## 3. TIPOGRAFIA

- **Font principale:** `Cinzel` (serif, maiuscolo, fantasy) — Google Fonts
- **Font secondario:** `Crimson Text` (italic, per descrizioni lore)
- Tutto il testo UI usa Cinzel. Nomi carte, label, badge, valori numerici.

---

## 4. DIMENSIONI SCHERMO

Il campo è progettato per **390×844px** (iPhone standard, portrait). Tutti i valori di posizione assoluta qui sotto fanno riferimento a questo viewport.

---

## 5. STRUTTURA DEL CAMPO — LAYOUT VERTICALE

```
┌─────────────────────────────────────┐  y:0
│  [AV AVATAR dx ♥♥♥ ◆0/N]  [TURNO] │  y:8   (avatar + vite + formato obiettivo)
│  [pan-av-sx]           [pan-av-dx]  │  y:60  (Leader†N sx / Mazzo+Cimit dx)
│         [MANO AVVERSARIO coperta]   │  y:60
│                                     │
│      — Campo Avversario —           │  y:215 (creature av, sopra divisore)
│                                     │
│ [SAN] ══════════ ◆ ════════════════ │  y:309/338 (Santuario sx + divisore)
│                                     │
│         — Il Tuo Campo —            │  y:368 (creature giocatore)
│                                     │
│                      [Mazzo]        │  y:476 (pan-gk-dx: mazzo+cimitero dx)
│                      [Cimitero]     │
│ [Leader†N ⬡X]                      │  y:530 (pan-gk-sx: Leader+Sat+Trag+Ben+Ob sx)
│ [Satellite]         [GK AVATAR dx]  │  y:600  (avatar + ♥♥♥ + ◆0/N)
│ [Tragedia]                          │
│ [Benedizione]                       │
│ [Obiettivo]                         │
│─────────────────────────────────────│  y:629
│          MANO GIOCATORE             │  height:215px, z-index:30
└─────────────────────────────────────┘  y:844
```

---

## 6. COMPONENTI DETTAGLIATI

### 6.1 Sfondo
- Gradiente radiale multiplo: viola scuro in alto, rosso scuro a destra, nero in basso
- **Stelle animate:** 90 punti bianchi (0.4–1.8px) con opacity variabile, animazione `twinkle` 2–5s alternate
- **Nebbia centrale:** radiale ellittica viola scuro centrata a y:280–500px (zona creature)

### 6.2 Divisore centrale
- **Posizione:** `top:338px`, larghezza full
- Linea orizzontale: gradiente `trasparente → viola → oro → viola → trasparente`
- Al centro: gemma diamante ruotata 45°, bordo oro, numero turno
- Glow aggiuntivo: blur 3px sotto la linea

### 6.3 Indicatore Turno + Fase
- **Posizione:** `top:10px`, centrato orizzontalmente
- Box quadrato 36×36px, bordo oro, font Cinzel 17px → numero turno
- Badge ellittico sotto: testo fase corrente (es. "⚔ Fase Combattimento")

### 6.4 Avatar Giocatori
Entrambi gli avatar sono sul **lato destro** (`right:8px`), `flex-direction:row-reverse` (hex a destra, info a sinistra).

| | Avversario | Giocatore |
|---|---|---|
| Posizione | `top:8px; right:8px` | `top:600px; right:8px` |
| Colore nome | `#cc6666` (rosso) | `#c9a84c` (oro) |
| Colore HP | verde → rosso (barra) | verde (barra) |
| Allineamento info | `align-items:flex-end` | `align-items:flex-end` |

**Hex avatar:** clip-path esagonale 44×44px, sfondo gradiente scuro, emoji personaggio al centro.

**Barra HP:** 85×6px, bordo sottile, fill colorato con glow.

**Mana:** sfere circolari 11×11px (viola pieno = disponibile, viola scuro = usato).

**Indicatore formato obiettivo** (sotto il mana, visibile a tutti):
- Badge ellittico, font Cinzel 5px uppercase
- **Formato Difficile:** `◆ 0/1` — diamante oro, mostra obiettivi completati su totale
- **Formato Facile:** `◆ 0/3` — diamante oro, mostra obiettivi completati su totale
- Il contenuto degli obiettivi rimane segreto: si mostra solo il progresso numerico
- Quando un obiettivo viene completato il contatore si aggiorna in tempo reale (es. `◆ 1/3`)

### 6.5 Pannelli Laterali — Mini-Carte (42×58px)

**Campo avversario (y:60):**
- **Sinistra** (`left:8px`) — Leader ♛, Satellite, Tragedia, Benedizione (specchio del giocatore)
- **Destra** (`right:8px`) — Mazzo (count), Cimitero (count)

**Campo giocatore:**
- **Sinistra** (`left:8px; top:530px`) — Leader ♛, Satellite, Tragedia, Benedizione, Obiettivo
- **Destra** (`right:8px; top:476px`) — Mazzo (count), Cimitero (count)

**Stili mini-carte (.mc):**
| Tipo | Border | Glow |
|---|---|---|
| Leader | `#c9a84c` oro | `rgba(201,168,76,0.2)` |
| Satellite | `#2a5a8a` blu | `rgba(42,90,138,0.25)` |
| Mazzo | `#2a2a4a` viola scuro | nessuno |
| Cimitero | `#4a1a1a` rosso scuro | nessuno |
| Obiettivo | dashed giallo | nessuno |
| Tragedia | `#6a1a3a` cremisi | `rgba(106,26,58,0.3)` |
| Benedizione | `#1a4a2a` verde scuro | `rgba(26,74,42,0.3)` |

La corona ♛ del Leader è un elemento assoluto sopra la carta (`top:-7px`).

**Mini-carta Leader — overlay informativi:**
La mini-carta del Leader mostra due badge sovrapposti visibili a entrambi i giocatori:
- **Badge morti** (bottom-left): numero di volte che il Leader è morto (es. `†2`), sfondo scuro semitrasparente, font Cinzel rosso — visibile a entrambi i giocatori
- **Badge costo rientro** (bottom-right): costo mana attuale per richiamarlo in campo (es. `⬡5`), sfondo viola scuro — visibile **solo al proprietario**; all'avversario appare come `⬡?`
- Se il Leader è in attesa gratuita (Opzione B), il badge costo mostra invece i turni rimanenti (es. `⏳2`) — visibile solo al proprietario

**Indicatore Vite Respawn:**
Posizionato nell'avatar di ogni giocatore, sotto la barra HP:
- 3 icone cuore (`♥ ♥ ♥`), ognuna 8×8px
- Cuore pieno `#c0392b` = vita disponibile; cuore vuoto/outline = vita consumata
- Visibile a tutti i giocatori (informazione pubblica)

### 6.6 Santuario
- **Posizione:** `left:8px; top:309px` — lato sinistro, altezza divisore
- **Dimensione:** 42×58px (uguale alle mini-carte dei pannelli)
- **Stile:** gradiente viola scuro, border `rgba(150,100,200,0.5)`, glow viola
- Label sopra: testo 5.5px, uppercase, colore viola tenue
- Slot vuoto: border dashed viola, sfondo quasi trasparente
- Al hover: `scale(1.07)` + glow intensificato

### 6.7 Zone Creature

**Avversario:** `top:215px` (sopra il divisore)
**Giocatore:** `top:368px` (sotto il divisore)

Entrambe: `left:0; right:0`, flex column, gap 8px tra label e riga.
- L'avversario ha la zona-label **in fondo** alla sua area
- Il giocatore ha la zona-label **in fondo** alla sua area

**Carta Unità sul campo (.cu): 54×76px**
- Border-radius 8px
- Gradiente e border-color dipendenti dalla fazione
- Sezione art superiore (flex:1) + stats inferiore (ATK rosso / DEF blu)
- Nome carta: 5.5px, troncato con ellipsis
- Dot fazione: cerchio 5×5px in basso a sinistra, colorato
- Badge keyword: top:-7px right:-2px, 5.5px, oro o variante
- Contatore uso: bottom-right, sfondo scuro semitrasparente
- Carta tappata: `rotate(13deg)`, opacity 0.72
- Carte avversario: `filter: hue-rotate(12deg) brightness(0.82)`
- Slot vuoto: 54×76px, border dashed viola tenue, `+` al centro

**Padding creature-row:** `0 56px` (spazio per non sovrapporre elementi laterali)

### 6.8 Bottone Fine Turno
- **Posizione:** `right:10px; top:50%` (centrato verticalmente, lato destro)
- Testo verticale (`writing-mode: vertical-rl`)
- Bordo oro, background gradiente scuro, font Cinzel 7px uppercase
- Al hover: glow oro intensificato

### 6.9 Mano Avversario
- **Posizione:** `top:60px`, centrata, `rotate(180deg)` (carte coperte, capovolte)
- Carte 26×38px, sfondo scuro, simbolo `✦` al centro
- 6 carte visibili con gap 3px

### 6.10 Mano Giocatore
- **Posizione:** `bottom:0`, height 215px, z-index:30 (sopra tutto)
- Sfondo: gradiente verticale da trasparente in alto a `#040308` in basso
- **Header:** "Mano — N carte" + dot indicator (pieni = cariche disponibili)
- **Fan di carte:** 5 carte 70×98px, sovrapposte (-10px margin), a ventaglio
  - Angoli: -16°, -8°, 0°, +8°, +16° con translateY proporzionale
  - Al hover: `translateY(-24px) scale(1.09) rotate(0deg)` + glow oro
  - Carta selezionata: `translateY(-30px) scale(1.11)` + glow oro intenso

**Struttura carta mano (.cm):**
- Art superiore 58px: emoji, costo mana (cerchio viola top-left), dot fazione (top-right)
- Stats: ATK rosso / DEF blu (solo per Unità)
- Tipo carta (per Magia/Istantanea): testo oro centrato
- Nome: 7px, troncato

---

## 7. ANIMAZIONI

| Elemento | Animazione | Durata |
|---|---|---|
| Stelle sfondo | `twinkle` opacity 0.15→0.65 | 2–5s alternate infinite |
| Carta hover (campo) | translateY(-8px) scale(1.06) | 0.15s ease |
| Carta hover (mano) | translateY(-24px) scale(1.09) | 0.2s ease |
| Mini-carta hover | scale(1.07) | 0.15s ease |
| Santuario hover | scale(1.07) + glow | 0.2s ease |
| Bottone Fine Turno hover | glow oro | 0.2s ease |

---

## 8. Z-INDEX LAYERS

| Layer | z-index | Contenuto |
|---|---|---|
| Sfondo | 0 | .bg |
| Stelle | 1 | .stelle |
| Nebbia | 2 | .nebbia |
| Divisore glow | 9 | .divisore-glow |
| Divisore | 10 | .divisore |
| Zone creature + Santuario | 15 | .creature-area, .santuario-area, .mano-av |
| Pannelli laterali | 18 | .pan-* |
| Avatar + Turno | 20 | .avatar, .turno-wrap |
| Bottone Fine Turno | 25 | .btn-fine |
| Mano giocatore | 30 | .mano-wrap |
| Carta selezionata/hover | 80–100 | .cu:hover, .cm:hover |

---

## 9. NOTE IMPLEMENTAZIONE REACT NATIVE

- Usare `react-native-reanimated` per le animazioni (hover → onPress/onLongPress su mobile)
- Le posizioni assolute in px del mockup HTML vanno scalate con `Dimensions.get('window')` rispetto a 390px di larghezza base
- Il "fan" della mano si può implementare con `transform: [{ rotate }, { translateY }]` per ogni carta
- Il clip-path esagonale dell'avatar va fatto con `react-native-svg` o una maschera SVG
- Le stelle animate si possono generare con un array di `Animated.Value` in loop
- `writing-mode: vertical-rl` non esiste in RN: usare `transform: [{ rotate: '90deg' }]` per il bottone Fine Turno
- I glow/box-shadow si emulano con `elevation` (Android) e `shadowColor/shadowRadius` (iOS), oppure con SVG blur filter
- **Indicatore vite (♥♥♥):** 3 componenti `View` circolari con fill condizionale; aggiornati dallo stato `playerLives` (0–3)
- **Badge formato obiettivo (◆ 0/N):** testo statico con N = 1 o 3 in base al formato scelto; il contatore completati viene aggiornato dallo stato `objectivesCompleted`
- **Badge Leader (†N e ⬡X):** sovrapposti sulla mini-carta con `position: absolute`; il costo ⬡X è visibile solo al proprietario (condizionale su `isOwner`); se in attesa Opzione B mostrare `⏳N` al posto di ⬡X
- **Benedizione:** mini-carta con border verde scuro `#1a4a2a`, stessa struttura delle altre mini-carte del pannello laterale

---

## 10. FILE DI RIFERIMENTO

- **Mockup HTML interattivo:** `UI/campo_battaglia_mockup.html` — apri nel browser per vedere il risultato visivo esatto
- **Regole di gioco:** `regole/REGOLE_BASE_TCG.md`
- **Fazioni:** `regole/FAZIONI.md`
- **Keyword:** `regole/KEYWORD.md`
