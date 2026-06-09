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
