import type { RecordCarta } from "./estrai-carta.js";
import type { Azione, CartaParsata, Effetto } from "./schema.js";
import { parseEffetto } from "./parser.js";
import { classifica } from "./classifica.js";
import { KEYWORD } from "./grammatica.js";
import { archetipoAvamposto, estraiMana } from "./avamposti.js";

// Campi che possono contenere effetti in prosa.
const CAMPI_EFFETTO = ["Effetto", "Bonus", "Malus", "Eco"];

export function validaCarta(rec: RecordCarta): CartaParsata {
  const id = rec.file.split("/").pop()!.replace(/\.md$/, "");
  const keyword = estraiKeyword(rec.campi["Keyword"]);

  const arch = archetipoAvamposto(rec.file);
  if (arch) {
    const azione: Azione = { verbo: "avamposto", archetipo: arch };
    const mana = estraiMana(rec.campi["Effetto"] ?? "");
    if (mana) azione.mana = mana;
    return {
      id,
      file: rec.file,
      nome: rec.nome,
      tipo: rec.campi["Tipo"] ?? "",
      fazione: rec.campi["Fazione"],
      costo: rec.campi["Costo"],
      keyword,
      effetti: [{ trigger: "passiva", azioni: [azione] }],
      categoria: "CAT2",
    };
  }

  const effetti: Effetto[] = [];
  let okTotale = true;
  let motivo: string | undefined;

  for (const campo of CAMPI_EFFETTO) {
    const testo = rec.campi[campo];
    if (!testo || testo === "—") continue;
    const r = parseEffetto(testo);
    if (r.ok) {
      effetti.push(...r.effetti);
    } else {
      okTotale = false;
      motivo = motivo ?? `[${campo}] ${r.motivo}`;
    }
  }

  const cls = classifica({
    effettoOk: okTotale,
    numEffetti: effetti.length,
    keyword,
    motivo,
  });

  return {
    id,
    file: rec.file,
    nome: rec.nome,
    tipo: rec.campi["Tipo"] ?? "",
    fazione: rec.campi["Fazione"],
    costo: rec.campi["Costo"],
    keyword,
    effetti: cls.categoria === "CAT3" ? [] : effetti,
    categoria: cls.categoria,
    ...(cls.motivoCat3 ? { motivoCat3: cls.motivoCat3 } : {}),
  };
}

function estraiKeyword(campo?: string): string[] {
  if (!campo) return [];
  // prima parola/e prima di una parentesi o ":" è il nome keyword
  const nome = campo.split(/[(:]/)[0].trim().toLowerCase();
  return KEYWORD.has(nome) ? [nome] : [];
}
