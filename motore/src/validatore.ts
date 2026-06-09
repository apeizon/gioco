import type { RecordCarta } from "./estrai-carta.js";
import type { CartaParsata, Effetto } from "./schema.js";
import { parseEffetto } from "./parser.js";
import { classifica } from "./classifica.js";
import { KEYWORD } from "./grammatica.js";

// Campi che possono contenere effetti in prosa.
const CAMPI_EFFETTO = ["Effetto", "Bonus", "Malus", "Eco"];

export function validaCarta(rec: RecordCarta): CartaParsata {
  const id = rec.file.split("/").pop()!.replace(/\.md$/, "");
  const keyword = estraiKeyword(rec.campi["Keyword"]);

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
