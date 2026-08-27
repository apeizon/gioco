import { test, expect } from "vitest";
import { archetipoAvamposto, estraiMana } from "../src/avamposti.js";

test("archetipoAvamposto da path", () => {
  expect(archetipoAvamposto("carte/avamposti/avamposti-shock/X.md")).toBe("shock");
  expect(archetipoAvamposto("carte/avamposti/avamposti-tappati/Y.md")).toBe("tappato");
  expect(archetipoAvamposto("carte/creature/X.md")).toBe(null);
});

test("estraiMana multi-colore a scelta", () => {
  const m = estraiMana("Genera 1 mana Nord, 1 mana Ovest o 1 mana Centro a scelta.")!;
  expect(m.quantita).toBe(1);
  expect(m.colori).toEqual(["nord", "ovest", "centro"]);
  expect(m.scelta).toBe(true);
});

test("estraiMana singolo", () => {
  const m = estraiMana("Genera 1 mana Centro.")!;
  expect(m.colori).toEqual(["centro"]);
  expect(m.scelta).toBe(false);
});

test("estraiMana assente", () => {
  expect(estraiMana("Entra tappato.")).toBe(null);
});
