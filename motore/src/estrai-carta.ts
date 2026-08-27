export interface RecordCarta {
  nome: string;
  file: string;
  campi: Record<string, string>;
}

const RIGA_TABELLA = /^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/;

export function estraiCarta(markdown: string, file: string): RecordCarta {
  const righe = markdown.split(/\r?\n/);
  let nome = "";
  const campi: Record<string, string> = {};

  for (const riga of righe) {
    if (!nome) {
      const titolo = riga.match(/^#\s+(.+?)\s*$/);
      if (titolo) {
        nome = titolo[1];
        continue;
      }
    }
    const m = riga.match(RIGA_TABELLA);
    if (!m) continue;
    const chiave = pulisci(m[1]);
    const valore = m[2].trim();
    // salta header e separatori
    if (chiave === "Campo" || /^-+$/.test(chiave)) continue;
    campi[chiave] = valore;
  }

  return { nome, file, campi };
}

function pulisci(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}
