import type { Target, Proprietario } from "./schema.js";

export function parseTarget(testo: string): Target {
  const t = testo.toLowerCase();

  const proprietario: Proprietario =
    /\bavversari[ae]\b|\bnemic[hia]\b/.test(t) ? "AVVERSARIO" :
    /\btu[ae]\b|\btuo\b|\btuoi\b/.test(t) ? "TUE" :
    "TUTTI";

  const quantificatore =
    /\btutte le\b|\btutti i\b/.test(t) ? "tutte" :
    /\bogni\b|\bciascun[ao]?\b/.test(t) ? "ogni" :
    /\buna?\b/.test(t) ? "una" : undefined;

  const tipo =
    /creatur[ae]/.test(t) ? "creatura" :
    /giocator[ei]/.test(t) ? "giocatore" :
    /avampost[oi]/.test(t) ? "avamposto" :
    "creatura";

  const filtro = estraiFiltro(t);

  return { tipo, proprietario, quantificatore, ...(filtro ? { filtro } : {}) };
}

function estraiFiltro(t: string): string | undefined {
  if (/attaccant[ei]/.test(t)) return "attaccante";
  const costo = t.match(/costo (?:totale )?pari o inferiore a (\d+)/);
  if (costo) return `costo<=${costo[1]}`;
  const def = t.match(/def pari o superiore a (\d+)/);
  if (def) return `def>=${def[1]}`;
  const tipoCreatura = t.match(/di tipo ([a-zà-ù, eo]+?)(?: guadagn| ottien|$)/);
  if (tipoCreatura) return `tipo:${tipoCreatura[1].trim()}`;
  return undefined;
}
