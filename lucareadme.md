# Gioco — TCG Mobile

Progetto di un Trading Card Game mobile ispirato a Marvel Snap, Magic: The Gathering, Pokémon e One Piece TCG. App in React Native, ambientazione fantasy con 5 fazioni (Nord, Sud, Est, Ovest, Centro) + carte incolori (Nomadi).

---

## Stato attuale del progetto

| Fase | Stato | Carte |
|---|---|---|
| Leader mono | Completa | 5 |
| Creature mono | Completa | 41 |
| Avamposti | Completa | tutte le tipologie |
| Magie mono | Completa | 35 (7 × 5 fazioni) |
| Artefatti / Equipaggiamenti | Completa | 45 (20 Nomadi + 5 × 5 fazioni) |
| Santuari mono | Completa | 28 (8 Nomadi + 4 × 5 fazioni) |
| Satelliti mono | Completa | 28 (8 Nomadi + 4 × 5 fazioni) |
| Tragedie + Benedizioni mono | In corso | 12 / ~36 |

Per il punto preciso a cui ci si è fermati, leggere `tasks/todo.md` e gli ultimi commit.

---

## Struttura del repository

```
Gioco/
├── regole/                  Regole base, fazioni, keyword, economia, obiettivi
├── lore/                    Worldbuilding e narrativa
├── leader/                  41 leader (mono + multi-fazione)
├── carte/
│   ├── avamposti/           Terre / fonti di mana
│   ├── creature/            Creature divise per fazione
│   ├── magie/               Magie Sorcery / Istante
│   ├── artefatti/           Artefatti classici, creature, equipaggiamenti
│   ├── santuari/            Carte permanenti globali
│   ├── satelliti/           Carte permanenti personali
│   ├── tragedie/            Carte malus + bonus con meccanica Eco
│   └── benedizioni/         Carte solo bonus
├── agents/                  Specifiche degli agenti AI (game design, card design, ecc.)
├── app/                     Codice React Native (in sviluppo)
├── UI/                      Mockup e specifiche UI
├── design/                  Asset di design
├── economia/                Specifiche economia in-game
├── tasks/                   Roadmap e todo list
├── CLAUDE.md                Istruzioni per Claude Code
└── STATO_PROGETTO.md        Snapshot generale del progetto
```

---

## Setup per collaboratori

### 1. Strumenti necessari

- **Account GitHub** con accesso al repository (chiedere all'admin l'invito come collaboratore)
- **Git** installato:
  ```bash
  # macOS
  brew install git
  # Windows
  # scarica da https://git-scm.com/
  ```
- Editor di testo a piacere (VSCode, Cursor, Sublime, ecc.)

### 2. Autenticazione GitHub

Una delle due opzioni:

**Opzione A — HTTPS + Personal Access Token (più semplice)**
1. Vai su https://github.com/settings/tokens
2. Genera un nuovo token con scope `repo`
3. Quando git ti chiede la password, usa il token

**Opzione B — SSH (più comoda a lungo termine)**
1. Genera una chiave SSH: `ssh-keygen -t ed25519 -C "tua-email@example.com"`
2. Copia la chiave pubblica: `cat ~/.ssh/id_ed25519.pub`
3. Aggiungila su https://github.com/settings/keys

### 3. Clonare il progetto

```bash
# Via HTTPS
git clone https://github.com/apeizon/gioco.git

# Via SSH
git clone git@github.com:apeizon/gioco.git

cd gioco
```

---

## Workflow di collaborazione

Per evitare conflitti quando si lavora in parallelo:

### Prima di iniziare a lavorare

```bash
git pull origin main
```

### Durante il lavoro

Crea sempre un **branch dedicato** — non lavorare direttamente su `main`:

```bash
git checkout -b feature/nome-descrittivo
# es: feature/tragedie-sud, fix/keyword-incendio, docs/aggiorna-regole
```

### A fine sessione

```bash
git add <file specifici>
git commit -m "Descrizione chiara del cambiamento"
git push -u origin feature/nome-descrittivo
```

### Aprire una Pull Request

1. Vai su https://github.com/apeizon/gioco
2. Clicca "Compare & pull request" sul branch appena pushato
3. Descrivi cosa hai cambiato e perché
4. Aspetta review e merge

---

## Regole di design (lettura obbligatoria)

Prima di toccare le carte, leggi:

- `regole/REGOLE_BASE_TCG.md` — fasi di gioco, mazzo, vittoria
- `regole/KEYWORD.md` — tutte le keyword del gioco
- `regole/FAZIONI.md` — identità di ogni fazione
- `regole/ECONOMIA.md` — sistema rarità e drop rate
- `regole/OBIETTIVI.md` — sistema obiettivi segreti

---

## Formato standard di una carta

Ogni carta è un file Markdown con una tabella `Campo | Valore`:

```markdown
# Nome Carta

| Campo | Valore |
|---|---|
| **Tipo** | Creatura — Tipo1 · Tipo2 |
| **Fazione** | Nord |
| **Rarità** | Comune |
| **Costo** | 2 Nord + 1 |
| **ATK / DEF** | 2 / 2 |
| **Keyword** | Nome keyword (descrizione inline tra parentesi) |
| **Effetto** | Testo dell'effetto. |
```

**Regole stilistiche:**
- Mai abbreviazioni (es. scrivere "avversario", non "avv.")
- Stile didascalico Magic-style: frasi complete, reminder text inline, riferimenti in 3° persona
- Sempre la spiegazione della keyword tra parentesi, anche se è universale
- Per i tipi creatura: massimo 2 sottotipi separati da `·`

---

## Sistema rarità

| Simbolo | Nome | Bordo | Drop |
|---|---|---|---|
| ★ | Comune | Grigio argento | 58% |
| ★★ | Non Comune | Verde smeraldo | 27% |
| ★★★ | Rara | Viola cosmico | 12% |
| ★★★★ | Eterno | Oro con glow | 3% |

**Importante:** la rarità NON corrisponde al costo. Un Eterno può costare 3, una Comune può costare 5.

---

## Contatti / domande

Per qualsiasi dubbio sulle regole o sul design, scrivere all'admin del repo.

Buon lavoro!
