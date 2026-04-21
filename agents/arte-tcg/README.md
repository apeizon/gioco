# Team Arte TCG

Squadra specializzata nella produzione artistica delle carte. Ogni agente ha un ruolo preciso e comunica con gli altri tramite brief e handoff strutturati.

## Gerarchia

```
Art Director
├── Character Designer ──→ Artisti (scheda personaggio)
├── Environment Designer ──→ Artisti (concept ambiente)
├── Color Director ──→ Tutti (palette ufficiali per fazione)
└── Artisti
    ├── Fantasy Classico (stile MTG digitale — Villeneuve, Jason Chan, Jesper Ejsing)
    ├── Fantasy Orientale (influenze giapponesi — Amano, Justyna Gil)
    ├── Dark Gothic (stile Elden Ring — Swanland, Raluca Marinescu)
    ├── Pittore Classico (olio su tela, pennellate reali — Zara Alonso, Greg Rutkowski)
    ├── Incisione Medievale (xilografia b/n — Dürer, Doré, Alfred Rethel)
    ├── Fumetto 80s (Marvel Bronze Age — Byrne, Sienkiewicz, Buscema)
    ├── Horror 80s (VHS cover vintage — Drew Struzan, Graham Humphreys, Boris Vallejo)
    └── Chibi (varianti collezionabili)
         └──→ Prompter AI (riceve concept → produce prompt per MJ/NBP/Higgsfield)
```

## Flusso di lavoro standard

1. **Art Director** riceve scheda carta → redige brief visivo
2. **Character Designer** produce scheda personaggio (se carta nominata)
3. **Environment Designer** produce concept ambiente
4. **Color Director** fornisce palette fazione
5. **Artista** scelto dall'Art Director produce concept illustrativo
6. **Prompter AI** traduce il concept in prompt ottimizzato
7. Output AI torna all'**Art Director** per approvazione finale

## Agenti

| File | Ruolo |
|---|---|
| `art-director.md` | Coordinamento e approvazione finale |
| `artist-fantasy-classico.md` | Stile Magic: The Gathering digitale |
| `artist-fantasy-orientale.md` | Stile Final Fantasy TCG / anime fantasy |
| `artist-dark-gothic.md` | Stile Elden Ring / dark fantasy |
| `artist-pittore-classico.md` | Olio su tela, pennellate reali — Zara Alonso, Greg Rutkowski |
| `artist-incisione-medievale.md` | Xilografia b/n, crosshatching, stile Dürer/Doré |
| `artist-fumetto-80s.md` | Fumetto Marvel anni '80, inchiostro, Ben-Day dots |
| `artist-horror-80s.md` | Cover VHS horror anni '80, neon, airbrush vintage |
| `artist-chibi.md` | Varianti chibi collezionabili |
| `character-designer.md` | Design personaggi (schede di riferimento) |
| `environment-designer.md` | Sfondi e location per fazione |
| `color-director.md` | Palette ufficiali e coerenza cromatica |
| `prompter-ai.md` | Prompt engineering per MJ, Nano Banana Pro, Higgsfield |
