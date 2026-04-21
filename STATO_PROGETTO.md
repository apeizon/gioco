# Stato Progetto TCG — Riepilogo sessioni
> Aggiornato al 2026-04-08

---

## Documenti completati

| File | Contenuto |
|------|-----------|
| `regole/REGOLE_BASE_TCG.md` | Regole complete: mazzo, mana, turni, tipi carte, combattimento, respawn, vittoria |
| `regole/FAZIONI.md` | 5 fazioni (Nord/Sud/Est/Ovest/Centro), identità, sinergie, restrizioni da Leader |
| `regole/KEYWORD.md` | 24 keyword (12 universali + 3 esclusive per fazione) |
| `regole/ECONOMIA.md` | Modello F2P, rarità, valute, pack, pity system, crafting, missioni, Battle Pass, shop |
| `regole/TIPI_CARTE_PERMANENTI.md` | Regole dettagliate di Santuario, Satellite, Tragedia, Benedizione — logica, zone UI, comportamento al respawn |
| `UI/UI_CAMPO_BATTAGLIA.md` | Layout UI campo di battaglia per React Native |
| `UI/campo_battaglia_mockup.html` | Mockup HTML interattivo — apri nel browser per vedere |
| `agents/` | Definizioni dei 8 agenti del team (game designer, dev, artista, ecc.) |

---

## Decisioni di design chiave

### Regole
- **Vittoria:** completare il proprio set di obiettivi segreti (1 difficile o 3 facili)
- **Eliminazione:** azzerare gli HP non fa vincere — sistema a 3 vite con respawn (metà HP precedenti)
- **Respawn:** creature muoiono, permanenti non-creatura restano, Leader torna in Zona di Comando, obiettivi si conservano
- **Vittoria per HP:** uccidere un avversario per la 3ª volta = vittoria alternativa
- **Leader:** determina l'identità fazione del mazzo (come Color Identity in Commander MTG)
- **Leader dopo morte:** scelta tra pagare costo+incremento OPPURE aspettare X turni gratis
- **Mazzo Obiettivi:** 35 carte componibili dal giocatore, assegnate dall'avversario, contenuto segreto
- **Carte multifazione:** richiedono mana di entrambi i tipi (es. 1 Nord + 1 Est)
- **Stack:** sistema Magic LIFO, priorità in senso orario
- **Contatore utilizzi:** tutte le carte possono avere utilizzi limitati con badge visivo

### Fazioni
- 5 fazioni: Nord (controllo), Sud (aggressione), Est (manipolazione), Ovest (sacrificio), Centro (adattamento)
- Carte Centro giocabili in qualsiasi mazzo
- Nessun bonus per mazzi mono-fazione

### Keyword (24 totali)
- 12 universali: Velocità, Volo, Portata, Travolta, Carica, Drenaggio, Vedetta, Scudo, Protezione, Resilienza, Inafferrabile, Esplosione
- Nord: Gelo, Baluardo, Resistenza
- Sud: Frenesia, Incendio, Surriscaldamento
- Est: Prescienza, Eco, Arcano
- Ovest: Maledizione, Revoca, Lamento
- Centro: Riflesso, Nexus, Assorbimento

### Economia
- **Rarità:** Comune (58%), Non Comune (27%), Rara (12%), Eterno (3%)
- **"Eterno"** è il termine scelto al posto di "Leggendario"
- **3 valute:** Frammenti (base), Essenza (mid), Stelle Eterne (premium)
- Carte ottenibili gratis tramite missioni, sfide, traguardi permanenti
- Battle Pass con traccia gratuita + premium
- Pricing in euro rimandato

---

## Da definire (prossime sessioni)

1. **Lore e nomi** — nomi propri del mondo e delle fazioni
2. **Esempi di Leader** — evoluzione, abilità passive, Hero Power concreti
3. **Carte Obiettivo** — solo condizioni o anche ricompense al completamento?
4. **UI** — da revisionare (imperfezioni note)
5. **Pricing valuta reale** — rimandato
6. **Setup Expo** — Node.js non installato, rimandato

---

## Stack tecnologico previsto
- **App:** React Native + Expo
- **Animazioni:** react-native-reanimated, Lottie
- **Backend:** da definire (Supabase o Node.js custom)
- **Font:** Cinzel + Crimson Text
