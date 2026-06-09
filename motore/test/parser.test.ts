import { test, expect } from "vitest";
import { parseEffetto } from "../src/parser.js";

test("FORGIA: passiva + modifica_stat TUTTI", () => {
  const r = parseEffetto("Tutte le creature attaccanti guadagnano +1 ATK.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(1);
  const e = r.effetti[0];
  expect(e.trigger).toBe("passiva");
  expect(e.azioni[0].verbo).toBe("modifica_stat");
  expect(e.azioni[0].target?.proprietario).toBe("TUTTI");
  expect(e.azioni[0].valore).toBe(1);
});

test("MORDETH parte 2: trigger morte + genera_token", () => {
  const r = parseEffetto("Quando muore: genera un token Non-Morto 1/1 sotto il tuo controllo.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  const e = r.effetti[0];
  expect(e.trigger).toBe("morte");
  expect(e.azioni[0].verbo).toBe("genera_token");
  expect((e.azioni[0].token as any).controllore).toBe("tu");
});

test("frase fuori vocabolario => CAT3", () => {
  const r = parseEffetto("Riavvolge il tempo di tre turni e inverte le sorti del fato.");
  expect(r.ok).toBe(false);
});

test("piu' frasi separate da punto", () => {
  const r = parseEffetto("Pesca 1 carta. Infliggi 2 danni a una creatura avversaria.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(2);
});
