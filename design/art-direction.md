# Art Direction — TCG Dark Fantasy

> Documento master mantenuto dall'Art Director. Ogni decisione stilistica approvata va registrata qui. Nessuna illustrazione va in produzione senza rispettare queste linee guida.

---

## Stile visivo approvato

**Data approvazione:** 2026-04-14
**Carta di riferimento:** Mordeth, il Falcemortis (Est — Eterno)
**Artista assegnato:** Artist Dark Gothic
**Piattaforma:** Midjourney

### Descrizione stile
Lo stile approvato è **dark fantasy cosmico**, con forte influenza FromSoftware (Elden Ring, Dark Souls). Le illustrazioni trasmettono grandiosità opprimente, bellezza corrotta e potere assoluto. Palette scure e desaturate con accenti cromatici isolati e intensi. Lighting da fonte singola, drammatico.

### Caratteristiche visive confermate
- **Angolazione:** Variata — low angle per soggetti enormi, three-quarter per azione dinamica, wide shot per contesto ambientale. MAI primo piano fisso come unica soluzione.
- **Lighting:** Fonte singola isolata (la magia o l'arma stessa come fonte di luce), ombre profonde
- **Palette:** Dipende dalla fazione — vedere sezione regole per fazione
- **Dettaglio:** Hand-painted, pennellate visibili, 2D illustrazione tradizionale — MAI look 3D/CGI
- **Mood:** Il personaggio deve trasmettere la propria identità attraverso l'azione, non solo la postura statica
- **Composizione:** Il personaggio è integrato nell'ambiente — non isolato su sfondo generico

### Regole di posa e composizione — OBBLIGATORIE

- **Azione coerente col personaggio:** ogni carta deve mostrare il soggetto mentre fa qualcosa di specifico alla sua identità (un guerriero che attacca, un druido che evoca, un lich che dissemina morte). Nessuna posa statica frontale da catalogo.
- **Ambiente integrato:** lo sfondo non è decorazione — il personaggio interagisce con esso. Radici che si spezzano sotto i piedi, fuoco che si propaga, spiriti che emergono, neve che si solleva.
- **Formato vario:** non sempre portrait stretto. Usare wide shot (3/4 del corpo visibile con ambiente), action shot (corpo in movimento nel frame), establishing shot (personaggio piccolo in ambiente colossale) a seconda del soggetto.
- **Armature e equipaggiamento:** devono sembrare indossati e vissuti, non modellati in CAD. Ammaccature, segni d'uso, materiali che reagiscono alla luce in modo organico.
- Queste regole si applicano a **qualsiasi tipo di carta** — creature, leader, magie, avamposti. Le carte usate come esempi servono solo a diversificare i soggetti per dare al team più riferimenti.

### Parametri Midjourney per stile (approvati)

**Dark Gothic** (Est, Nord, carte Eterne):
```
--style raw --q 2 --stylize 180
```
- `--style raw`: riduce l'interpretazione di MJ, risultato più fedele e grounded
- `--stylize 180`: punto dolce per dark fantasy — meno "artistico-fantasioso" del default
- **Versione:** default (non forzare `--v 7`)

**Fantasy Orientale** (Ovest, Centro, spiriti, creature eleganti):
```
--q 2 --stylize 200
```
- Niente `--style raw` — la "mano" di MJ aggiunge eleganza coerente con lo stile
- `--stylize 200`: leggermente più artistico, si adatta all'estetica giapponese
- Radici a forma di torii, pattern botanici giapponesi: elementi da includere nei prompt Ovest

---

## Regole per fazione

### Est — Morte e Necromanzia
- Palette: Viola necrotico `#6c3483`, Nero `#0d0d0d`, Verde cadaverico `#a9cce3`
- Accenti: Viola luminoso `#9b59b6`, Oro corrotto `#8b7536`
- Ambienti: Necropoli, cattedrali di osso, lune rosse, nebbia viola
- Lighting: Unica fonte viola/verde pallido, tutto il resto in ombra

### Nord — Freddo Glaciale
- Palette: Blu ghiaccio `#a8d4e6`, Bianco neve `#e8f4f8`, Grigio tempesta `#6e8fa0`
- Accenti: Oro polare `#c9a84c` (solo Rare/Eterne)
- Ambienti: Tundre, fortezze di ghiaccio, tempeste, aurore boreali
- Lighting: Luce fredda diffusa, nessuna fonte calda

### Sud — Fuoco e Cenere
- Palette: Rosso fiamma `#c0392b`, Arancio brace `#e67e22`, Nero cenere `#1a1a1a`
- Accenti: Bianco abbagliante nei picchi di luce
- Ambienti: Vulcani, forge, deserti di cenere, città su lava
- Lighting: Luce calda da basso (lava/fuoco), contrasto forte

### Ovest — Natura Ancestrale
- Palette: Verde foresta `#1e5631`, Verde muschio `#4a7c59`, Marrone terra `#6d4c41`
- Accenti: Verde brillante `#76c442` per magia, Bianco fiore `#f5f5dc`
- Ambienti: Foreste antiche, radici colossali, laghi specchio, alba perpetua
- Lighting: Luce filtrata tra foglie, atmosfera diffusa e morbida

### Centro — Nexus Cosmico
- Palette: Oro divino `#c9a84c`, Bianco luce `#fffff0`, Viola cosmico `#4a235a`
- Accenti: Argento `#e8e8e8`, Blu etere `#1a237e`
- Ambienti: Vuoto cosmico, pilastri di luce, architettura impossibile
- Lighting: Luce dall'interno del soggetto, aura dorata

---

## Divieti stilistici — REGOLA ASSOLUTA

**Vietato in ogni illustrazione, senza eccezioni:**
- Look 3D / CGI / render Blender / Octane / Unreal Engine
- Superfici plastiche, smooth shading artificiale, luci da render software
- Qualsiasi estetica che sembri modellazione tridimensionale computerizzata

**Obbligatorio:**
- Aspetto artigianale, fatto a mano, pittura digitale 2D
- Pennellate visibili o linework definito — l'immagine deve sembrare dipinta o disegnata
- Stile Procreate / illustrazione digitale tradizionale / acquerello digitale / oil painting 2D

**In ogni prompt includere sempre:**
```
Magic The Gathering official card illustration style, Raymond Swanland, Magali Villeneuve, 
detailed fantasy oil painting, cinematic digital painting, rich colors, painterly realism,
correct anatomy, well-proportioned figure, detailed face with sharp defined features
--no 3d render, cgi, blender, octane, unreal engine, smooth shading, plastic surfaces,
cartoon, anime, flat colors, cel shading, photorealistic, hyperrealistic,
deformed face, ugly face, distorted features, deformed arms, deformed hands, bad anatomy, 
extra fingers, missing fingers, uncanny
```

**Artisti di riferimento approvati per fazione/stile:**
- **Dark Gothic (Est, Nord Eterni):** Raymond Swanland, Raluca Marinescu — atmosfera opprimente, luce viola/fredda, ambienti corrotti
- **Fantasy Classico (Sud, Centro, wide shot):** Magali Villeneuve, Zara Afonsa, Kimonas — pittura digitale calda, personaggi in azione nel contesto, pennellate visibili
- **Fantasy Epico (creature enormi, scale):** Raymond Swanland, Chris Rahn — soggetti imponenti con ambiente dominante
- **Fantasy Orientale (Ovest, spiriti):** Yoshitaka Amano, Justyna Gil — stile elegante e decorativo, luci magiche soffuse
- **NON usare mai:** Todd Lockwood (troppo fotorealistico), Larry Elmore (troppo retrò)

**Caratteristiche pittoriche OBBLIGATORIE in ogni prompt:**
- `hand-painted 2D digital illustration, visible expressive brushstrokes, oil painting texture`
- Fonte di luce singola drammatica — la magia, il fuoco, una candela, la luna — MAI luce da studio
- Personaggio integrato nell'ambiente fisicamente (interazione, non sfondo decorativo)
- `--no smooth shading, plastic, octane, unreal engine` sempre nel --no

### Regole sui volti — OBBLIGATORIE
- I volti devono essere **stilizzati ma credibili** — fantasy illustrato, non fotorealistico
- Espressione coerente col personaggio: un guerriero ha determinazione, un lich ha vuoto assoluto, un angelo ha autorità
- Se il personaggio indossa un elmo o visiera: mostrare solo gli occhi — evitare di generare volti parzialmente visibili che rischiano di risultare deformati
- Nei prompt specificare sempre: `stylized expressive face, well-defined facial features, fantasy illustration style face`
- Mai chiedere fotorealismo — lo stile è quello di un artista digitale che lavora in Procreate o Photoshop, ispirato agli artisti di MTG

---

## Workflow generazione — UNA CARTA ALLA VOLTA

Per ogni carta da illustrare:
1. Leggere il file della carta (meccaniche, rarità, fazione, lore se presente)
2. Art Director coordina un brief con i 3 artisti — ognuno propone una visione diversa (mood, inquadratura, ambiente, angolazione)
3. Inviare **3 run separate** su Midjourney — una per artista, una alla volta
4. Attendere che l'utente selezioni le varianti di suo gradimento
5. Per ogni variante approvata: Upscale (S) → Download → save

**Diversità obbligatoria tra le 3 run:**
- Posa e azione diverse (aggressiva / epica / contemplativa)
- Angolazione diversa (low angle / wide shot / three-quarter)
- Ambiente diverso o letto da prospettiva diversa
- Mood coerente con l'identità della carta (creature aggressive = azione violenta, creature protettive = maestà, leader = autorità)

---

## Workflow artwork — OBBLIGATORIO

Quando l'utente conferma un'immagine ("questa mi piace", "molto bella", ecc.):

1. **Upscale (Subtle)** — aprire l'immagine singola in Midjourney e cliccare "Upscale → Subtle"
2. **Aspettare** che l'upscale sia completato (label "Upscale (S)" visibile)
3. **Download** — cliccare "Download Image" dall'interfaccia Midjourney
4. **Salvataggio** — spostare il file nella cartella della carta specifica con nome `[NOME_CARTA]_artwork_[numero].png`

**Varianti multiple per carta:** Se l'utente approva più di un artwork per la stessa carta, fare Upscale (S) su ognuno e salvare tutti con numerazione progressiva (`_artwork_01.png`, `_artwork_02.png`, ...). Ogni carta può avere N varianti di artwork — come le alternate art di MTG.

**Struttura cartelle artwork:**
Ogni carta ha una propria cartella nominata come la carta stessa, contenente il file `.md` e tutti gli artwork:
- Leader: `leader/[fazione]/[NOME]/[NOME].md` + `[NOME].artwork_01.png`, `_02.png`...
- Creature: `carte/creature/[tipo]/[fazione]/[NOME]/[NOME].md` + `[NOME].artwork_01.png`...
- Avamposti: `carte/avamposti/[tipo]/[NOME]/[NOME].md` + `[NOME].artwork_01.png`...

Creare la cartella e spostarci dentro `.md` + artwork subito dopo il download degli artwork approvati.

---

## Libertà creativa del team

Le approvazioni dello stile sono **feedback positivi, non vincoli**. Il team arte deve esplorare liberamente stili, composizioni, interpretazioni e varianti. L'utente indica ciò che gli piace tra le generate — non sta definendo l'unico stile accettabile. Ogni artista deve portare la propria visione: la coerenza è cromatica e di mood, non stilistica nel senso stretto.

---

## Carta di riferimento approvata

**Mordeth, il Falcemortis** — questo è il benchmark visivo del gioco.
Qualsiasi nuova illustrazione di carta Eterno deve puntare a questo livello qualitativo.
Prompt archivato in: `design/prompts/prompt-library.md`
