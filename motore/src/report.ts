import type { CartaParsata } from "./schema.js";

export function generaReport(carte: CartaParsata[], commit: string): string {
  const cat3 = carte.filter((c) => c.categoria === "CAT3");
  const cat1 = carte.filter((c) => c.categoria === "CAT1").length;
  const cat2 = carte.filter((c) => c.categoria === "CAT2").length;

  const righeCat3 = cat3.length
    ? cat3.map((c) => `| ${c.nome} | ${c.file} | ${c.motivoCat3 ?? ""} |`).join("\n")
    : "| — | — | nessuna |";

  return `# Motore — carte da fare a mano
<!-- AUTO-GENERATO dal validatore. Non modificare a mano. -->
Ultimo aggiornamento: commit ${commit}

## ⚠️ CAT3 — serve codice custom (${cat3.length})
| Carta | File | Motivo |
|---|---|---|
${righeCat3}

## ✅ Riepilogo
${carte.length} carte · ${cat1} CAT1 · ${cat2} CAT2 · ${cat3.length} CAT3
`;
}
