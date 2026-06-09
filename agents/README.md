# Team Agenti — Progetto TCG Mobile

Ogni file in questa cartella definisce un agente specializzato che collabora al progetto.
In ogni conversazione puoi invocare uno o più agenti per lavorare nella loro area di competenza.

## Il Team

| Agente | File | Area |
|--------|------|------|
| Game Designer (TCG) | `game-designer.md` | Meccaniche, regole, GDD, bilanciamento |
| **Team Card Design** | `card-design/` | Design specifico delle carte: filosofia, templating, originalità (3 sub-agenti) |
| Mobile Developer | `mobile-developer.md` | App iOS/Android, game engine client |
| Backend Developer | `backend-developer.md` | Server, matchmaking, real-time, DB |
| UI/UX Designer | `ui-ux-designer.md` | Esperienza utente, interfaccia, flussi |
| Card Artist | `card-artist.md` | Arte delle carte, stile visivo, asset |
| Economy & Balance | `economy-balance-designer.md` | Economia, monetizzazione, drop rate |
| Lore & Narrative | `lore-narrative-designer.md` | Mondo, fazioni, personaggi, flavor text |
| QA & Playtester | `qa-playtester.md` | Testing, bug, playtest, bilanciamento |
| Token Optimizer | `token-optimizer.md` | Efficienza token, context window, tool call |

## Come usare gli agenti

Quando lavori su un argomento specifico, indica quale agente stai coinvolgendo.
Esempio: *"Parliamo con il Game Designer delle meccaniche dei turni"*

Gli agenti possono collaborare — ad esempio il Game Designer e l'Economy Designer
lavorano insieme sul sistema di rarità, mentre il Mobile Dev e il QA collaborano sui test.

## Prossimi passi
1. Definire le meccaniche core con il **Game Designer**
2. Costruire il **GDD** (Game Design Document)
3. Scegliere lo **stack tecnologico** con il Mobile + Backend Dev
4. Definire l'**art direction** con Card Artist + UI/UX
