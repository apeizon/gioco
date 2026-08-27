const ARCHETIPI: Array<[string, string]> = [
  ["avamposti-semplici", "semplice"],
  ["avamposti-tappati", "tappato"],
  ["avamposti-dormienti", "dormiente"],
  ["avamposti-nascosti", "coperto"],
  ["avamposti-shock", "shock"],
  ["avamposti-bounce", "bounce"],
  ["avamposti-vivi", "vivo"],
  ["avamposti-fetch", "fetch"],
];

export function archetipoAvamposto(file: string): string | null {
  for (const [dir, arch] of ARCHETIPI) {
    if (file.includes(dir)) return arch;
  }
  return null;
}

const COLORI = new Set(["nord", "sud", "est", "ovest", "centro", "generico", "generici"]);

export interface ManaInfo {
  quantita: number;
  colori: string[];
  scelta: boolean;
}

export function estraiMana(testo: string): ManaInfo | null {
  if (!testo) return null;
  const colori: string[] = [];
  for (const m of testo.matchAll(/mana\s+([A-Za-zà-ù]+)/gi)) {
    let c = m[1].toLowerCase();
    if (c === "generici") c = "generico";
    if (COLORI.has(m[1].toLowerCase()) && !colori.includes(c)) colori.push(c);
  }
  if (colori.length === 0) return null;
  const num = testo.match(/(\d+)\s+mana/);
  const quantita = num ? Number(num[1]) : 1;
  const scelta = /a scelta\b/i.test(testo) || colori.length > 1;
  return { quantita, colori, scelta };
}
