import type { Categoria } from "./schema.js";

export interface InputClassifica {
  effettoOk: boolean;
  numEffetti: number;
  keyword: string[];
  motivo?: string;
}

export interface EsitoClassifica {
  categoria: Categoria;
  motivoCat3?: string;
}

export function classifica(i: InputClassifica): EsitoClassifica {
  if (!i.effettoOk) {
    return { categoria: "CAT3", motivoCat3: i.motivo ?? "effetto non parsabile" };
  }
  if (i.numEffetti === 0) {
    return { categoria: "CAT1" }; // vanilla / solo keyword
  }
  return { categoria: "CAT2" };
}
