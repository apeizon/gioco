import { test, expect } from "vitest";
import { parseTarget } from "../src/target.js";

test("proprietario omesso = TUTTI", () => {
  expect(parseTarget("tutte le creature").proprietario).toBe("TUTTI");
  expect(parseTarget("ogni creatura").proprietario).toBe("TUTTI");
});

test("avversaria/e = AVVERSARIO", () => {
  expect(parseTarget("tutte le creature avversarie").proprietario).toBe("AVVERSARIO");
  expect(parseTarget("una creatura avversaria").proprietario).toBe("AVVERSARIO");
});

test("tua/tue = TUE", () => {
  expect(parseTarget("le tue creature").proprietario).toBe("TUE");
});

test("estrae tipo e quantificatore", () => {
  const t = parseTarget("tutte le creature");
  expect(t.tipo).toBe("creatura");
  expect(t.quantificatore).toBe("tutte");
});

test("estrae filtro attaccante", () => {
  expect(parseTarget("tutte le creature attaccanti").filtro).toBe("attaccante");
});

test("estrae filtro costo", () => {
  expect(parseTarget("creature con costo totale pari o inferiore a 3").filtro).toBe("costo<=3");
});
