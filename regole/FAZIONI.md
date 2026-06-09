# TCG – Fazioni
> Documento di specifica per lo sviluppo dell'app mobile

---

## SISTEMA FAZIONI

Il gioco è diviso in **5 fazioni** (Nord, Sud, Est, Ovest, Centro), ognuna con una propria identità filosofica, uno stile di gioco distinto e un'estetica riconoscibile. Le fazioni sono rappresentate dai **punti cardinali + il Centro**. Esiste inoltre una categoria parallela: le **carte Nomadi**, apolidi e senza fazione, equivalente concettuale dell'incolore di Magic.

### Costruzione del mazzo — Identità Fazione
- La **fazione del Leader** determina l'**identità fazione** del mazzo: il mazzo può contenere **solo carte appartenenti alle fazioni del Leader**
  - Leader mono-fazione (es. Est) → solo carte Est + carte Centro + carte Nomadi
  - Leader bi-fazione (es. Est + Ovest) → solo carte Est, Ovest + carte Centro + carte Nomadi
  - Non esistono Leader tri-fazione o superiori (da confermare in fase di design carte)
- Le carte **Centro** possono essere inserite in **qualsiasi mazzo**, indipendentemente dalla fazione del Leader
- Le carte **Nomadi** possono essere inserite in **qualsiasi mazzo**, indipendentemente dalla fazione del Leader (sono apolidi)
- Le carte multifazione (es. Nord+Est) possono essere inserite solo se **entrambe le fazioni** rientrano nell'identità del Leader
- Un mazzo mono-fazione è più consistente ma prevedibile; un mazzo bi-fazione è più versatile ma richiede terre di due tipi diversi

---

## LE 5 FAZIONI

---

### ⬆ NORD

**Filosofia:** La pazienza è la vera forza. Il Nord non vince in fretta — costruisce, resiste, esaurisce. Ogni mossa è calcolata, ogni risorsa è preziosa.

**Stile di gioco:** Controllo e difesa. Il giocatore Nord rallenta il gioco, blocca le mosse avversarie, accumula vantaggio nel tempo e vince per sfinimento o attraverso combo preparate a lungo.

**Meccaniche preferite:**
- Annullare o contrastare abilità avversarie (counter)
- Guadagnare o recuperare HP
- Congelare unità avversarie (impedire attacchi per X turni)
- Pescare carte extra, mantenere la mano piena
- Proteggere i propri permanenti

**Punti di forza:** Resistenza, reazione, longevità in partita

**Punti di debolezza:** Velocità quasi nulla, scarsa capacità offensiva diretta

**Tipi di carte preferiti:** Unità con DEF alta, Magie Istante, Benedizioni, Satelliti difensivi

**Estetica:** Ghiaccio, tundra, fortezze di pietra bianca, armature pesanti, cristalli, silenzio. Palette cromatica: bianchi, azzurri, grigi.

**Mana:** Terre Nord — generano mana freddo/bianco

---

### ⬇ SUD

**Filosofia:** La vittoria appartiene a chi colpisce per primo e colpisce forte. Il Sud non aspetta — agisce, brucia, distrugge prima che l'avversario possa reagire.

**Stile di gioco:** Aggressione pura. Il giocatore Sud vuole chiudere la partita il prima possibile, sovraccaricando l'avversario di danni diretti e unità veloci prima che possa stabilizzarsi.

**Meccaniche preferite:**
- Unità con la keyword *Velocità* (attaccano subito, senza summoning sickness)
- Danni diretti al giocatore avversario tramite Magie
- Potenziare temporaneamente le proprie unità (+ATK per un turno)
- Ridurre il costo in mana delle carte durante il turno
- Effetti che si attivano "quando attacchi"

**Punti di forza:** Velocità, pressione costante, danno diretto

**Punti di debolezza:** Scarsa difesa, esaurisce le risorse rapidamente, soffre le partite lunghe

**Tipi di carte preferiti:** Unità con ATK alto e DEF bassa, Magie Sorcery offensive, Tragedie rischio/rendimento

**Estetica:** Fuoco, deserti, vulcani, tempeste di sabbia, lame incandescenti, creature feroci. Palette cromatica: rossi, arancioni, neri bruciati.

**Mana:** Terre Sud — generano mana caldo/rosso

---

### ➡ EST

**Filosofia:** La conoscenza è potere assoluto. Chi conosce il futuro, chi controlla le informazioni e chi padroneggia la magia non ha bisogno di forza bruta.

**Stile di gioco:** Manipolazione e magia. Il giocatore Est controlla il flusso della partita attraverso la pesca, la manipolazione dello stack, gli effetti a catena e le combo di spell. Non distrugge — reindirizza.

**Meccaniche preferite:**
- Pescare carte aggiuntive o cercare carte specifiche nel mazzo
- Copiare effetti di carte avversarie o proprie
- Modificare bersagli di attacchi e abilità
- Giocare carte istante in risposta con bonus aggiuntivi
- Interagire con il mazzo avversario (scartare, riordinare)

**Punti di forza:** Consistenza, flessibilità, vantaggio carta, reazione

**Punti di debolezza:** Unità fisicamente deboli, dipende molto dalla mano

**Tipi di carte preferiti:** Magie Istante e Sorcery, Alleati/Partner con abilità di supporto, Satelliti informativi

**Estetica:** Alba, foreste antiche, biblioteche sospese, rune luminose, creature eteree e saggi. Palette cromatica: verdi, dorati, bianchi caldi.

**Mana:** Terre Est — generano mana luminoso/verde

---

### ⬅ OVEST

**Filosofia:** Ogni cosa ha un prezzo. Il potere vero si ottiene sacrificando qualcosa — vita, carte, alleati. L'Ovest abbraccia la perdita come strumento di dominio.

**Stile di gioco:** Sacrificio e cimitero. Il giocatore Ovest si auto-danneggia, sacrifica le proprie carte e usa il Cimitero come risorsa attiva per guadagnare poteri che gli altri non possono raggiungere.

**Meccaniche preferite:**
- Sacrificare proprie unità per effetti potenti
- Recuperare carte dal Cimitero (resurrezione, riciclo)
- Usare il numero di carte nel Cimitero come condizione ("se hai 10+ carte nel Cimitero...")
- Pagare HP invece di mana per giocare alcune carte
- Maledire o indebolire permanentemente le unità avversarie

**Punti di forza:** Potere assoluto a lungo termine, ottimo nel late game, difficile da esaurire

**Punti di debolezza:** Si auto-danneggia, fragile nelle prime fasi, richiede setup

**Tipi di carte preferiti:** Unità con abilità di resurrezione, Tragedie, Magie Sorcery oscure, Alleati con progressione lenta ma devastante

**Estetica:** Tramonto, oceano notturno, cripte, creature spettrali, radici nere, nebbia. Palette cromatica: viola, neri, grigi scuri, bordeaux.

**Mana:** Terre Ovest — generano mana oscuro/viola

---

### ✦ CENTRO

**Filosofia:** Non esiste una sola verità. Il Centro non appartiene a nessuna direzione — assorbe tutto, riflette tutto, adatta tutto. È la fazione di chi non sceglie un solo cammino.

**Stile di gioco:** Adattamento e ibridazione. Il giocatore Centro non ha un'identità fissa: copia, ruba, combina e trasforma le meccaniche delle altre fazioni. È il più difficile da padroneggiare ma anche il più imprevedibile.

**Meccaniche preferite:**
- Copiare abilità o effetti di carte in campo (proprie o avversarie)
- Cambiare temporaneamente la fazione di una carta
- Carte che cambiano effetto in base alla fazione del mana usato per giocarle
- Neutralizzare i bonus di fazione avversari
- Carte con effetti "scegli uno tra..." che coprono più fazioni

**Punti di forza:** Imprevedibilità totale, si adatta a qualsiasi strategia avversaria

**Punti di debolezza:** Nessuna meccanica propria dominante, dipende dalle scelte dell'avversario, difficile da costruire bene

**Tipi di carte preferiti:** Magie con effetti variabili, Santuari che cambiano le regole del tavolo, Leader/Eroe con abilità di copia

**Estetica:** Specchi, geometrie impossibili, luce che si rifrange, vuoto luminoso, forme che cambiano. Palette cromatica: argento, bianco neutro, trasparenze, sfumature di tutti i colori.

**Mana:** Terre Centro — generano mana neutro, utilizzabile per carte di qualsiasi fazione (ma generano solo 1 mana, senza bonus fazione)

---

## ◯ NOMADI — Apolidi / Incolori

**Filosofia:** Non c'è patria, non c'è simbolo, non c'è guida. I Nomadi sono ciò che precede o sopravvive alle fazioni — costrutti dimenticati, viandanti, reliquie di ere passate, bestie senza territorio. Vagano tra le direzioni senza appartenere a nessuna.

**Natura:** I Nomadi **non sono una fazione vera** — sono l'**assenza di fazione**. Equivalente concettuale dell'incolore di Magic. Servono come categoria di carte universalmente accessibili, utili a riempire ruoli che ogni mazzo potrebbe desiderare a prescindere dall'identità del Leader.

**Stile di gioco:** Utility trasversale. Le carte Nomadi sono pensate per offrire effetti generalisti — strumenti di base, supporti meccanici, oggetti antichi — senza definire una strategia da sole. Un mazzo non si costruisce *attorno* ai Nomadi: i Nomadi *integrano* qualsiasi strategia.

**Bilanciamento:** Le carte Nomadi non sono per principio più deboli delle carte di fazione — possono essere altrettanto forti, ma il costo deve essere proporzionato all'accessibilità universale. In generale i Nomadi non hanno keyword esclusive di fazione e non competono direttamente con le specialità identitarie (es. niente mass damage stile Sud, niente mill stile Est), ma possono offrire effetti utility competitivi al giusto costo.

**Meccaniche preferite:**
- Artefatti utility (riduzioni di costo, rigenerazione, contatori)
- Equipaggiamenti generici (+ATK / +DEF, parole chiave universali)
- Costrutti e golem (creature senza affiliazione: Costrutto, Golem, Bestia Antica)
- Reliquie con Utilizzo Limitato che si auto-esauriscono
- Effetti di "fix" del mana (cercare terre, scartare e ripescare)

**Tipi di carte preferiti:**
- **SÌ:** Artefatti, Equipaggiamenti, alcune Creature (Costrutti / Golem / Bestie senza casa), occasionali Satelliti / Santuari neutri
- **NO o molto rari:** Magie (le Magie restano fortemente identitarie delle fazioni), Tragedie e Benedizioni (legate alla filosofia di una fazione)
- **MAI:** Leader (i Leader sono sempre vincolati a un'identità di fazione)

**Estetica:** Pietra antica, polvere, ruggine, sabbia, statue erose, costrutti dimenticati, paesaggi lunari, deserti senza nome. Palette cromatica: grigio sabbia, ocra, marrone pietra, beige, ferro ossidato. **Bordo carta:** pietra antica (grigio sabbia con texture pietra erosa, distinto dal grigio "rarità Comune").

**Costo mana:** I Nomadi **non hanno una propria tipologia di mana**. Le carte Nomadi si pagano **esclusivamente con mana generico di qualsiasi tipo** — non c'è alcun requisito di mana specifico di fazione. Esempio: una creatura Nomade da costo 3 si paga con 3 mana di qualsiasi combinazione (Nord, Sud, Est, Ovest, Centro o mix).

**Mana:** Nessuna terra Nomade — i Nomadi non generano mana proprio, né hanno avamposti dedicati.

---

## INTERAZIONI TRA FAZIONI

| Combo | Sinergia |
|---|---|
| Nord + Est | Controllo totale: rallenta il gioco e manipola la mano — quasi impossibile da scardinare |
| Sud + Ovest | Aggro-sacrificio: attacca veloce e sacrifica le proprie unità cadute per bonus offensivi |
| Est + Ovest | Cimitero+spell: recupera le proprie Magie dal Cimitero e le riusa in loop |
| Nord + Ovest | Difesa pesante + resurrezione: un muro che non cade mai |
| Sud + Est | Aggro intelligente: velocità con spell di supporto e copie di buff |
| Centro + qualsiasi | Il Centro potenzia qualsiasi strategia copiandone le meccaniche chiave |

---

## NOTE PER LO SVILUPPO (Claude Code)

- Il **Leader** ha un campo `identita_fazione` (array) che definisce le fazioni giocabili nel mazzo (es. `["EST", "OVEST"]`)
- Il deck builder deve validare che ogni carta nel mazzo rientri nell'identità fazione del Leader selezionato; le carte **Centro** e **Nomadi** sono sempre valide
- Ogni carta deve avere un campo `fazione` con uno dei valori: `NORD`, `SUD`, `EST`, `OVEST`, `CENTRO`, `NOMADE`
- Le terre devono avere un campo `tipo_mana` corrispondente alla loro fazione
- Il mana generato deve essere tipizzato: pagare una carta Nord richiede mana Nord (o mana Centro neutro)
- Le carte **Nomadi** non hanno requisito di mana specifico: il loro costo è interamente in mana generico, pagabile con qualsiasi combinazione di mana di qualsiasi fazione
- I Nomadi non hanno avamposti propri — non esiste `tipo_mana = NOMADE`
- Carte multicolore/multifazione devono supportare array di fazioni: `fazione: ["NORD", "EST"]`
- Il costo mana di una carta multifazione specifica quante unità di ogni tipo sono richieste (es. `{1 NORD}{1 EST}` = 1 mana Nord + 1 mana Est); non è possibile sostituire un tipo con l'altro, salvo mana Centro neutro
- L'interfaccia deve mostrare chiaramente la fazione di ogni carta tramite colore bordo, simbolo e palette cromatica dedicata
- Le carte Nomadi usano bordo "pietra antica" (grigio sabbia con texture pietra erosa) — distinto dal grigio "rarità Comune"
- Le terre Centro devono essere marcate come "mana neutro" e accettate da qualsiasi slot mana
- Il sistema di filtro nel deck builder deve permettere di filtrare per fazione (incluso filtro `NOMADE`)
