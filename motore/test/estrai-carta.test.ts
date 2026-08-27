import { test, expect } from "vitest";
import { estraiCarta } from "../src/estrai-carta.js";
import { readFileSync } from "node:fs";

test("estrae nome e campi tabella", () => {
  const md = readFileSync(new URL("./fixtures/forgia.md", import.meta.url), "utf8");
  const r = estraiCarta(md, "carte/santuari/santuari-sud/FORGIA.md");
  expect(r.nome).toBe("Forgia della Fiamma");
  expect(r.file).toBe("carte/santuari/santuari-sud/FORGIA.md");
  expect(r.campi["Tipo"]).toBe("Santuario");
  expect(r.campi["Effetto"]).toBe("Tutte le creature attaccanti guadagnano +1 ATK.");
});

test("normalizza grassetto e spazi nei nomi campo", () => {
  const md = "# X\n\n| Campo | Valore |\n|---|---|\n| **Keyword** | Vedetta |\n";
  const r = estraiCarta(md, "x.md");
  expect(r.campi["Keyword"]).toBe("Vedetta");
});
