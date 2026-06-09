# Come scrivere gli effetti delle carte (per il motore)

Scrivi ogni effetto come frasi nella forma:  **TRIGGER: AZIONE su BERSAGLIO.**
Più effetti = più frasi separate da punto.

## Regola bersagli
- "tutte le creature" / "ogni creatura" = **tutte, tue + avversario**.
- Aggiungi "**avversarie**" o "**tue**" per restringere.

## Trigger (inizio frase)
| Scrivi | Significato |
|---|---|
| Quando entra in campo: | all'ingresso |
| Quando muore: | alla morte |
| Mentre è in campo: | continuo |
| All'inizio del Mantenimento: | a inizio turno |
| Quando attacca: / Quando blocca: | in combattimento |

Senza trigger esplicito = effetto continuo (passiva).

## Azioni disponibili (vocabolario)
| Scrivi così | Esempio |
|---|---|
| [bersaglio] guadagnano +N ATK/DEF | Tutte le creature guadagnano +1 ATK. |
| infliggi N danni a [bersaglio] | Infliggi 2 danni a una creatura avversaria. |
| pesca N carte | Pesca 1 carta. |
| genera N mana COLORE | Genera 1 mana Sud. |
| genera un token Nome X/Y [sotto il tuo controllo] | genera un token Spettro 1/1 sotto il tuo controllo. |
| distruggi [bersaglio] | Distruggi una creatura avversaria. |

(Lista in crescita: se ti serve un'azione che non c'è, scrivi comunque in italiano
normale — la carta verrà segnata in `MOTORE-DA-FARE.md` come "da fare a mano",
e tu vai avanti senza bloccarti.)

## Keyword (si scrivono nel campo Keyword)
Vedetta · Frenesia · Velocità · Protezione · Travolta · Resilienza · Lamento
