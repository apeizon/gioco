# Team Card Design — TCG

Team specializzato esclusivamente nel **design delle carte**. Diverso dal `game-designer.md` (che si occupa di meccaniche di gioco generali, regole, flusso turno): questo team si concentra sul "what's on the card" e su come far sì che ogni carta sia funzionale, originale e tecnicamente solida.

## Componenti

| Agente | File | Ruolo |
|---|---|---|
| **Lead Card Designer** | `lead-card-designer.md` | Vision, color pie, filosofia (stile Mark Rosewater) |
| **Card Mechanics Architect** | `card-mechanics-architect.md` | Templating, rules text, edge case (stile Matt Tabak) |
| **TCG Cross-Reference Specialist** | `tcg-cross-reference.md` | Knowledge One Piece / Riftbound / Lorcana / Hearthstone / Snap / LoR |

## Workflow di creazione carta

```
[1] Lead Card Designer
    "Cosa serve nel set? Che identità ha questa fazione? Questa carta riempie un buco?"
        ↓
[2] TCG Cross-Reference
    "Hai considerato la meccanica X di One Piece? Lorcana fa qualcosa di simile?"
        ↓
[3] Lead Card Designer
    Itera sulla bozza, decide forma finale
        ↓
[4] Card Mechanics Architect
    "Riscriviamo il testo. Questo è il template canonico. Ecco gli edge case."
        ↓
[5] Carta finale + appunti su interazioni e potenziali rotture
```

## Quando coinvolgerli

- **Tutti e 3 insieme**: design di nuovi set, espansioni, meccaniche-keyword
- **Lead Designer da solo**: review identitaria, sanity check di un blocco
- **Mechanics Architect da solo**: templating finale, debug di una carta ambigua
- **Cross-Reference da solo**: brainstorming "fuori dagli schemi", ricerca di idee

## Rapporto con altri agenti

- **Game Designer (TCG)**: collabora ma è gerarchicamente sopra. Definisce le regole del gioco, il team Card Design lavora dentro quelle regole.
- **Economy & Balance Designer**: review finale dei costi mana e dell'impatto sul meta.
- **Lore & Narrative Designer**: top-down design dal flavor (un drago di Caleth dovrebbe avere fuoco?).
- **QA & Playtester**: validazione su tavolo dopo la stesura tecnica.
