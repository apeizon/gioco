import { test, expect } from "vitest";
import { TRIGGER, KEYWORD, VERBI } from "../src/grammatica.js";

test("trigger morte riconosce 'quando muore'", () => {
  const hit = TRIGGER.find((tr) => tr.regex.test("quando muore"));
  expect(hit?.id).toBe("morte");
});

test("keyword set contiene Frenesia", () => {
  expect(KEYWORD.has("frenesia")).toBe(true);
});

test("esiste verbo modifica_stat", () => {
  expect(VERBI.some((v) => v.verbo === "modifica_stat")).toBe(true);
});

test("KEYWORD esteso contiene volo, arcano, baluardo", () => {
  expect(KEYWORD.has("volo")).toBe(true);
  expect(KEYWORD.has("arcano")).toBe(true);
  expect(KEYWORD.has("baluardo")).toBe(true);
});

test("esistono verbi concedi_keyword e mill", () => {
  expect(VERBI.some((v) => v.verbo === "concedi_keyword")).toBe(true);
  expect(VERBI.some((v) => v.verbo === "mill")).toBe(true);
});
