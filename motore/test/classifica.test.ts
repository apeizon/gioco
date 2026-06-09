import { test, expect } from "vitest";
import { classifica } from "../src/classifica.js";
import { KEYWORD } from "../src/grammatica.js";

test("solo keyword, nessun effetto => CAT1", () => {
  const r = classifica({ effettoOk: true, numEffetti: 0, keyword: ["vedetta"] });
  expect(r.categoria).toBe("CAT1");
});

test("effetti parsati => CAT2", () => {
  const r = classifica({ effettoOk: true, numEffetti: 1, keyword: [] });
  expect(r.categoria).toBe("CAT2");
});

test("parse fallito => CAT3 con motivo", () => {
  const r = classifica({ effettoOk: false, numEffetti: 0, keyword: [], motivo: "frase X" });
  expect(r.categoria).toBe("CAT3");
  expect(r.motivoCat3).toBe("frase X");
});

test("KEYWORD esportato e usabile", () => {
  expect(KEYWORD.has("vedetta")).toBe(true);
});
