# Design — Fondamenta + Menu (app client)

> Sotto-progetto del lato "app/client" del TCG. Owner: Luca (grafica, menu, opzioni, tutto il non-carte).
> Data: 2026-06-10. Stato: approvato in brainstorming, pronto per piano d'implementazione.

## Obiettivo

Costruire le fondamenta visive e di navigazione dell'app + i primi due schermi reali
(**Home** e **Opzioni**), sostituendo l'attuale `app/App.js` (mockup statico del campo
battaglia, dati hardcoded, stili inline). Questo slice è la base su cui si agganciano tutti i
sotto-progetti successivi (Collezione, Shop, Battaglia, ecc.).

Approccio scelto: **design-first** — prima mockup interattivi nel browser per validare il look,
poi implementazione fedele in React Native.

## Fuori scope (YAGNI per questo slice)

Logica di gioco, motore turni/mana/combattimento, carte reali in collezione, shop funzionante,
login/backend, multiplayer, audio reale (solo i controlli volume sono presenti, non suonano ancora).
Le voci di menu non costruite portano a schermi segnaposto "In arrivo" col tema corretto.

## Sezione A — Architettura

Stack: Expo (presente) + `expo-router` (navigazione file-based) + `expo-font` + `react-native-reanimated`.

Struttura nuova dentro `app/`:

```
app/
├── app/                    expo-router (ogni file = schermo)
│   ├── _layout.js          Root: carica font, tema, Stack navigator
│   ├── index.js            HOME (menu principale)
│   ├── opzioni.js          OPZIONI
│   └── (placeholder)/      schermi "in arrivo": gioca, collezione, negozio
├── src/
│   ├── theme/              design tokens (colors, fonts, spacing, glow)
│   ├── components/         riusabili: Button, Panel, Modal, Slider, Toggle, ScreenBg, LanguagePicker
│   └── i18n/               testi IT/EN
└── assets/fonts/           Cinzel + Crimson Text (.ttf)
```

Principio: ogni schermo monta solo componenti del design system. Niente stili hardcoded sparsi.
L'attuale `App.js` (campo battaglia inline) viene archiviato/sostituito — il campo battaglia
giocabile sarà un sotto-progetto separato che riuserà questi token.

## Sezione B — Sistema visivo (design tokens)

Base confermata (riuso dell'identità esistente, raffinata nei mockup):

- **Colori** (`src/theme/colors.js`): oro `#c9a84c`, sfondo gradiente `#050508 → #0c0618`,
  viola cosmico `rgba(100,60,180,…)`, HP verde `#27ae60` / rosso `#c0392b`, mana `#7a4acc`.
  Colori fazione: Nord `#5588cc`, Sud `#cc4422`, Est `#44aa66`, Ovest `#8844aa`, Centro `#aaaaaa`.
- **Font**: Cinzel (titoli/UI, maiuscolo) + Crimson Text (lore/descrizioni).
- **Scale**: spacing, border-radius, ombre/glow dorati riusabili.
- **Componenti base** (look dark-fantasy: bordo oro, glow, gradiente):
  `Button` (primario + secondario), `Panel`, `Modal`, `Toggle`, `Slider`, `LanguagePicker`, `ScreenBg`.

## Sezione C — Home (menu principale)

Layout portrait 390×844. Titolo "GIOCO" (Cinzel oro, glow) + sottotitolo.
Gerarchia: **Gioca** = bottone primario grande dominante. Sotto, griglia 2 colonne
**Collezione & Mazzi** / **Negozio & Battle Pass**. Poi bottone largo **Impostazioni & Profilo**.
Footer: barra valute (💠 Frammenti, 🔮 Essenza, ✦ Stelle Eterne — placeholder) + versione app.

Voci non ancora costruite → schermo segnaposto "In arrivo" a tema (no crash).
Footer valute predisposto per l'aggancio futuro all'economia.

## Sezione D — Opzioni

Header con back + titolo. Sezioni in `Panel`:

- **Audio**: slider Musica, slider Effetti (+ mute).
- **Grafica**: toggle Animazioni carte, toggle Riduci movimento, selettore Qualità effetti.
- **Lingua**: picker IT/EN (applicato live via i18n).
- **Account**: bottone Accedi/Logout (segnaposto, backend dopo), toggle Notifiche.
- **Legale**: link Privacy · Termini · Crediti, versione app.

Persistenza: impostazioni salvate in `AsyncStorage`, ricaricate all'avvio. Audio/lingua applicati live.

## Sezione E — Font, animazioni, asset

- Font caricati via `expo-font` nel root layout (splash finché pronti). `.ttf` in `assets/fonts/`.
- Animazioni sobrie (`reanimated`): glow pulsante titolo Home; press bottoni = scale-down + bagliore;
  entrata schermi = fade + slide leggero. Tutte disattivabili da "Riduci movimento".
- Asset: sfondo gradiente in codice (no immagini pesanti). Icone vettoriali `@expo/vector-icons`.
  Logo testuale ora; logo grafico vero in slice futuro.

## Sezione F — Verifica / test

1. Mockup browser (companion): Home + Opzioni interattivi → raffinare il look.
2. App vera: `expo start` → Expo Go su telefono (QR) o simulatore iOS su Mac.
3. Check funzionale: navigazione Home↔Opzioni, slider/toggle, cambio lingua, persistenza dopo riavvio.

## Note di integrazione

- Repo condiviso col socio (che lavora alle carte in `carte/`). Questo slice tocca solo `app/`,
  `docs/`, `assets/` → nessun conflitto con il suo lavoro.
- Workflow: branch `feature/fondamenta-menu`, PR a fine, mai push diretto su `main`.
