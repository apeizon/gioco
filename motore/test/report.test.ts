import { test, expect } from "vitest";
import { generaReport } from "../src/report.js";
import type { CartaParsata } from "../src/schema.js";

const carte: CartaParsata[] = [
  { id: "FORGIA", file: "carte/FORGIA.md", nome: "Forgia", tipo: "Santuario", keyword: [], effetti: [{ trigger: "passiva", azioni: [] }], categoria: "CAT2" },
  { id: "KETH", file: "leader/KETH.md", nome: "Keth", tipo: "Leader", keyword: [], effetti: [], categoria: "CAT3", motivoCat3: "soglia mobile" },
];

test("report elenca CAT3 e riepilogo", () => {
  const txt = generaReport(carte, "abc1234");
  expect(txt).toContain("AUTO-GENERATO");
  expect(txt).toContain("abc1234");
  expect(txt).toContain("Keth");
  expect(txt).toContain("soglia mobile");
  expect(txt).toContain("2 carte");   // totale
  expect(txt).toContain("1 CAT3");
  expect(txt).not.toContain("Forgia"); // CAT2 non elencata nel dettaglio
});
